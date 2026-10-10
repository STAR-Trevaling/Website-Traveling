import logging

from django.core.cache import cache
from django.db import connection
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

logger = logging.getLogger(__name__)


@api_view(["GET"])
@permission_classes([AllowAny])
@throttle_classes([])
def health(request):
    return Response({"status": "ok"})


@api_view(["GET"])
@permission_classes([AllowAny])
@throttle_classes([])
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


@api_view(["GET"])
@permission_classes([AllowAny])
@throttle_classes([])
def monitoring_status(request):
    try:
        import sentry_sdk

        sentry_installed = True
        sentry_initialized = sentry_sdk.is_initialized()
        sdk_version = getattr(sentry_sdk, "VERSION", getattr(sentry_sdk, "__version__", "unknown"))
    except ImportError:
        sentry_installed = False
        sentry_initialized = False
        sdk_version = None

    from django.conf import settings

    has_webhook = bool(getattr(settings, "ALERT_WEBHOOK_URL", False))
    has_sentry_dsn = bool(getattr(settings, "SENTRY_DSN", False))

    return Response(
        {
            "status": "operational",
            "sentry": {
                "installed": sentry_installed,
                "initialized": sentry_initialized,
                "has_dsn": has_sentry_dsn,
                "sdk_version": sdk_version,
                "environment": getattr(settings, "SENTRY_ENVIRONMENT", "unknown"),
                "traces_sample_rate": getattr(settings, "SENTRY_TRACES_SAMPLE_RATE", 0.0),
            },
            "alert_webhook": {
                "configured": has_webhook,
            },
            "features": {
                "critical_alerts": True,
                "pii_scrubber": True,
                "celery_integration": True,
            },
        }
    )


