#!/bin/sh
set -e

echo "[START] Applying database migrations..."
python manage.py migrate --noinput || echo "[WARN] Migration failed or database not reachable yet"

# Optional background Celery worker for single-container free tier deployments
if [ "${RUN_CELERY_IN_BACKGROUND}" = "1" ]; then
    echo "[START] Launching background Celery worker and beat..."
    celery -A config worker -l info --concurrency=1 &
    celery -A config beat -l info &
fi

PORT_NUM="${PORT:-8000}"
echo "[START] Starting Gunicorn on port ${PORT_NUM}..."
exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT_NUM}" --workers 2 --timeout 60
