from rest_framework import permissions, viewsets

from .models import Favorite, Review
from .permissions import IsOwnerOrAdmin
from .serializers import FavoriteSerializer, ReviewSerializer
from .services import refresh_place_rating


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin)
    filterset_fields = ("place__slug",)
    ordering_fields = ("created_at", "rating")
    ordering = ("-created_at",)

    def get_queryset(self):
        queryset = Review.objects.filter(
            place__is_published=True, place__destination__is_published=True
        ).select_related("user", "place")
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return queryset
        return queryset.filter(is_published=True)

    def perform_destroy(self, instance):
        place_id = instance.place_id
        instance.delete()
        refresh_place_rating(place_id)


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ("get", "post", "delete", "head", "options")

    def get_queryset(self):
        return Favorite.objects.filter(
            user=self.request.user, place__is_published=True
        ).select_related("place")
