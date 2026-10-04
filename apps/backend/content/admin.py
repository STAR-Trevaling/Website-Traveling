from django.contrib import admin
from django.utils import timezone
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "published_at", "updated_at")
    list_filter = ("status", "destination")
    search_fields = ("title", "excerpt", "body")
    prepopulated_fields = {"slug": ("title",)}
    actions = ("publish_selected",)

    @admin.action(description="Publish selected stories")
    def publish_selected(self, request, queryset):
        queryset.update(status=Article.Status.PUBLISHED, published_at=timezone.now())
