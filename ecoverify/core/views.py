import json

from django.contrib.auth import authenticate, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import AuthToken, UploadedEvidence, UserProfile, VerificationSubmission


class ApiError(Exception):
    def __init__(self, status, message):
        self.status = status
        self.message = message
        super().__init__(message)


def json_error(status, message):
    return JsonResponse({"error": message}, status=status)


def parse_json_body(request):
    if not request.body:
        return {}

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError as error:
        raise ApiError(400, "Request body must be valid JSON.") from error

    if not isinstance(payload, dict):
        raise ApiError(400, "Request body must be a JSON object.")

    return payload


def user_payload(user):
    profile, _ = UserProfile.objects.get_or_create(user=user, defaults={"phone_number": ""})
    phone_number = profile.phone_number

    return {"id": str(user.id), "email": user.email or user.username, "phoneNumber": phone_number}


def session_payload(user):
    token = AuthToken.issue_for(user)
    return {
        "accessToken": token.key,
        "refreshToken": token.key,
        "user": user_payload(user),
    }


def get_authenticated_user(request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise ApiError(401, "Authentication required.")

    token_key = auth_header.replace("Bearer ", "", 1).strip()
    if not token_key:
        raise ApiError(401, "Authentication required.")

    token = AuthToken.objects.select_related("user").filter(key=token_key).first()
    if token is None:
        raise ApiError(401, "Invalid authentication token.")

    return token.user


def activity_for_report(report):
    status = report.get("status")
    product_name = report.get("productName", "Product")
    badge_tier = report.get("badgeTier", "Bronze")
    anomalies = report.get("anomalies") or []

    if status == "Verified":
        title = f"{product_name} {badge_tier} badge issued"
        detail = report.get("badgeMessage", "Verification completed.")
    elif status == "In Review":
        title = f"{product_name} queued for review"
        detail = report.get("badgeMessage", "Submission is being reviewed.")
    else:
        title = f"{product_name} flagged for manual audit"
        detail = anomalies[0] if anomalies else report.get("badgeMessage", "Manual audit required.")

    return {"title": title, "detail": detail, "when": "Just now"}


def validate_submission(payload):
    form = payload.get("form")
    report = payload.get("report")

    if not isinstance(form, dict) or not isinstance(report, dict):
        raise ApiError(400, "Request body must include form and report objects.")

    required_fields = ["productName", "category", "status", "badgeTier", "verifiedAt"]
    missing = [field for field in required_fields if not report.get(field)]
    if missing:
        raise ApiError(400, f"Report is missing required field(s): {', '.join(missing)}.")

    return form, report


def serialize_profile(profile):
    return {
        "businessName": profile.business_name,
        "country": profile.country,
        "platform": profile.platform,
        "website": profile.website,
        "contactName": profile.contact_name,
        "contactEmail": profile.contact_email,
        "contactPhone": profile.contact_phone or profile.phone_number,
    }


def update_profile_from_payload(profile, payload):
    fields = {
        "businessName": "business_name",
        "country": "country",
        "platform": "platform",
        "website": "website",
        "contactName": "contact_name",
        "contactEmail": "contact_email",
        "contactPhone": "contact_phone",
    }

    for payload_key, model_field in fields.items():
        if payload_key in payload:
            setattr(profile, model_field, str(payload.get(payload_key, "")).strip())

    if profile.contact_phone:
        profile.phone_number = profile.contact_phone

    profile.save(update_fields=[*fields.values(), "phone_number", "updated_at"])
    return profile


def serialize_submission(submission):
    return {
        "id": str(submission.id),
        "createdAt": submission.created_at.isoformat(),
        "form": submission.form_data or {},
        "report": submission.report_data or {},
        "activity": submission.activity_data or {},
        "product": {
            "name": submission.product_name,
            "category": submission.category,
            "status": submission.status,
            "date": submission.verified_at_label,
            "badgeTier": submission.badge_tier,
        },
    }


@require_http_methods(["GET", "OPTIONS"])
def health(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    return JsonResponse({"ok": True})


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def register_view(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        payload = parse_json_body(request)
        email = str(payload.get("email", "")).strip().lower()
        phone_number = str(payload.get("phoneNumber", "")).strip()
        password = str(payload.get("password", ""))

        if not email or not phone_number or not password:
            raise ApiError(400, "Email, phone number, and password are required.")
        if len(password) < 8:
            raise ApiError(400, "Password must be at least 8 characters.")

        User = get_user_model()
        if User.objects.filter(username=email).exists():
            raise ApiError(409, "An account with this email already exists.")

        user = User.objects.create_user(username=email, email=email, password=password)
        UserProfile.objects.create(user=user, phone_number=phone_number)
        return JsonResponse(session_payload(user), status=201)
    except ApiError as error:
        return json_error(error.status, error.message)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def login_view(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        payload = parse_json_body(request)
        email = str(payload.get("email", "")).strip().lower()
        password = str(payload.get("password", ""))

        if not email or not password:
            raise ApiError(400, "Email and password are required.")

        user = authenticate(request, username=email, password=password)
        if user is None:
            raise ApiError(401, "Invalid email or password.")

        return JsonResponse(session_payload(user))
    except ApiError as error:
        return json_error(error.status, error.message)


@require_http_methods(["GET", "OPTIONS"])
def current_user_view(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        user = get_authenticated_user(request)
        return JsonResponse({"user": user_payload(user)})
    except ApiError as error:
        return json_error(error.status, error.message)


@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def profile_view(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        user = get_authenticated_user(request)
        profile, _ = UserProfile.objects.get_or_create(user=user, defaults={"phone_number": ""})

        if request.method == "GET":
            return JsonResponse({"profile": serialize_profile(profile)})

        payload = parse_json_body(request)
        profile = update_profile_from_payload(profile, payload)
        return JsonResponse({"profile": serialize_profile(profile)})
    except ApiError as error:
        return json_error(error.status, error.message)


@csrf_exempt
@require_http_methods(["GET", "POST", "OPTIONS"])
def submissions_view(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)

    try:
        user = get_authenticated_user(request)

        if request.method == "GET":
            submissions = VerificationSubmission.objects.filter(user=user)
            return JsonResponse({"submissions": [serialize_submission(item) for item in submissions]})

        payload = parse_json_body(request)
        form, report = validate_submission(payload)
        activity = activity_for_report(report)

        submission = VerificationSubmission.objects.create(
            user=user,
            business_name=form.get("businessName", ""),
            contact_email=form.get("contactEmail", ""),
            product_name=report["productName"],
            category=report["category"],
            status=report["status"],
            badge_tier=report["badgeTier"],
            verified_at_label=report["verifiedAt"],
            form_data=form,
            report_data=report,
            activity_data=activity,
        )

        files = form.get("files") or []
        evidence_rows = [
            UploadedEvidence(
                submission=submission,
                name=str(file_data.get("name", ""))[:255],
                size=int(file_data.get("size") or 0),
                content_type=str(file_data.get("type", ""))[:120],
            )
            for file_data in files
            if isinstance(file_data, dict) and file_data.get("name")
        ]
        if evidence_rows:
            UploadedEvidence.objects.bulk_create(evidence_rows)

        return JsonResponse({"submission": serialize_submission(submission)}, status=201)
    except ApiError as error:
        return json_error(error.status, error.message)
