from django.contrib import admin

from .models import Tour


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "region",
        "destination_name",
        "duration",
        "price",
        "rating",
        "is_featured",
        "is_published",
        "created_at",
    )
    list_filter = ("region", "is_published", "is_featured", "destination")
    search_fields = ("title", "title_en", "destination_name", "overview")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-is_featured", "-created_at")
    fieldsets = (
        (
            "Thông tin cơ bản",
            {
                "fields": (
                    "title",
                    "title_en",
                    "slug",
                    "destination",
                    "destination_name",
                    "destination_name_en",
                    "region",
                )
            },
        ),
        (
            "Lịch trình & Dịch vụ",
            {
                "fields": (
                    "duration",
                    "duration_en",
                    "departure",
                    "departure_en",
                    "group_size",
                    "group_size_en",
                    "price",
                    "original_price",
                    "rating",
                    "review_count",
                )
            },
        ),
        (
            "Hình ảnh",
            {"fields": ("image_url", "gallery_urls")},
        ),
        (
            "Nội dung & Lịch trình chi tiết",
            {
                "fields": (
                    "overview",
                    "overview_en",
                    "highlights",
                    "highlights_en",
                    "itinerary",
                    "itinerary_en",
                    "included",
                    "included_en",
                    "excluded",
                    "excluded_en",
                )
            },
        ),
        (
            "Trạng thái xuất bản",
            {"fields": ("is_published", "is_featured")},
        ),
    )
