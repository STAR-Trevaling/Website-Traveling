import uuid

from django.db import models

from destinations.models import Destination
from places.models import Place


class Article(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        REVIEW = "review", "In review"
        PUBLISHED = "published", "Published"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=220, unique=True)
    title = models.CharField(max_length=220)
    excerpt = models.TextField(blank=True)
    body = models.TextField()
    cover_image = models.URLField(blank=True)
    read_time = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=80, blank=True)
    author_name = models.CharField(max_length=120, blank=True)
    author_role = models.CharField(max_length=160, blank=True)
    author_avatar = models.URLField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    destination = models.ForeignKey(
        Destination, on_delete=models.SET_NULL, null=True, blank=True, related_name="articles"
    )
    place = models.ForeignKey(
        Place, on_delete=models.SET_NULL, null=True, blank=True, related_name="articles"
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.DRAFT, db_index=True
    )
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-published_at", "-created_at")

    def __str__(self):
        return self.title
