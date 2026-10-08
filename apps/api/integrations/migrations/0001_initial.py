import uuid
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name="Inquiry",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("full_name", models.CharField(max_length=180)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=40)),
                ("destination_slug", models.CharField(blank=True, max_length=180)),
                ("tour_slug", models.CharField(blank=True, max_length=180)),
                ("travel_date", models.DateField(blank=True, null=True)),
                ("guests", models.PositiveIntegerField(default=1)),
                ("message", models.TextField(blank=True)),
                (
                    "inquiry_type",
                    models.CharField(
                        choices=[
                            ("consultation", "Destination Consultation"),
                            ("tour_booking", "Tour / Experience Booking"),
                            ("general_support", "General Support"),
                        ],
                        db_index=True,
                        default="consultation",
                        max_length=30,
                    ),
                ),
                ("source", models.CharField(db_index=True, default="website", max_length=50)),
                (
                    "status",
                    models.CharField(
                        choices=[("pending", "Pending Sync"), ("synced", "Synced to Odoo CRM"), ("failed", "Sync Failed")],
                        db_index=True,
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("odoo_lead_id", models.IntegerField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name_plural": "Inquiries",
                "ordering": ("-created_at",),
            },
        ),
        migrations.CreateModel(
            name="IntegrationOutbox",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("event_id", models.CharField(db_index=True, max_length=64, unique=True)),
                ("event_type", models.CharField(db_index=True, max_length=100)),
                ("event_version", models.PositiveSmallIntegerField(default=1)),
                ("source", models.CharField(default="public-platform", max_length=50)),
                ("payload", models.JSONField()),
                (
                    "state",
                    models.CharField(
                        choices=[("pending", "Pending Delivery"), ("delivered", "Delivered"), ("failed", "Permanently Failed")],
                        db_index=True,
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("retry_count", models.PositiveIntegerField(default=0)),
                ("max_retries", models.PositiveIntegerField(default=5)),
                ("next_retry_at", models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ("delivered_at", models.DateTimeField(blank=True, null=True)),
                ("last_error", models.TextField(blank=True)),
                ("http_status", models.PositiveIntegerField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ("created_at",),
                "indexes": [
                    models.Index(fields=["state", "next_retry_at"], name="outbox_state_retry_idx"),
                ],
            },
        ),
        migrations.CreateModel(
            name="IntegrationEvent",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("source", models.CharField(db_index=True, max_length=50)),
                ("external_event_id", models.CharField(db_index=True, max_length=100)),
                ("event_type", models.CharField(db_index=True, max_length=100)),
                ("event_version", models.PositiveSmallIntegerField(default=1)),
                ("payload_hash", models.CharField(blank=True, max_length=64)),
                (
                    "state",
                    models.CharField(
                        choices=[("pending", "Pending"), ("processed", "Processed"), ("failed", "Failed")],
                        db_index=True,
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("raw_payload", models.JSONField()),
                ("response_json", models.JSONField(blank=True, null=True)),
                ("last_error", models.TextField(blank=True)),
                ("received_at", models.DateTimeField(auto_now_add=True)),
                ("processed_at", models.DateTimeField(blank=True, null=True)),
            ],
            options={
                "ordering": ("-received_at",),
                "constraints": [
                    models.UniqueConstraint(fields=["source", "external_event_id"], name="unique_source_external_event"),
                ],
            },
        ),
    ]
