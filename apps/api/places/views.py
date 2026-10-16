from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Category, Place
from .serializers import CategorySerializer, PlaceSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"
    pagination_class = None


class NearbyQuerySerializer(serializers.Serializer):
    lat = serializers.FloatField(min_value=-90, max_value=90)
    lng = serializers.FloatField(min_value=-180, max_value=180)
    radius_km = serializers.FloatField(min_value=0.1, max_value=50, default=10)


class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PlaceSerializer
    lookup_field = "slug"
    filterset_fields = ("destination__slug", "category__slug")
    search_fields = ("name", "short_description", "description", "address")
    ordering_fields = ("name", "average_rating", "review_count", "created_at")
    ordering = ("name",)

    def get_queryset(self):
        return Place.objects.filter(
            is_published=True, destination__is_published=True
        ).select_related("destination", "category")

    @action(detail=False, methods=("get",))
    def nearby(self, request):
        query = NearbyQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        point = Point(query.validated_data["lng"], query.validated_data["lat"], srid=4326)
        radius = query.validated_data["radius_km"]
        queryset = self.get_queryset().filter(location__distance_lte=(point, D(km=radius)))
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page if page is not None else queryset, many=True)
        if page is not None:
            return self.get_paginated_response(serializer.data)
        return Response(serializer.data)
