from django.contrib import admin
from .models import PartnerApplication, PartnerMembership, PartnerOrganization

@admin.register(PartnerApplication)
class PartnerApplicationAdmin(admin.ModelAdmin):
    list_display = ("business_name", "applicant", "status", "created_at", "reviewed_at")
    list_filter = ("status",)
    search_fields = ("business_name", "email", "applicant__username")
    readonly_fields = ("status", "reviewed_by", "reviewed_at", "created_at", "updated_at")

@admin.register(PartnerOrganization)
class PartnerOrganizationAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "created_at")
    search_fields = ("name", "slug")

@admin.register(PartnerMembership)
class PartnerMembershipAdmin(admin.ModelAdmin):
    list_display = ("organization", "user", "role", "created_at")
    list_filter = ("role",)
