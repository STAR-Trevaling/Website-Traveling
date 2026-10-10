from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny

from .models import Restaurant
from .serializers import RestaurantSerializer


class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.filter(is_active=True).select_related("destination")
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["destination__slug", "cuisine_type", "price_range"]
    search_fields = ["name", "name_en", "address", "description", "cuisine_type"]
    ordering_fields = ["rating_average", "created_at"]
    ordering = ["-rating_average", "name"]
