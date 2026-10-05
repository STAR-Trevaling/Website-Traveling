from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import PartnerApplication, PartnerMembership
from .serializers import (
    PartnerApplicationSerializer,
    PartnerMembershipSerializer,
    RejectApplicationSerializer,
)
from .services import approve_application, mark_under_review, reject_application


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class PartnerApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = PartnerApplicationSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        queryset = PartnerApplication.objects.select_related("applicant", "reviewed_by")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(applicant=self.request.user)

    @action(detail=True, methods=("post",), permission_classes=(IsAdmin,), url_path="under-review")
    def under_review(self, request, pk=None):
        application = mark_under_review(application_id=pk, reviewer=request.user)
        return Response(self.get_serializer(application).data)

    @action(detail=True, methods=("post",), permission_classes=(IsAdmin,))
    def approve(self, request, pk=None):
        application = approve_application(application_id=pk, reviewer=request.user)
        return Response(self.get_serializer(application).data)

    @action(detail=True, methods=("post",), permission_classes=(IsAdmin,))
    def reject(self, request, pk=None):
        body = RejectApplicationSerializer(data=request.data)
        body.is_valid(raise_exception=True)
        application = reject_application(
            application_id=pk, reviewer=request.user, reason=body.validated_data["reason"]
        )
        return Response(self.get_serializer(application).data)


class MyPartnerMembershipViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PartnerMembershipSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return PartnerMembership.objects.filter(user=self.request.user).select_related(
            "organization"
        )
