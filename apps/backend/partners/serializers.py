from rest_framework import serializers

from .models import PartnerApplication, PartnerMembership


class PartnerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerApplication
        fields = (
            "id",
            "business_name",
            "email",
            "phone",
            "website",
            "message",
            "status",
            "rejection_reason",
            "reviewed_at",
            "created_at",
        )
        read_only_fields = ("id", "status", "rejection_reason", "reviewed_at", "created_at")

    def create(self, validated_data):
        return PartnerApplication.objects.create(
            applicant=self.context["request"].user, **validated_data
        )


class PartnerMembershipSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source="organization.name", read_only=True)
    organization_slug = serializers.CharField(source="organization.slug", read_only=True)

    class Meta:
        model = PartnerMembership
        fields = ("id", "organization_name", "organization_slug", "role", "created_at")


class RejectApplicationSerializer(serializers.Serializer):
    reason = serializers.CharField(max_length=2000)
