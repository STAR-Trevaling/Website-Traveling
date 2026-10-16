from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    destination_slug = serializers.CharField(source="destination.slug", read_only=True)
    place_slug = serializers.CharField(source="place.slug", read_only=True)
    readTime = serializers.CharField(source="read_time", read_only=True)
    authorName = serializers.CharField(source="author_name", read_only=True)
    authorRole = serializers.CharField(source="author_role", read_only=True)
    authorAvatar = serializers.CharField(source="author_avatar", read_only=True)

    class Meta:
        model = Article
        fields = (
            "id",
            "slug",
            "title",
            "excerpt",
            "body",
            "cover_image",
            "read_time",
            "readTime",
            "category",
            "author_name",
            "authorName",
            "author_role",
            "authorRole",
            "author_avatar",
            "authorAvatar",
            "tags",
            "destination_slug",
            "place_slug",
            "published_at",
        )
