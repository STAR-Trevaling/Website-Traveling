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
    actions = ["retry_odoo_sync_action", "mark_as_synced_action"]

    @admin.action(description="🔄 Đẩy lại sự kiện đồng bộ sang Odoo CRM")
    def retry_odoo_sync_action(self, request, queryset):
        import uuid
        from django.contrib import messages
        from django.utils import timezone
        from integrations.models import IntegrationOutbox
        from integrations.tasks import dispatch_outbox_event

        count = 0
        for lead in queryset:
            event_id = str(uuid.uuid4())
            envelope = {
                "event_id": event_id,
                "event_type": "ai.lead.created",
                "event_version": 1,
                "source": "ai_assistant",
                "occurred_at": timezone.now().isoformat(),
                "data": {
                    "lead_capture_id": str(lead.id),
                    "contact_name": lead.contact_name,
                    "phone_number": lead.phone_number,
                    "email": lead.email,
                    "preferred_destination": lead.preferred_destination,
                    "estimated_pax": lead.estimated_pax,
                    "budget_range": lead.budget_range,
                    "travel_dates": lead.travel_dates,
                    "chat_summary": lead.chat_summary,
                },
            }
            outbox = IntegrationOutbox.objects.create(
                event_id=event_id,
                event_type="ai.lead.created",
                event_version=1,
                source="ai_assistant",
                payload=envelope,
                state=IntegrationOutbox.State.PENDING,
            )
            dispatch_outbox_event.delay(str(outbox.id))
            lead.sync_state = AssistantLeadCapture.SyncState.PENDING
            lead.save(update_fields=["sync_state"])
            count += 1

        self.message_user(
            request,
            f"Đã phát lệnh đồng bộ {count} lead AI Concierge sang Odoo CRM Outbox.",
            messages.SUCCESS,
        )

    @admin.action(description="✓ Đánh dấu trạng thái đã đồng bộ (Synced)")
    def mark_as_synced_action(self, request, queryset):
        from django.contrib import messages

        updated = queryset.update(sync_state=AssistantLeadCapture.SyncState.SYNCED)
        self.message_user(
            request,
            f"Đã đánh dấu {updated} lead AI thành công trạng thái SYNCED.",
            messages.SUCCESS,
        )



@admin.register(AssistantKnowledgeChunk)
class AssistantKnowledgeChunkAdmin(admin.ModelAdmin):
    list_display = ("title", "entity_type", "entity_slug", "updated_at")
    list_filter = ("entity_type", "updated_at")
    search_fields = ("title", "entity_slug", "content_vi")
    readonly_fields = ("id", "created_at", "updated_at")
