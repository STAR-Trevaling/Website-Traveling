import logging
import os
import sys
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Auto-load local .env file from root or apps/api directory if present
for _candidate_env in (BASE_DIR.parent.parent / ".env", BASE_DIR / ".env"):
    if _candidate_env.exists():
        with open(_candidate_env, encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    os.environ.setdefault(_k.strip(), _v.strip())
        break

DEBUG = os.getenv("DJANGO_DEBUG", "0") == "1"
IS_TESTING = "pytest" in sys.modules or bool(os.getenv("PYTEST_CURRENT_TEST"))
IS_DEV_OR_TEST = (
    DEBUG
    or IS_TESTING
    or any("manage.py" in arg for arg in sys.argv)
    or any("mypy" in arg for arg in sys.argv)
    or "mypy" in sys.modules
)
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "")
if not SECRET_KEY:
    if IS_DEV_OR_TEST:
        SECRET_KEY = "dev-only-change-me"
    else:
        raise RuntimeError("DJANGO_SECRET_KEY is required in .env or environment")

ALLOWED_HOSTS = ["host.docker.internal", "testserver"] + [
    h.strip()
    for h in os.getenv(
        "DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,host.docker.internal,testserver"
    ).split(",")
    if h.strip()
]
CSRF_TRUSTED_ORIGINS = [
    o.strip() for o in os.getenv("DJANGO_CSRF_TRUSTED_ORIGINS", "").split(",") if o.strip()
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",
    "rest_framework",
    "django_filters",
    "drf_spectacular",
    "accounts",
    "destinations",
    "places",
    "content",
    "partners",
    "reviews",
    "audit",
    "core",
    "integrations",
    "tours",
    "accommodations",
    "restaurants",
    "bookings",
    "payments",
    "assistant",
]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

_db_password = os.getenv("POSTGRES_PASSWORD", "")
if not _db_password:
    if IS_DEV_OR_TEST:
        _db_password = "travel"
    else:
        raise RuntimeError("POSTGRES_PASSWORD is required in .env or environment")

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DJANGO_DB_ENGINE", "django.contrib.gis.db.backends.postgis"),
        "NAME": os.getenv("POSTGRES_DB", "travel"),
        "USER": os.getenv("POSTGRES_USER", "travel"),
        "PASSWORD": _db_password,
        "HOST": os.getenv("POSTGRES_HOST", "localhost"),
        "PORT": os.getenv("POSTGRES_PORT", "5432"),
        "CONN_MAX_AGE": 60,
    }
}

if os.getenv("GDAL_LIBRARY_PATH"):
    GDAL_LIBRARY_PATH = os.getenv("GDAL_LIBRARY_PATH")
if os.getenv("GEOS_LIBRARY_PATH"):
    GEOS_LIBRARY_PATH = os.getenv("GEOS_LIBRARY_PATH")

AUTH_USER_MODEL = "accounts.User"
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
if IS_TESTING:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "star-travels-test-cache",
        }
    }
else:
    CACHES = {
        "default": {"BACKEND": "django.core.cache.backends.redis.RedisCache", "LOCATION": REDIS_URL}
    }

CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_TASK_ALWAYS_EAGER = False

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "core.pagination.StandardPagination",
    "PAGE_SIZE": 12,
    "EXCEPTION_HANDLER": "core.exceptions.api_exception_handler",
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": os.getenv("DRF_THROTTLE_ANON", "200/day"),
        "user": os.getenv("DRF_THROTTLE_USER", "2000/day"),
        "auth": os.getenv("DRF_THROTTLE_AUTH", "10/minute"),
        "payment": os.getenv("DRF_THROTTLE_PAYMENT", "30/minute"),
    },
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
}
SPECTACULAR_SETTINGS = {
    "TITLE": "Travel Discovery Platform API",
    "DESCRIPTION": "Versioned API for destinations, places, stories, community and partner workflows.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

if not IS_DEV_OR_TEST:
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_SSL_REDIRECT = True

# Odoo 18 ERP Integration Settings
ODOO_BASE_URL = os.getenv("ODOO_BASE_URL", "http://host.docker.internal:8069")
ODOO_WEBHOOK_SECRET = os.getenv("ODOO_WEBHOOK_SECRET", "")
if not ODOO_WEBHOOK_SECRET and not IS_DEV_OR_TEST:
    raise RuntimeError("ODOO_WEBHOOK_SECRET is required when DJANGO_DEBUG=0")
ODOO_INBOUND_API_KEY = os.getenv("ODOO_INBOUND_API_KEY", "")
if not ODOO_INBOUND_API_KEY and not IS_DEV_OR_TEST:
    raise RuntimeError("ODOO_INBOUND_API_KEY is required when DJANGO_DEBUG=0")

# VNPay Payment Gateway Settings
VNPAY_PAYMENT_URL = os.getenv(
    "VNPAY_PAYMENT_URL", "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
)
VNPAY_TMN_CODE = os.getenv("VNPAY_TMN_CODE", "")
VNPAY_HASH_SECRET = os.getenv("VNPAY_HASH_SECRET", "")
if not VNPAY_HASH_SECRET and not IS_DEV_OR_TEST:
    raise RuntimeError("VNPAY_HASH_SECRET is required when DJANGO_DEBUG=0")
VNPAY_RETURN_URL = os.getenv("VNPAY_RETURN_URL", "http://localhost:3000/payment/return")

# VietQR Payment Gateway Settings (NAPAS 247 Standard)
VIETQR_BANK_BIN = os.getenv(
    "VIETQR_BANK_BIN", "970422"
)  # MBBank: 970422, Vietinbank: 970415, Vietcombank: 970436
VIETQR_BANK_NAME = os.getenv("VIETQR_BANK_NAME", "MBBank")
VIETQR_ACCOUNT_NO = os.getenv("VIETQR_ACCOUNT_NO", "0987654321")
VIETQR_ACCOUNT_NAME = os.getenv("VIETQR_ACCOUNT_NAME", "CONG TY TNHH STAR TRAVELS VIET NAM")
VIETQR_TEMPLATE = os.getenv("VIETQR_TEMPLATE", "compact2")

# Celery Beat Periodic Task Schedule
CELERY_BEAT_SCHEDULE = {
    "sweep_pending_outbox_every_minute": {
        "task": "integrations.tasks.sweep_pending_outbox",
        "schedule": 60.0,
    },
    "sweep_expired_payments_every_minute": {
        "task": "payments.tasks.sweep_expired_payments",
        "schedule": 60.0,
    },
}

# Structured Logging Configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "simple": {
            "format": "%(levelname)s %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}

# Celery Broker, Results & Periodic Beat Schedule
CELERY_BROKER_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("REDIS_URL", "redis://localhost:6379/0")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = TIME_ZONE

CELERY_BEAT_SCHEDULE = {
    "sweep-expired-payments-every-minute": {
        "task": "payments.tasks.sweep_expired_payments",
        "schedule": 60.0,
    },
}

# Sentry APM & Error Tracking
SENTRY_DSN = os.getenv("SENTRY_DSN")
SENTRY_ENVIRONMENT = os.getenv(
    "SENTRY_ENVIRONMENT", os.getenv("ENVIRONMENT", "production" if not DEBUG else "development")
)
SENTRY_TRACES_SAMPLE_RATE = float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.2"))
ALERT_WEBHOOK_URL = os.getenv("ALERT_WEBHOOK_URL", "")


def _sentry_before_send(event, hint):
    """
    Scrub passwords, tokens, secrets, financial hashes, and auth headers
    before sending events to Sentry (Decree 13/2023/ND-CP compliance).
    """
    sensitive_keys = {
        "password",
        "token",
        "secret",
        "hash_secret",
        "vnpay_hash_secret",
        "vnp_hashsecret",
        "cvv",
        "credit_card",
        "card_number",
        "authorization",
        "cookie",
        "api_key",
    }

    def _scrub(val):
        if isinstance(val, dict):
            new_dict = {}
            for k, v in val.items():
                if any(s in str(k).lower() for s in sensitive_keys):
                    new_dict[k] = "[REDACTED]"
                else:
                    new_dict[k] = _scrub(v)
            return new_dict
        elif isinstance(val, list):
            return [_scrub(item) for item in val]
        return val

    if "request" in event and isinstance(event["request"], dict):
        req = event["request"]
        if "headers" in req and isinstance(req["headers"], dict):
            req["headers"] = _scrub(req["headers"])
        if "data" in req:
            req["data"] = _scrub(req["data"])
        if "query_string" in req and any(
            s in str(req["query_string"]).lower() for s in sensitive_keys
        ):
            req["query_string"] = "[REDACTED]"

    if "extra" in event and isinstance(event["extra"], dict):
        event["extra"] = _scrub(event["extra"])
    if "contexts" in event and isinstance(event["contexts"], dict):
        event["contexts"] = _scrub(event["contexts"])

    return event


if SENTRY_DSN:
    try:
        import sentry_sdk
        from sentry_sdk.integrations.celery import CeleryIntegration
        from sentry_sdk.integrations.django import DjangoIntegration
        from sentry_sdk.integrations.logging import LoggingIntegration

        sentry_logging = LoggingIntegration(
            level=logging.INFO,
            event_level=logging.ERROR,
        )

        sentry_sdk.init(
            dsn=SENTRY_DSN,
            integrations=[DjangoIntegration(), CeleryIntegration(), sentry_logging],
            traces_sample_rate=SENTRY_TRACES_SAMPLE_RATE,
            profiles_sample_rate=float(os.getenv("SENTRY_PROFILES_SAMPLE_RATE", "0.1")),
            send_default_pii=False,
            environment=SENTRY_ENVIRONMENT,
            before_send=_sentry_before_send,
            release=os.getenv("RELEASE_VERSION", "star-travels-api@1.0.0"),
        )
    except Exception as _sentry_init_err:
        import sys

        sys.stderr.write(f"Warning: Sentry initialization failed: {_sentry_init_err}\n")
