from rest_framework import serializers

from .models import PaymentTransaction


class PaymentCreateSerializer(serializers.Serializer):
    booking_code = serializers.CharField(max_length=64, required=True)
    gateway = serializers.CharField(max_length=32, default="vnpay", required=False)
    bank_code = serializers.CharField(max_length=32, required=False, allow_blank=True, default="")
    locale = serializers.CharField(max_length=8, default="vn", required=False)
    return_url = serializers.URLField(required=False, allow_blank=True, default=None)


class PaymentTransactionSerializer(serializers.ModelSerializer):
    booking_code = serializers.CharField(source="booking.booking_code", read_only=True)

    class Meta:
        model = PaymentTransaction
        fields = [
            "id",
            "transaction_code",
            "booking_code",
            "provider",
            "provider_ref",
            "amount",
            "currency",
            "status",
            "error_code",
            "created_at",
            "completed_at",
            "expires_at",
        ]
        read_only_fields = fields


class VietQRConfirmSerializer(serializers.Serializer):
    payment_id = serializers.CharField(max_length=128, required=False, allow_blank=True)
    confirmed_by = serializers.CharField(max_length=255, required=False, default="odoo_accounting")
    confirmed_at = serializers.DateTimeField(required=False, default=None)
    amount_confirmed = serializers.DecimalField(
        max_digits=12, decimal_places=2, required=False, default=None
    )
    source = serializers.CharField(max_length=64, required=False, default="manual_odoo_ui")  # type: ignore[assignment]
