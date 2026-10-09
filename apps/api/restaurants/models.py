import uuid
from decimal import Decimal

from django.contrib.gis.db import models


class Restaurant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=128, unique=True, db_index=True)
    destination = models.ForeignKey(
        "destinations.Destination",
        on_delete=models.RESTRICT,
        related_name="restaurants",
    )
    name = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255, null=True, blank=True)
    cuisine_type = models.CharField(max_length=64)
    price_range = models.CharField(max_length=16)
    address = models.TextField()
    location = models.PointField(geography=True, srid=4326, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    signature_dishes = models.JSONField(default=list)
    opening_hours = models.JSONField(default=dict)
    image_url = models.CharField(max_length=512)
    gallery = models.JSONField(default=list)
    contact_type = models.CharField(max_length=16)
    contact_value = models.CharField(max_length=512)
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
        db_table = "restaurants_restaurant"
        ordering = ["-rating_average", "name"]
        indexes = [
            models.Index(
                fields=["destination", "is_active"],
                name="idx_restaurant_destination",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.name} ({self.destination.name})"
