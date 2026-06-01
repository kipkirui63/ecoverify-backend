from django.contrib import admin
from .models import AuthToken, UploadedEvidence, UserProfile, VerificationSubmission


class UploadedEvidenceInline(admin.TabularInline):
    model = UploadedEvidence
    extra = 0
    readonly_fields = ("name", "size", "content_type", "created_at")


@admin.register(VerificationSubmission)
class VerificationSubmissionAdmin(admin.ModelAdmin):
    list_display = ("product_name", "business_name", "status", "badge_tier", "contact_email", "created_at")
    list_filter = ("status", "badge_tier", "category", "created_at")
    search_fields = ("product_name", "business_name", "contact_email")
    readonly_fields = ("created_at", "updated_at")
    inlines = [UploadedEvidenceInline]


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("key", "created_at")


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "phone_number", "created_at")
    search_fields = ("user__username", "user__email", "phone_number")
    readonly_fields = ("created_at", "updated_at")
