from django.contrib import admin

from .models import Favorite, Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("place", "user", "rating", "is_published", "created_at")
    list_filter = ("is_published", "rating")
    search_fields = ("place__name", "user__username", "body")


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("place", "user", "created_at")
    search_fields = ("place__name", "user__username")
