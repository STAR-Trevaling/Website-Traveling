import logging

from django.core.cache import cache
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

logger = logging.getLogger(__name__)


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok"})


@api_view(["GET"])
@permission_classes([AllowAny])
def ready(request):
    checks = {"database": False, "cache": False}
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            checks["database"] = cursor.fetchone() == (1,)
    except Exception:
        logger.warning("Database readiness check failed", exc_info=True)
    try:
        cache.set("ready-check", "1", 5)
        checks["cache"] = cache.get("ready-check") == "1"
    except Exception:
        logger.warning("Cache readiness check failed", exc_info=True)
    code = 200 if all(checks.values()) else 503
    return Response({"status": "ok" if code == 200 else "degraded", "checks": checks}, status=code)
