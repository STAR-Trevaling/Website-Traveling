import uuid
from decimal import Decimal

from django.contrib.gis.db import models


class Accommodation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=128, unique=True, db_index=True)
    destination = models.ForeignKey(
        "destinations.Destination",
        on_delete=models.RESTRICT,
        related_name="accommodations",
    )
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=32)
    star_rating = models.SmallIntegerField(null=True, blank=True)
    address = models.TextField()
    location = models.PointField(geography=True, srid=4326, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    amenities = models.JSONField(default=list)
    price_from = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    image_url = models.CharField(max_length=512)
    gallery = models.JSONField(default=list)
    partner_booking_url = models.CharField(max_length=512)
    partner_name = models.CharField(max_length=128, null=True, blank=True)
    partner_commission_rate = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    rating_average = models.DecimalField(
        max_digits=3, decimal_places=2, default=Decimal("5.00")
    )
    rating_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "accommodations_accommodation"
        ordering = ["-rating_average", "name"]
        indexes = [
            models.Index(
                fields=["destination", "is_active"],
                name="idx_accommodation_destination",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.name} ({self.destination.name})"
