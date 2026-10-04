from rest_framework import serializers
from .models import Destination

class DestinationSerializer(serializers.ModelSerializer):
    center = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ("id", "slug", "name", "country", "summary", "description", "image_url", "hero_image_url", "starting_price", "center")

    def get_center(self, obj):
        if not obj.center:
            return None
        return {"lat": obj.center.y, "lng": obj.center.x}
