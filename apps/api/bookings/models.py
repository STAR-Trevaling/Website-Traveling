import uuid
from decimal import Decimal
from django.conf import settings
from django.db import models


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Chờ xác nhận"
        PAID = "paid", "Đã thanh toán"
        CONFIRMED = "confirmed", "Đã xác nhận"
        CANCELLED = "cancelled", "Đã hủy"
        COMPLETED = "completed", "Hoàn thành"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking_code = models.CharField(max_length=32, unique=True, db_index=True)
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bookings",
    )
    tour = models.ForeignKey(
        "tours.Tour",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="bookings",
    )
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=32)
    departure_date = models.DateField(null=True, blank=True)
    pax_adults = models.PositiveIntegerField(default=1)
    pax_children = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    currency = models.CharField(max_length=8, default="VND")
    status = models.CharField(
        max_length=32,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
    )
    payment_method = models.CharField(max_length=32, default="vnpay")
    payment_status = models.CharField(max_length=32, default="unpaid", db_index=True)
    special_requests = models.TextField(blank=True)
    odoo_order_id = models.IntegerField(null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return f"{self.booking_code} — {self.contact_name} ({self.status})"
