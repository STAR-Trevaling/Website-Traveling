from django.contrib import admin

from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "destination",
        "cuisine_type",
        "price_range",
        "contact_type",
        "rating_average",
        "is_active",
    )
    list_filter = ("cuisine_type", "price_range", "is_active", "destination")
    search_fields = ("name", "name_en", "address", "cuisine_type")
    prepopulated_fields = {"slug": ("name",)}
