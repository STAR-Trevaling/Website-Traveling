from django.contrib import admin

from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("name", "country", "is_published", "updated_at")
    list_filter = ("is_published", "country")
    search_fields = ("name", "country", "summary")
    prepopulated_fields = {"slug": ("name",)}
