from django.contrib import admin

from .models import PaymentTransaction


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "transaction_code",
        "booking",
        "provider",
        "amount",
        "currency",
        "status",
        "provider_ref",
        "created_at",
        "completed_at",
    )
    list_filter = ("provider", "status", "created_at")
    search_fields = ("transaction_code", "provider_ref", "booking__booking_code", "idempotency_key")
    readonly_fields = (
        "id",
        "transaction_code",
        "booking",
        "provider",
        "amount",
        "currency",
        "idempotency_key",
        "request_payload",
        "response_payload",
        "created_at",
        "completed_at",
        "expires_at",
    )
