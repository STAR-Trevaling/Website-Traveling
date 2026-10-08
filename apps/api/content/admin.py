from django.contrib import admin
from django.utils import timezone

from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "author_name",
        "read_time",
        "status",
        "published_at",
        "updated_at",
    )
    list_filter = ("status", "category", "destination")
    search_fields = ("title", "excerpt", "body", "author_name", "category")
    prepopulated_fields = {"slug": ("title",)}
    actions = ("publish_selected",)

    @admin.action(description="Publish selected stories")
    def publish_selected(self, request, queryset):
        queryset.update(status=Article.Status.PUBLISHED, published_at=timezone.now())
