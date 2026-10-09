from rest_framework.routers import DefaultRouter

from .views import (
    AssistantConversationViewSet,
    AssistantKnowledgeChunkViewSet,
    AssistantLeadCaptureViewSet,
)

router = DefaultRouter()
router.register(r"conversations", AssistantConversationViewSet, basename="assistant-conversation")
router.register(r"leads", AssistantLeadCaptureViewSet, basename="assistant-lead")
router.register(r"knowledge", AssistantKnowledgeChunkViewSet, basename="assistant-knowledge")

urlpatterns = router.urls
