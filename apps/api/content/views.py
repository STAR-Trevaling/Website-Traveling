from rest_framework import viewsets

from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ArticleSerializer
    lookup_field = "slug"
    search_fields = ("title", "excerpt", "body")
    filterset_fields = ("destination__slug", "place__slug")
    ordering_fields = ("published_at", "title")
    ordering = ("-published_at",)

    def get_queryset(self):
        return Article.objects.filter(status=Article.Status.PUBLISHED).select_related(
            "destination", "place"
        )
