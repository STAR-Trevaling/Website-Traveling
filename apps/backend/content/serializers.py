from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    destination_slug = serializers.CharField(source="destination.slug", read_only=True)
    place_slug = serializers.CharField(source="place.slug", read_only=True)

    class Meta:
        model = Article
        fields = ("id", "slug", "title", "excerpt", "body", "cover_image", "destination_slug", "place_slug", "published_at")
