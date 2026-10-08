import uuid
from django.db import models
from django.utils import timezone


class Inquiry(models.Model):
    class InquiryType(models.TextChoices):
        CONSULTATION = "consultation", "Destination Consultation"
        TOUR_BOOKING = "tour_booking", "Tour / Experience Booking"
        GENERAL_SUPPORT = "general_support", "General Support"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending Sync"
        SYNCED = "synced", "Synced to Odoo CRM"
        FAILED = "failed", "Sync Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=180)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    destination_slug = models.CharField(max_length=180, blank=True)
    tour_slug = models.CharField(max_length=180, blank=True)
    travel_date = models.DateField(null=True, blank=True)
    guests = models.PositiveIntegerField(default=1)
    message = models.TextField(blank=True)
    inquiry_type = models.CharField(
        max_length=30, choices=InquiryType.choices, default=InquiryType.CONSULTATION, db_index=True
    )
    source = models.CharField(max_length=50, default="website", db_index=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True
    )
    odoo_lead_id = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"{self.full_name} ({self.inquiry_type}) - {self.phone}"


class IntegrationOutbox(models.Model):
    class State(models.TextChoices):
        PENDING = "pending", "Pending Delivery"
        DELIVERED = "delivered", "Delivered"
        FAILED = "failed", "Permanently Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_id = models.CharField(max_length=64, unique=True, db_index=True)
    event_type = models.CharField(max_length=100, db_index=True)
    event_version = models.PositiveSmallIntegerField(default=1)
    source = models.CharField(max_length=50, default="public-platform")
    payload = models.JSONField()

    state = models.CharField(
        max_length=20, choices=State.choices, default=State.PENDING, db_index=True
    )
    retry_count = models.PositiveIntegerField(default=0)
    max_retries = models.PositiveIntegerField(default=5)
    next_retry_at = models.DateTimeField(default=timezone.now, db_index=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    last_error = models.TextField(blank=True)
    http_status = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_at",)
        indexes = [
            models.Index(fields=("state", "next_retry_at"), name="outbox_state_retry_idx")
        ]

    def __str__(self):
        return f"Outbox [{self.event_type}] {self.event_id} ({self.state})"


class IntegrationEvent(models.Model):
    class State(models.TextChoices):
        PENDING = "pending", "Pending"
        PROCESSED = "processed", "Processed"
        FAILED = "failed", "Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.CharField(max_length=50, db_index=True)
    external_event_id = models.CharField(max_length=100, db_index=True)
    event_type = models.CharField(max_length=100, db_index=True)
    event_version = models.PositiveSmallIntegerField(default=1)
    payload_hash = models.CharField(max_length=64, blank=True)

    state = models.CharField(
        max_length=20, choices=State.choices, default=State.PENDING, db_index=True
    )
    raw_payload = models.JSONField()
    response_json = models.JSONField(null=True, blank=True)
    last_error = models.TextField(blank=True)
    received_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-received_at",)
        constraints = [
            models.UniqueConstraint(
                fields=("source", "external_event_id"), name="unique_source_external_event"
            )
        ]

    def __str__(self):
        return f"Inbound [{self.source}] {self.event_type} - {self.external_event_id}"
