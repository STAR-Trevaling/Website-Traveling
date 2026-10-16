from rest_framework import serializers

from destinations.serializers import DestinationSerializer

from .models import Category, Place


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "name_en", "slug")


class PlaceSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    destination = DestinationSerializer(read_only=True)
    location = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = (
            "id",
            "slug",
            "name",
            "name_en",
            "short_description",
            "short_description_en",
            "description",
            "description_en",
            "image_url",
            "overlay_image_url",
            "address",
            "address_en",
            "website_url",
            "location",
            "destination",
            "category",
            "average_rating",
            "review_count",
        )

    def get_location(self, obj):
        return {"lat": obj.location.y, "lng": obj.location.x}
