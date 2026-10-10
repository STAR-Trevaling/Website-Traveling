from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny

from .models import Accommodation
from .serializers import AccommodationSerializer


class AccommodationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Accommodation.objects.filter(is_active=True).select_related("destination")
    serializer_class = AccommodationSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["destination__slug", "category", "star_rating"]
    search_fields = ["name", "name_en", "address", "description"]
    ordering_fields = ["rating_average", "price_from", "created_at"]
    ordering = ["-rating_average", "name"]
