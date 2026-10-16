from django.urls import include, path
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter

from accommodations.views import AccommodationViewSet
from accounts.serializers import CurrentUserSerializer, RegisterSerializer
from assistant.views import (
    AssistantConversationViewSet,
    AssistantKnowledgeChunkViewSet,
    AssistantLeadCaptureViewSet,
)
from bookings.views import BookingViewSet, ReferralTrackView
from content.views import ArticleViewSet
from destinations.views import DestinationViewSet
from partners.views import MyPartnerMembershipViewSet, PartnerApplicationViewSet
from places.views import CategoryViewSet, PlaceViewSet
from restaurants.views import RestaurantViewSet
from reviews.views import FavoriteViewSet, ReviewViewSet
from tours.views import TourViewSet

router = DefaultRouter()
router.register("destinations", DestinationViewSet, basename="destination")
router.register("place-categories", CategoryViewSet, basename="place-category")
router.register("places", PlaceViewSet, basename="place")
router.register("tours", TourViewSet, basename="tour")
router.register("accommodations", AccommodationViewSet, basename="accommodation")
router.register("restaurants", RestaurantViewSet, basename="restaurant")
router.register("bookings", BookingViewSet, basename="booking")
router.register("articles", ArticleViewSet, basename="article")
router.register("reviews", ReviewViewSet, basename="review")
router.register("favorites", FavoriteViewSet, basename="favorite")
router.register("partner-applications", PartnerApplicationViewSet, basename="partner-application")
router.register(
    "my-partner-memberships", MyPartnerMembershipViewSet, basename="my-partner-membership"
)
router.register(
    "assistant/conversations", AssistantConversationViewSet, basename="assistant-conversation"
)
router.register("assistant/leads", AssistantLeadCaptureViewSet, basename="assistant-lead")
router.register(
    "assistant/knowledge", AssistantKnowledgeChunkViewSet, basename="assistant-knowledge"
)


@api_view(("GET",))
@permission_classes((permissions.IsAuthenticated,))
def me(request):
    return Response(CurrentUserSerializer(request.user).data)


@api_view(("POST",))
@permission_classes((permissions.AllowAny,))
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(CurrentUserSerializer(user).data, status=status.HTTP_201_CREATED)


urlpatterns = [
    path("auth/me/", me, name="me"),
    path("auth/register/", register, name="register"),
    path("referrals/track/", ReferralTrackView.as_view(), name="referrals-track"),
    path("", include(router.urls)),
]
