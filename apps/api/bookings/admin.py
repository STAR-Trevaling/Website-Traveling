from datetime import timedelta

from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path
from django.utils import timezone

from accommodations.models import Accommodation
from restaurants.models import Restaurant

from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    change_list_template = "admin/bookings/booking/change_list.html"

    list_display = (
        "booking_code",
        "item_type",
        "contact_name",
        "contact_phone",
        "tour",
        "referral_item_display",
        "referral_partner_name",
        "status",
        "created_at",
    )
    list_filter = (
        "item_type",
        "status",
        "referral_partner_name",
        "created_at",
    )
    search_fields = (
        "booking_code",
        "contact_name",
        "contact_email",
        "contact_phone",
        "referral_partner_name",
        "tour__title",
        "accommodation__name",
        "restaurant__name",
    )
    readonly_fields = (
        "id",
        "booking_code",
        "referral_target_url",
        "created_at",
        "updated_at",
    )
    fieldsets = (
        (
            "Phân Loại & Mã Đặt Chỗ",
            {
                "fields": (
                    "booking_code",
                    "item_type",
                    "status",
                    "customer",
                )
            },
        ),
        (
            "Thông Tin Giới Thiệu Đối Tác (Referral Tracking)",
            {
                "fields": (
                    "accommodation",
                    "restaurant",
                    "referral_partner_name",
                    "referral_target_url",
                ),
            },
        ),
        (
            "Khách Hàng & Thông Tin Liên Hệ",
            {
                "fields": (
                    "contact_name",
                    "contact_email",
                    "contact_phone",
                )
            },
        ),
        (
            "Tour Trọn Gói (Nếu Áp Dụng)",
            {
                "fields": (
                    "tour",
                    "departure_date",
                    "pax_adults",
                    "pax_children",
                    "special_requests",
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "Tài Chính & Đồng Bộ Odoo",
            {
                "fields": (
                    "unit_price",
                    "total_amount",
                    "currency",
                    "payment_method",
                    "payment_status",
                    "odoo_order_id",
                ),
                "classes": ("collapse",),
            },
        ),
        (
            "Thời Gian Ghi Nhận",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    @admin.display(description="Mục Giới Thiệu")
    def referral_item_display(self, obj):
        if obj.accommodation:
            return f"🏨 {obj.accommodation.name}"
        if obj.restaurant:
            return f"🍽️ {obj.restaurant.name}"
        return "-"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "referrals-stats/",
                self.admin_site.admin_view(self.referral_stats_view),
                name="booking_referral_stats",
            ),
        ]
        return custom_urls + urls

    def referral_stats_view(self, request):
        now = timezone.now()
        thirty_days_ago = now - timedelta(days=30)

        referrals_qs = Booking.objects.filter(
            item_type__in=[
                Booking.ItemType.ACCOMMODATION_REFERRAL,
                Booking.ItemType.RESTAURANT_REFERRAL,
            ]
        )

        total_referrals = referrals_qs.count()
        total_acc_referrals = referrals_qs.filter(
            item_type=Booking.ItemType.ACCOMMODATION_REFERRAL
        ).count()
        total_res_referrals = referrals_qs.filter(
            item_type=Booking.ItemType.RESTAURANT_REFERRAL
        ).count()
        total_leads_captured = (
            referrals_qs.exclude(contact_phone="")
            .exclude(contact_phone__isnull=True)
            .count()
        )

        # Accommodation stats
        accommodations = Accommodation.objects.all().select_related("destination")
        acc_stats = []
        for acc in accommodations:
            acc_bookings = referrals_qs.filter(accommodation=acc)
            total_clicks = acc_bookings.count()
            clicks_30d = acc_bookings.filter(created_at__gte=thirty_days_ago).count()
            leads_count = (
                acc_bookings.exclude(contact_phone="")
                .exclude(contact_phone__isnull=True)
                .count()
            )
            acc_stats.append(
                {
                    "name": acc.name,
                    "destination": acc.destination.name,
                    "partner_name": acc.partner_name,
                    "total_clicks": total_clicks,
                    "clicks_30d": clicks_30d,
                    "leads_count": leads_count,
                }
            )
        acc_stats.sort(key=lambda x: x["total_clicks"], reverse=True)

        # Restaurant stats
        restaurants = Restaurant.objects.all().select_related("destination")
        res_stats = []
        for res in restaurants:
            res_bookings = referrals_qs.filter(restaurant=res)
            total_clicks = res_bookings.count()
            clicks_30d = res_bookings.filter(created_at__gte=thirty_days_ago).count()
            leads_count = (
                res_bookings.exclude(contact_phone="")
                .exclude(contact_phone__isnull=True)
                .count()
            )
            res_stats.append(
                {
                    "name": res.name,
                    "destination": res.destination.name,
                    "cuisine_type": res.cuisine_type,
                    "total_clicks": total_clicks,
                    "clicks_30d": clicks_30d,
                    "leads_count": leads_count,
                }
            )
        res_stats.sort(key=lambda x: x["total_clicks"], reverse=True)

        context = {
            **self.admin_site.each_context(request),
            "title": "Báo Cáo Thống Kê Referral Đối Tác",
            "total_referrals": total_referrals,
            "total_acc_referrals": total_acc_referrals,
            "total_res_referrals": total_res_referrals,
            "total_leads_captured": total_leads_captured,
            "acc_stats": acc_stats,
            "res_stats": res_stats,
        }
        return TemplateResponse(request, "admin/bookings/referral_stats.html", context)
