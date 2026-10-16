from django.contrib import admin

from .models import Accommodation


@admin.register(Accommodation)
class AccommodationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "destination",
        "category",
        "star_rating",
        "partner_name",
        "price_from",
        "rating_average",
        "is_active",
    )
    list_filter = ("category", "star_rating", "is_active", "destination")
    search_fields = ("name", "name_en", "address", "partner_name")
    prepopulated_fields = {"slug": ("name",)}
