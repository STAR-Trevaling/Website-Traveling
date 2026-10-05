import uuid

from django.contrib.gis.db import models

from destinations.models import Destination


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        ordering = ("name",)
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class Place(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=180, unique=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="places")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="places")
    name = models.CharField(max_length=180)
    short_description = models.CharField(max_length=280, blank=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    overlay_image_url = models.URLField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    website_url = models.URLField(blank=True)
    location = models.PointField(geography=True, srid=4326)
    is_published = models.BooleanField(default=False, db_index=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    review_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)
        indexes = [
            models.Index(fields=("is_published", "destination"), name="place_pub_dest_idx"),
            models.Index(fields=("category", "is_published"), name="place_cat_pub_idx"),
        ]

    def __str__(self):
        return self.name
