import uuid

from django.conf import settings
from django.db import models


class Booking(models.Model):
    class ItemType(models.TextChoices):
        TOUR = "tour", "Tour du lịch"
        ACCOMMODATION_REFERRAL = "accommodation_referral", "Giới thiệu khách sạn"
        RESTAURANT_REFERRAL = "restaurant_referral", "Giới thiệu nhà hàng"

    class Status(models.TextChoices):
        PENDING = "pending", "Chờ xác nhận"
        PAID = "paid", "Đã thanh toán"
        CONFIRMED = "confirmed", "Đã xác nhận"
        CANCELLED = "cancelled", "Đã hủy"
        COMPLETED = "completed", "Hoàn thành"
        REFERRED = "referred", "Đã chuyển đối tác"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking_code = models.CharField(max_length=32, unique=True, db_index=True)
    item_type = models.CharField(
        max_length=32,
        choices=ItemType.choices,
        default=ItemType.TOUR,
        db_index=True,
    )
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
    accommodation = models.ForeignKey(
        "accommodations.Accommodation",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="referral_bookings",
    )
    restaurant = models.ForeignKey(
        "restaurants.Restaurant",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="referral_bookings",
    )
    referral_partner_name = models.CharField(max_length=128, null=True, blank=True)
    referral_target_url = models.CharField(max_length=512, null=True, blank=True)
    contact_name = models.CharField(max_length=255, blank=True, default="")
    contact_email = models.EmailField(blank=True, default="")
    contact_phone = models.CharField(max_length=32, blank=True, default="")
    departure_date = models.DateField(null=True, blank=True)
    pax_adults = models.PositiveIntegerField(default=1)
    pax_children = models.PositiveIntegerField(default=0)
    unit_price = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )
    total_amount = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True
    )
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
        indexes = [
            models.Index(
                fields=["item_type", "status", "created_at"],
                name="idx_booking_type_stat_dt",
            ),
        ]

    def __str__(self) -> str:
        label = self.contact_name or self.referral_partner_name or "Khách hàng"
        return f"{self.booking_code} [{self.item_type}] — {label} ({self.status})"
