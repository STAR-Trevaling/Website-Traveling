from rest_framework import serializers

from .models import Tour


class TourSerializer(serializers.ModelSerializer):
    # Aliases matching Next.js TourItem contract
    image = serializers.CharField(source="image_url", read_only=True)
    imageUrl = serializers.CharField(source="image_url", read_only=True)
    destination = serializers.SerializerMethodField()
    destination_en = serializers.CharField(source="destination_name_en", read_only=True)
    groupSize = serializers.CharField(source="group_size", read_only=True)
    originalPrice = serializers.DecimalField(
        source="original_price", max_digits=12, decimal_places=0, read_only=True
    )
    reviewCount = serializers.IntegerField(source="review_count", read_only=True)
    featured = serializers.BooleanField(source="is_featured", read_only=True)

    class Meta:
        model = Tour
        fields = (
            "id",
            "slug",
            "title",
            "title_en",
            "destination",
            "destination_en",
            "destination_name",
            "destination_name_en",
            "duration",
            "duration_en",
            "departure",
            "departure_en",
            "group_size",
            "groupSize",
            "price",
            "original_price",
            "originalPrice",
            "rating",
            "review_count",
            "reviewCount",
            "image",
            "imageUrl",
            "image_url",
            "gallery_urls",
            "overview",
            "overview_en",
            "highlights",
            "highlights_en",
            "itinerary",
            "itinerary_en",
            "included",
            "included_en",
            "excluded",
            "excluded_en",
            "region",
            "is_published",
            "is_featured",
            "featured",
            "created_at",
            "updated_at",
        )

    def get_destination(self, obj):
        if obj.destination:
            return obj.destination.name
        return obj.destination_name or "Việt Nam"
