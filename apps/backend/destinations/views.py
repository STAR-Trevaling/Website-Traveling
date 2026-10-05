from rest_framework import viewsets

from .models import Destination
from .serializers import DestinationSerializer


class DestinationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DestinationSerializer
    lookup_field = "slug"
    search_fields = ("name", "country", "summary", "description")
    ordering_fields = ("name", "country", "created_at")
    ordering = ("name",)

    def get_queryset(self):
        return Destination.objects.filter(is_published=True)
