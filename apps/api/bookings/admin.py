from django.contrib import admin

from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "booking_code",
        "contact_name",
        "contact_phone",
        "tour",
        "total_amount",
        "departure_date",
        "status",
        "odoo_order_id",
        "created_at",
    )
    list_filter = ("status", "departure_date", "created_at")
    search_fields = (
        "booking_code",
        "contact_name",
        "contact_email",
        "contact_phone",
        "tour__title",
    )
    readonly_fields = ("id", "booking_code", "created_at", "updated_at")
    fieldsets = (
        (
            "Mã đặt chỗ & Khách hàng",
            {
                "fields": (
                    "booking_code",
                    "customer",
                    "contact_name",
                    "contact_email",
                    "contact_phone",
                )
            },
        ),
        (
            "Chi tiết Tour & Thời gian",
            {
                "fields": (
                    "tour",
                    "departure_date",
                    "pax_adults",
                    "pax_children",
                    "special_requests",
                )
            },
        ),
        (
            "Thanh toán & Trạng thái",
            {
                "fields": (
                    "unit_price",
                    "total_amount",
                    "currency",
                    "status",
                    "odoo_order_id",
                )
            },
        ),
        (
            "Thời gian ghi nhận",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )
