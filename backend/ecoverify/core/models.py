from django.db import models
from django.conf import settings
from django.utils import timezone
import secrets


class AuthToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="api_tokens")
    key = models.CharField(max_length=64, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def issue_for(cls, user):
        return cls.objects.create(user=user, key=secrets.token_urlsafe(48))

    def __str__(self):
        return f"Token for {self.user}"


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user}"


class VerificationSubmission(models.Model):
    STATUS_CHOICES = [
        ("Verified", "Verified"),
        ("In Review", "In Review"),
        ("Flagged", "Flagged"),
    ]

    BADGE_CHOICES = [
        ("Gold", "Gold"),
        ("Silver", "Silver"),
        ("Bronze", "Bronze"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="submissions")
    business_name = models.CharField(max_length=255, blank=True)
    contact_email = models.EmailField(blank=True)
    product_name = models.CharField(max_length=255)
    category = models.CharField(max_length=120)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="In Review")
    badge_tier = models.CharField(max_length=20, choices=BADGE_CHOICES, default="Bronze")
    verified_at_label = models.CharField(max_length=120)
    form_data = models.JSONField(default=dict)
    report_data = models.JSONField(default=dict)
    activity_data = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "-created_at"]),
            models.Index(fields=["contact_email"]),
        ]

    def __str__(self):
        return self.product_name


class UploadedEvidence(models.Model):
    submission = models.ForeignKey(
        VerificationSubmission,
        on_delete=models.CASCADE,
        related_name="uploaded_evidence",
    )
    name = models.CharField(max_length=255)
    size = models.PositiveIntegerField(default=0)
    content_type = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
