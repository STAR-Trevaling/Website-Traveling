import uuid

from django.db import models

from destinations.models import Destination


class GuideCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=80, unique=True)
    title = models.CharField(max_length=160)
    title_en = models.CharField(max_length=160, blank=True)
    short_desc = models.TextField(blank=True)
    short_desc_en = models.TextField(blank=True)
    icon_name = models.CharField(max_length=60, default="Info")
    badge = models.CharField(max_length=60, blank=True)
    badge_en = models.CharField(max_length=60, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("order", "title")
        verbose_name = "Guide Category"
        verbose_name_plural = "Guide Categories"

    def __str__(self):
        return self.title


class GuideArticle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(GuideCategory, on_delete=models.CASCADE, related_name="articles")
    destination = models.ForeignKey(
        Destination,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="guide_articles",
    )
    slug = models.SlugField(max_length=180, unique=True)
    title = models.CharField(max_length=220)
    title_en = models.CharField(max_length=220, blank=True)
    summary = models.TextField(blank=True)
    summary_en = models.TextField(blank=True)
    body = models.TextField(blank=True)
    body_en = models.TextField(blank=True)
    structured_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Structured RAG entities: idealMonths, avoidMonths, notes, rules, costs, etc.",
    )
    is_published = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("category", "title")
        verbose_name = "Guide Article"
        verbose_name_plural = "Guide Articles"
        indexes = [
            models.Index(fields=("category", "is_published"), name="guide_cat_pub_idx"),
            models.Index(fields=("destination", "is_published"), name="guide_dest_pub_idx"),
        ]

    def __str__(self):
        return f"[{self.category.slug}] {self.title}"
