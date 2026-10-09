from rest_framework.routers import DefaultRouter

from .views import TourViewSet

router = DefaultRouter()
router.register("tours", TourViewSet, basename="tour")

urlpatterns = router.urls
