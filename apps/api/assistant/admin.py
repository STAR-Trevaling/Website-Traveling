from django.contrib import admin

from .models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
    AssistantMessage,
)


class AssistantMessageInline(admin.TabularInline):
    model = AssistantMessage
    extra = 0
    readonly_fields = ("role", "content", "structured_payload", "created_at")
    can_delete = False


@admin.register(AssistantConversation)
class AssistantConversationAdmin(admin.ModelAdmin):
    list_display = ("session_token", "user", "title", "locale", "created_at", "updated_at")
    list_filter = ("locale", "created_at")
    search_fields = ("session_token", "title", "user__email")
    readonly_fields = ("id", "session_token", "created_at", "updated_at")
    inlines = [AssistantMessageInline]


@admin.register(AssistantLeadCapture)
class AssistantLeadCaptureAdmin(admin.ModelAdmin):
    list_display = (
        "contact_name",
        "phone_number",
        "email",
        "preferred_destination",
        "estimated_pax",
        "budget_range",
        "sync_state",
        "odoo_lead_id",
        "created_at",
    )
    list_filter = ("sync_state", "created_at")
    search_fields = ("contact_name", "phone_number", "email", "preferred_destination")
    readonly_fields = ("id", "created_at", "updated_at")


@admin.register(AssistantKnowledgeChunk)
class AssistantKnowledgeChunkAdmin(admin.ModelAdmin):
    list_display = ("title", "entity_type", "entity_slug", "updated_at")
    list_filter = ("entity_type", "updated_at")
    search_fields = ("title", "entity_slug", "content_vi")
    readonly_fields = ("id", "created_at", "updated_at")
