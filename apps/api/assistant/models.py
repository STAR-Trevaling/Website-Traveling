import uuid

from django.conf import settings
from django.db import models


class AssistantConversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_token = models.CharField(max_length=128, unique=True, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assistant_conversations",
    )
    title = models.CharField(max_length=255, blank=True)
    locale = models.CharField(max_length=10, default="vi")
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        verbose_name = "AI Conversation"
        verbose_name_plural = "AI Conversations"

    def __str__(self):
        return f"Conv {self.session_token[:8]} ({self.locale})"


class AssistantMessage(models.Model):
    class Role(models.TextChoices):
        USER = "user", "User"
        ASSISTANT = "assistant", "Assistant"
        SYSTEM = "system", "System"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        AssistantConversation,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    role = models.CharField(max_length=16, choices=Role.choices, default=Role.USER)
    content = models.TextField()
    structured_payload = models.JSONField(default=dict, blank=True)
    tokens_used = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["created_at"]
        verbose_name = "AI Message"
        verbose_name_plural = "AI Messages"

    def __str__(self):
        return f"[{self.role}] {self.content[:40]}..."


class AssistantLeadCapture(models.Model):
    class SyncState(models.TextChoices):
        PENDING = "pending", "Chờ đồng bộ"
        SYNCED = "synced", "Đã đồng bộ CRM"
        FAILED = "failed", "Lỗi đồng bộ"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        AssistantConversation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
    )
    contact_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=32, db_index=True)
    email = models.EmailField(blank=True)
    preferred_destination = models.CharField(max_length=255, blank=True)
    estimated_pax = models.PositiveIntegerField(default=1)
    budget_range = models.CharField(max_length=128, blank=True)
    travel_dates = models.CharField(max_length=128, blank=True)
    chat_summary = models.TextField(blank=True)
    sync_state = models.CharField(
        max_length=32,
        choices=SyncState.choices,
        default=SyncState.PENDING,
        db_index=True,
    )
    odoo_lead_id = models.IntegerField(null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "AI Lead Capture"
        verbose_name_plural = "AI Lead Captures"

    def __str__(self):
        return f"{self.contact_name} ({self.phone_number}) — {self.preferred_destination}"


class AssistantKnowledgeChunk(models.Model):
    class EntityType(models.TextChoices):
        TOUR = "tour", "Tour du lịch"
        DESTINATION = "destination", "Điểm đến"
        PLACE = "place", "Danh thắng / Trải nghiệm"
        ARTICLE = "article", "Bài viết / Stories"
        POLICY = "policy", "Chính sách / Dịch vụ"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    entity_type = models.CharField(
        max_length=32,
        choices=EntityType.choices,
        default=EntityType.TOUR,
        db_index=True,
    )
    entity_id = models.UUIDField(null=True, blank=True, db_index=True)
    entity_slug = models.CharField(max_length=128, db_index=True)
    title = models.CharField(max_length=255)
    content_vi = models.TextField()
    content_en = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    embedding = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        ordering = ["-updated_at"]
        verbose_name = "Knowledge Chunk"
        verbose_name_plural = "Knowledge Chunks"
        indexes = [
            models.Index(fields=["entity_type", "entity_slug"]),
        ]

    def __str__(self):
        return f"[{self.entity_type}] {self.title}"
