from rest_framework import serializers

from .models import Inquiry


class InquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "destination_slug",
            "tour_slug",
            "travel_date",
            "guests",
            "message",
            "inquiry_type",
            "source",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class OdooWebhookEventSerializer(serializers.Serializer):
    event_id = serializers.CharField(required=True)
    event_type = serializers.CharField(required=True)
    event_version = serializers.IntegerField(default=1)
    source = serializers.CharField(default="odoo")
    occurred_at = serializers.CharField(required=False)
    data = serializers.DictField(required=True)
