from rest_framework import serializers

from .models import Accommodation


class AccommodationSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source="destination.name", read_only=True)
    destination_slug = serializers.CharField(source="destination.slug", read_only=True)

    class Meta:
        model = Accommodation
        fields = [
            "id",
            "slug",
            "destination",
            "destination_name",
            "destination_slug",
            "name",
            "name_en",
            "category",
            "star_rating",
            "address",
            "description",
            "description_en",
            "amenities",
            "price_from",
            "image_url",
            "gallery",
            "partner_booking_url",
            "partner_name",
            "partner_commission_rate",
            "rating_average",
            "rating_count",
            "is_active",
            "created_at",
            "updated_at",
        ]
