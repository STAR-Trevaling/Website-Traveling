from rest_framework import serializers

from .models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
    AssistantMessage,
)


class AssistantMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistantMessage
        fields = ("id", "role", "content", "structured_payload", "created_at")


class AssistantConversationSerializer(serializers.ModelSerializer):
    messages = AssistantMessageSerializer(many=True, read_only=True)

    class Meta:
        model = AssistantConversation
        fields = (
            "id",
            "session_token",
            "title",
            "locale",
            "metadata",
            "messages",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class AssistantLeadCaptureSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistantLeadCapture
        fields = (
            "id",
            "conversation",
            "contact_name",
            "phone_number",
            "email",
            "preferred_destination",
            "estimated_pax",
            "budget_range",
            "travel_dates",
            "chat_summary",
            "sync_state",
            "odoo_lead_id",
            "created_at",
        )
        read_only_fields = ("id", "sync_state", "odoo_lead_id", "created_at")


class AssistantKnowledgeChunkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssistantKnowledgeChunk
        fields = (
            "id",
            "entity_type",
            "entity_slug",
            "title",
            "content_vi",
            "content_en",
            "metadata",
            "updated_at",
        )
