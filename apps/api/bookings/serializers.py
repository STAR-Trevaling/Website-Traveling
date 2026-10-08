import uuid
from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    tour_title = serializers.CharField(source="tour.title", read_only=True)
    tour_slug = serializers.CharField(source="tour.slug", read_only=True)

    class Meta:
        model = Booking
        fields = (
            "id",
            "booking_code",
            "customer",
            "tour",
            "tour_title",
            "tour_slug",
            "contact_name",
            "contact_email",
            "contact_phone",
            "departure_date",
            "pax_adults",
            "pax_children",
            "unit_price",
            "total_amount",
            "currency",
            "status",
            "special_requests",
            "odoo_order_id",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "booking_code",
            "status",
            "odoo_order_id",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        if "booking_code" not in validated_data or not validated_data["booking_code"]:
            code_suffix = uuid.uuid4().hex[:6].upper()
            validated_data["booking_code"] = f"STAR-{code_suffix}"
        return super().create(validated_data)
