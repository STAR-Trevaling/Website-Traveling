import uuid
from decimal import Decimal

from django.db import models


class PaymentTransaction(models.Model):
    class Provider(models.TextChoices):
        VNPAY = "vnpay", "VNPay"
        VIETQR = "vietqr", "VietQR"
        CASH = "cash", "Tiền mặt"
        MOMO = "momo", "MoMo"
        ZALOPAY = "zalopay", "ZaloPay"
        STRIPE = "stripe", "Stripe"

    class Status(models.TextChoices):
        PENDING = "pending", "Chờ thanh toán"
        SUCCESS = "success", "Thành công"
        FAILED = "failed", "Thất bại"
        EXPIRED = "expired", "Hết hạn"
        REFUNDED = "refunded", "Đã hoàn tiền"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.ForeignKey(
        "bookings.Booking",
        on_delete=models.PROTECT,
        related_name="payment_transactions",
    )
    transaction_code = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
        help_text="Mã giao dịch gửi sang cổng thanh toán (vnp_TxnRef)",
    )
    provider = models.CharField(
        max_length=32,
        choices=Provider.choices,
        default=Provider.VNPAY,
        db_index=True,
    )
    provider_ref = models.CharField(
        max_length=128,
        null=True,
        blank=True,
        db_index=True,
        help_text="Mã tham chiếu từ cổng thanh toán (vnp_TransactionNo)",
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    currency = models.CharField(max_length=8, default="VND")
    status = models.CharField(
        max_length=32,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
    )
    idempotency_key = models.CharField(
        max_length=128,
        unique=True,
        db_index=True,
        help_text="Khóa chống xử lý lặp lại webhook",
    )
    request_payload = models.JSONField(default=dict, blank=True)
    response_payload = models.JSONField(default=dict, blank=True)
    error_code = models.CharField(max_length=64, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Payment Transaction"
        verbose_name_plural = "Payment Transactions"

    def __str__(self):
        return f"{self.transaction_code} ({self.provider}) — {self.amount} {self.currency} [{self.status}]"
