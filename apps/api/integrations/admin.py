import uuid

from django.contrib import admin, messages
from django.utils import timezone

from .models import Inquiry, IntegrationEvent, IntegrationOutbox
from .tasks import dispatch_outbox_event


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "email",
        "inquiry_type",
        "destination_slug",
        "tour_slug",
        "guests",
        "status",
        "odoo_lead_id",
        "created_at",
    )
    list_filter = ("status", "inquiry_type", "source", "created_at")
    search_fields = (
        "full_name",
        "email",
        "phone",
        "destination_slug",
        "tour_slug",
        "message",
    )
    readonly_fields = ("id", "odoo_lead_id", "created_at", "updated_at")
    actions = ["dispatch_to_odoo_action", "mark_as_synced_action"]

    fieldsets = (
        (
            "Thông Tin Khách Hàng",
            {
                "fields": (
                    "full_name",
                    "phone",
                    "email",
                    "source",
                )
            },
        ),
        (
            "Nhu Cầu Du Lịch & Dịch Vụ",
            {
                "fields": (
                    "inquiry_type",
                    "destination_slug",
                    "tour_slug",
                    "travel_date",
                    "guests",
                    "message",
                )
            },
        ),
        (
            "Đồng Bộ Odoo CRM",
            {
                "fields": (
                    "status",
                    "odoo_lead_id",
                    "id",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    @admin.action(description="🔄 Đẩy lại sự kiện đồng bộ sang Odoo CRM")
    def dispatch_to_odoo_action(self, request, queryset):
        count = 0
        for inquiry in queryset:
            event_id = str(uuid.uuid4())
            envelope = {
                "event_id": event_id,
                "event_type": "inquiry.created",
                "event_version": 1,
                "source": inquiry.source or "website",
                "occurred_at": timezone.now().isoformat(),
                "data": {
                    "inquiry_id": str(inquiry.id),
                    "customer": {
                        "name": inquiry.full_name,
                        "email": inquiry.email,
                        "phone": inquiry.phone,
                        "identity_provider": inquiry.source,
                    },
                    "inquiry": {
                        "type": inquiry.inquiry_type,
                        "destination_slug": inquiry.destination_slug,
                        "tour_slug": inquiry.tour_slug,
                        "travel_date": str(inquiry.travel_date) if inquiry.travel_date else None,
                        "traveler_count": inquiry.guests,
                        "message": inquiry.message,
                    },
                    "marketing": {
                        "channel": inquiry.source,
                    },
                },
            }
            outbox = IntegrationOutbox.objects.create(
                event_id=event_id,
                event_type="inquiry.created",
                event_version=1,
                source=inquiry.source or "website",
                payload=envelope,
                state=IntegrationOutbox.State.PENDING,
            )
            dispatch_outbox_event.delay(str(outbox.id))
            inquiry.status = Inquiry.Status.PENDING
            inquiry.save(update_fields=["status"])
            count += 1

        self.message_user(
            request,
            f"Đã phát lệnh đồng bộ {count} lead inquiry sang hàng đợi Odoo CRM Outbox.",
            messages.SUCCESS,
        )

    @admin.action(description="✓ Đánh dấu trạng thái đã đồng bộ (Synced)")
    def mark_as_synced_action(self, request, queryset):
        updated = queryset.update(status=Inquiry.Status.SYNCED)
        self.message_user(
            request,
            f"Đã đánh dấu {updated} yêu cầu thành công trạng thái SYNCED.",
            messages.SUCCESS,
        )


@admin.register(IntegrationOutbox)
class IntegrationOutboxAdmin(admin.ModelAdmin):
    list_display = (
        "event_id",
        "event_type",
        "source",
        "state",
        "retry_count",
        "http_status",
        "next_retry_at",
        "created_at",
        "delivered_at",
    )
    list_filter = ("state", "event_type", "source", "created_at")
    search_fields = ("event_id", "event_type", "last_error")
    readonly_fields = (
        "id",
        "event_id",
        "event_type",
        "event_version",
        "source",
        "payload",
        "http_status",
        "last_error",
        "delivered_at",
        "created_at",
    )
    actions = ["retry_selected_outbox"]

    @admin.action(description="🔄 Thử lại các sự kiện Outbox đã chọn (Retry)")
    def retry_selected_outbox(self, request, queryset):
        requeued = 0
        for outbox in queryset:
            outbox.state = IntegrationOutbox.State.PENDING
            outbox.retry_count = 0
            outbox.next_retry_at = timezone.now()
            outbox.save(update_fields=["state", "retry_count", "next_retry_at"])
            dispatch_outbox_event.delay(str(outbox.id))
            requeued += 1

        self.message_user(
            request,
            f"Đã kích hoạt thử lại {requeued} sự kiện Outbox sang Odoo ERP.",
            messages.SUCCESS,
        )


@admin.register(IntegrationEvent)
class IntegrationEventAdmin(admin.ModelAdmin):
    list_display = (
        "external_event_id",
        "source",
        "event_type",
        "state",
        "received_at",
        "processed_at",
    )
    list_filter = ("state", "source", "event_type", "received_at")
    search_fields = ("external_event_id", "event_type", "last_error")
    readonly_fields = (
        "id",
        "source",
        "external_event_id",
        "event_type",
        "event_version",
        "payload_hash",
        "raw_payload",
        "response_json",
        "last_error",
        "received_at",
        "processed_at",
    )
