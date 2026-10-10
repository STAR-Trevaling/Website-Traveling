from django.contrib import admin, messages

from .models import PartnerApplication, PartnerMembership, PartnerOrganization
from .services import approve_application, mark_under_review, reject_application


@admin.register(PartnerApplication)
class PartnerApplicationAdmin(admin.ModelAdmin):
    list_display = ("business_name", "applicant", "status", "created_at", "reviewed_at")
    list_filter = ("status",)
    search_fields = ("business_name", "email", "applicant__username")
    readonly_fields = ("status", "reviewed_by", "reviewed_at", "created_at", "updated_at")
    actions = [
        "approve_applications_action",
        "mark_under_review_action",
        "reject_applications_action",
    ]

    @admin.action(description="✓ Phê duyệt hồ sơ đối tác (Approve & Tạo Tổ Chức)")
    def approve_applications_action(self, request, queryset):
        success = 0
        for app in queryset:
            try:
                approve_application(application_id=app.id, reviewer=request.user)
                success += 1
            except Exception as e:
                self.message_user(
                    request, f"Lỗi phê duyệt {app.business_name}: {e}", messages.WARNING
                )
        if success:
            self.message_user(
                request, f"Đã phê duyệt thành công {success} hồ sơ đối tác.", messages.SUCCESS
            )

    @admin.action(description="⏳ Chuyển trạng thái đang thẩm định (Under Review)")
    def mark_under_review_action(self, request, queryset):
        success = 0
        for app in queryset:
            try:
                mark_under_review(application_id=app.id, reviewer=request.user)
                success += 1
            except Exception as e:
                self.message_user(
                    request, f"Lỗi chuyển thẩm định {app.business_name}: {e}", messages.WARNING
                )
        if success:
            self.message_user(
                request,
                f"Đã chuyển {success} hồ sơ sang trạng thái Under Review.",
                messages.SUCCESS,
            )

    @admin.action(description="✕ Từ chối hồ sơ đối tác (Reject)")
    def reject_applications_action(self, request, queryset):
        success = 0
        for app in queryset:
            try:
                reject_application(
                    application_id=app.id,
                    reviewer=request.user,
                    reason="Hồ sơ không đáp ứng đầy đủ tiêu chí thẩm định chất lượng STAR Travels.",
                )
                success += 1
            except Exception as e:
                self.message_user(
                    request, f"Lỗi từ chối {app.business_name}: {e}", messages.WARNING
                )
        if success:
            self.message_user(request, f"Đã từ chối {success} hồ sơ đối tác.", messages.INFO)


@admin.register(PartnerOrganization)
class PartnerOrganizationAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "created_at")
    search_fields = ("name", "slug")


@admin.register(PartnerMembership)
class PartnerMembershipAdmin(admin.ModelAdmin):
    list_display = ("organization", "user", "role", "created_at")
    list_filter = ("role",)
