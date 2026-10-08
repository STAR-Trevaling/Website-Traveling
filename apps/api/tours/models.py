import uuid
from django.db import models

from destinations.models import Destination


class Tour(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=180, unique=True, db_index=True)
    title = models.CharField(max_length=220)
    title_en = models.CharField(max_length=220, blank=True)

    destination = models.ForeignKey(
        Destination,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tours",
    )
    destination_name = models.CharField(max_length=160, blank=True)
    destination_name_en = models.CharField(max_length=160, blank=True)

    duration = models.CharField(max_length=80, blank=True)
    duration_en = models.CharField(max_length=80, blank=True)
    departure = models.CharField(max_length=120, blank=True)
    departure_en = models.CharField(max_length=120, blank=True)
    group_size = models.CharField(max_length=80, blank=True)
    group_size_en = models.CharField(max_length=80, blank=True)

    price = models.DecimalField(max_digits=12, decimal_places=0)
    original_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    review_count = models.PositiveIntegerField(default=0)

    image_url = models.URLField(blank=True)
    gallery_urls = models.JSONField(default=list, blank=True)

    overview = models.TextField(blank=True)
    overview_en = models.TextField(blank=True)
    highlights = models.JSONField(default=list, blank=True)
    highlights_en = models.JSONField(default=list, blank=True)
    itinerary = models.JSONField(default=list, blank=True)
    itinerary_en = models.JSONField(default=list, blank=True)
    included = models.JSONField(default=list, blank=True)
    included_en = models.JSONField(default=list, blank=True)
    excluded = models.JSONField(default=list, blank=True)
    excluded_en = models.JSONField(default=list, blank=True)

    region = models.CharField(
        max_length=20,
        choices=[("north", "Miền Bắc"), ("central", "Miền Trung"), ("south", "Miền Nam")],
        default="north",
        db_index=True,
    )
    is_published = models.BooleanField(default=True, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-is_featured", "-created_at")
        indexes = [
            models.Index(fields=("is_published", "region"), name="tour_pub_region_idx"),
            models.Index(fields=("is_published", "is_featured"), name="tour_pub_feat_idx"),
        ]

    def __str__(self):
        return self.title
