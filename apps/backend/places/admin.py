from django.contrib import admin
from .models import Category, Place

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ("name", "destination", "category", "average_rating", "review_count", "is_published")
    list_filter = ("is_published", "category", "destination")
    search_fields = ("name", "short_description", "description", "address")
    prepopulated_fields = {"slug": ("name",)}
