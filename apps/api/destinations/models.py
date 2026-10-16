import uuid

from django.contrib.gis.db import models


class Destination(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=180, unique=True)
    name = models.CharField(max_length=160)
    name_en = models.CharField(max_length=160, blank=True)
    country = models.CharField(max_length=120, blank=True)
    country_en = models.CharField(max_length=120, blank=True)
    summary = models.TextField(blank=True)
    summary_en = models.TextField(blank=True)
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    hero_image_url = models.URLField(blank=True)
    starting_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    center = models.PointField(geography=True, srid=4326, null=True, blank=True)
    is_published = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("name",)
        indexes = [models.Index(fields=("is_published", "name"), name="dest_pub_name_idx")]

    def __str__(self):
        return self.name
