import os
import sys
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = os.getenv("DJANGO_DEBUG", "0") == "1"
IS_TESTING = "pytest" in sys.modules or bool(os.getenv("PYTEST_CURRENT_TEST"))
IS_DEV_OR_TEST = DEBUG or IS_TESTING or any("manage.py" in arg for arg in sys.argv)
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY") or ("dev-only-change-me" if IS_DEV_OR_TEST else "")
if not SECRET_KEY:
    raise RuntimeError("DJANGO_SECRET_KEY is required when DJANGO_DEBUG=0")

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

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DJANGO_DB_ENGINE", "django.contrib.gis.db.backends.postgis"),
        "NAME": os.getenv("POSTGRES_DB", "travel"),
        "USER": os.getenv("POSTGRES_USER", "travel"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", "travel"),
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

# Odoo 18 ERP Integration Settings
ODOO_BASE_URL = os.getenv("ODOO_BASE_URL", "http://host.docker.internal:8069")
ODOO_WEBHOOK_SECRET = os.getenv("ODOO_WEBHOOK_SECRET", "star_travels_super_secret_webhook_key_2026")
ODOO_INBOUND_API_KEY = os.getenv("ODOO_INBOUND_API_KEY", "star_travels_inbound_api_token_2026")

# VNPay Payment Gateway Sandbox Settings
VNPAY_PAYMENT_URL = os.getenv(
    "VNPAY_PAYMENT_URL", "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
)
VNPAY_TMN_CODE = os.getenv("VNPAY_TMN_CODE", "DEMO_TMN")
VNPAY_HASH_SECRET = os.getenv("VNPAY_HASH_SECRET", "DEMO_HASH_SECRET_KEY")
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
