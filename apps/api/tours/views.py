from rest_framework import filters, permissions, viewsets
from .models import Tour
from .serializers import TourSerializer


class TourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tour.objects.filter(is_published=True).select_related("destination")
    serializer_class = TourSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = "slug"
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ("title", "title_en", "destination_name", "destination__name", "overview")
    ordering_fields = ("price", "rating", "created_at", "is_featured")

    def get_queryset(self):
        qs = super().get_queryset()
        region = self.request.query_params.get("region")
        if region and region != "all":
            qs = qs.filter(region=region)

        destination = self.request.query_params.get("destination__slug") or self.request.query_params.get("destination")
        if destination:
            qs = qs.filter(destination__slug=destination)

        featured = self.request.query_params.get("featured")
        if featured in ("true", "1", "True"):
            qs = qs.filter(is_featured=True)

        return qs
