from django.contrib import admin

from .models import GuideArticle, GuideCategory


@admin.register(GuideCategory)
class GuideCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order", "is_published", "created_at")
    list_filter = ("is_published",)
    search_fields = ("title", "title_en", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(GuideArticle)
class GuideArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "destination", "is_published", "created_at")
    list_filter = ("category", "is_published")
    search_fields = ("title", "title_en", "slug")
    prepopulated_fields = {"slug": ("title",)}
