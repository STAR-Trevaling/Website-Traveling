import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [
        ("destinations", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Tour",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                ("slug", models.SlugField(max_length=180, unique=True)),
                ("title", models.CharField(max_length=220)),
                ("title_en", models.CharField(blank=True, max_length=220)),
                ("destination_name", models.CharField(blank=True, max_length=160)),
                ("destination_name_en", models.CharField(blank=True, max_length=160)),
                ("duration", models.CharField(blank=True, max_length=80)),
                ("duration_en", models.CharField(blank=True, max_length=80)),
                ("departure", models.CharField(blank=True, max_length=120)),
                ("departure_en", models.CharField(blank=True, max_length=120)),
                ("group_size", models.CharField(blank=True, max_length=80)),
                ("group_size_en", models.CharField(blank=True, max_length=80)),
                ("price", models.DecimalField(decimal_places=0, max_digits=12)),
                (
                    "original_price",
                    models.DecimalField(blank=True, decimal_places=0, max_digits=12, null=True),
                ),
                ("rating", models.DecimalField(decimal_places=2, default=5.0, max_digits=3)),
                ("review_count", models.PositiveIntegerField(default=0)),
                ("image_url", models.URLField(blank=True)),
                ("gallery_urls", models.JSONField(blank=True, default=list)),
                ("overview", models.TextField(blank=True)),
                ("overview_en", models.TextField(blank=True)),
                ("highlights", models.JSONField(blank=True, default=list)),
                ("highlights_en", models.JSONField(blank=True, default=list)),
                ("itinerary", models.JSONField(blank=True, default=list)),
                ("itinerary_en", models.JSONField(blank=True, default=list)),
                ("included", models.JSONField(blank=True, default=list)),
                ("included_en", models.JSONField(blank=True, default=list)),
                ("excluded", models.JSONField(blank=True, default=list)),
                ("excluded_en", models.JSONField(blank=True, default=list)),
                (
                    "region",
                    models.CharField(
                        choices=[
                            ("north", "Miền Bắc"),
                            ("central", "Miền Trung"),
                            ("south", "Miền Nam"),
                        ],
                        db_index=True,
                        default="north",
                        max_length=20,
                    ),
                ),
                ("is_published", models.BooleanField(db_index=True, default=True)),
                ("is_featured", models.BooleanField(db_index=True, default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "destination",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tours",
                        to="destinations.destination",
                    ),
                ),
            ],
            options={
                "ordering": ("-is_featured", "-created_at"),
            },
        ),
        migrations.AddIndex(
            model_name="tour",
            index=models.Index(fields=["is_published", "region"], name="tour_pub_region_idx"),
        ),
        migrations.AddIndex(
            model_name="tour",
            index=models.Index(fields=["is_published", "is_featured"], name="tour_pub_feat_idx"),
        ),
    ]
