from django.db import IntegrityError, transaction
from rest_framework import serializers
from places.models import Place
from .models import Favorite, Review
from .services import ensure_publishable_place, refresh_place_rating

class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="user.username", read_only=True)
    place_slug = serializers.CharField(source="place.slug", read_only=True)

    class Meta:
        model = Review
        fields = ("id", "place", "place_slug", "rating", "body", "author", "created_at", "updated_at")
        read_only_fields = ("id", "author", "place_slug", "created_at", "updated_at")

    def validate_place(self, place):
        ensure_publishable_place(place)
        return place

    def create(self, validated_data):
        try:
            with transaction.atomic():
                review = Review.objects.create(user=self.context["request"].user, **validated_data)
                refresh_place_rating(review.place_id)
                return review
        except IntegrityError as exc:
            raise serializers.ValidationError({"place": "You already reviewed this place."}) from exc

    def update(self, instance, validated_data):
        validated_data.pop("place", None)
        review = super().update(instance, validated_data)
        refresh_place_rating(review.place_id)
        return review

class FavoriteSerializer(serializers.ModelSerializer):
    place_slug = serializers.CharField(source="place.slug", read_only=True)

    class Meta:
        model = Favorite
        fields = ("id", "place", "place_slug", "created_at")
        read_only_fields = ("id", "place_slug", "created_at")

    def validate_place(self, place):
        ensure_publishable_place(place)
        return place

    def create(self, validated_data):
        try:
            return Favorite.objects.create(user=self.context["request"].user, **validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError({"place": "This place is already in your favorites."}) from exc
