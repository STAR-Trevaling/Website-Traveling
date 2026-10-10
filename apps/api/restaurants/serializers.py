from rest_framework import serializers

from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source="destination.name", read_only=True)
    destination_slug = serializers.CharField(source="destination.slug", read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            "id",
            "slug",
            "destination",
            "destination_name",
            "destination_slug",
            "name",
            "name_en",
            "cuisine_type",
            "price_range",
            "address",
            "description",
            "description_en",
            "signature_dishes",
            "opening_hours",
            "image_url",
            "gallery",
            "contact_type",
            "contact_value",
            "partner_commission_rate",
            "rating_average",
            "rating_count",
            "is_active",
            "created_at",
            "updated_at",
        ]
