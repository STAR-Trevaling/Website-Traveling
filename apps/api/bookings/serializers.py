import uuid
from decimal import Decimal

from rest_framework import serializers

from tours.models import Tour

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    tour_title = serializers.CharField(source="tour.title", read_only=True)
    tour_slug = serializers.CharField(source="tour.slug", read_only=True)
    tour_slug_input = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Booking
        fields = (
            "id",
            "booking_code",
            "item_type",
            "customer",
            "tour",
            "tour_title",
            "tour_slug",
            "tour_slug_input",
            "accommodation",
            "restaurant",
            "referral_partner_name",
            "referral_target_url",
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
            "unit_price",
            "total_amount",
            "currency",
            "status",
            "odoo_order_id",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        tour_slug = validated_data.pop("tour_slug_input", None)
        if not validated_data.get("tour") and tour_slug:
            tour_obj = Tour.objects.filter(slug=tour_slug).first()
            if tour_obj:
                validated_data["tour"] = tour_obj

        tour = validated_data.get("tour")
        pax_adults = max(1, validated_data.get("pax_adults", 1))
        pax_children = max(0, validated_data.get("pax_children", 0))

        if tour:
            validated_data["unit_price"] = tour.price
            child_price = (tour.price * Decimal("0.7")).quantize(Decimal("1"))
            validated_data["total_amount"] = (tour.price * pax_adults) + (child_price * pax_children)
            validated_data["currency"] = "VND"
            code_prefix = tour.slug.replace("-", "").upper()[:4]
        else:
            code_prefix = "TRIP"

        if "booking_code" not in validated_data or not validated_data["booking_code"]:
            code_suffix = uuid.uuid4().hex[:6].upper()
            validated_data["booking_code"] = f"STAR-{code_prefix}-{code_suffix}"

        return super().create(validated_data)


class ReferralTrackSerializer(serializers.Serializer):
    item_type = serializers.ChoiceField(
        choices=[
            Booking.ItemType.ACCOMMODATION_REFERRAL,
            Booking.ItemType.RESTAURANT_REFERRAL,
        ]
    )
    item_id = serializers.UUIDField()
    contact_name = serializers.CharField(
        max_length=255, required=False, allow_null=True, allow_blank=True, default=""
    )
    contact_phone = serializers.CharField(
        max_length=32, required=False, allow_null=True, allow_blank=True, default=""
    )
    contact_email = serializers.EmailField(
        required=False, allow_null=True, allow_blank=True, default=""
    )
