from django.contrib import admin

from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("name", "name_en", "country", "starting_price", "is_published", "updated_at")
    list_filter = ("is_published", "country")
    search_fields = ("name", "name_en", "country", "summary")
    prepopulated_fields = {"slug": ("name",)}
