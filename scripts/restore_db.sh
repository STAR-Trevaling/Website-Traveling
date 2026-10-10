#!/usr/bin/env bash
# ==============================================================================
# STAR Travels - Disaster Recovery Database Restore Script
# CAUTION: This script restores a PostgreSQL dump into the target database.
# ==============================================================================
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: $0 <path_to_backup_dump_file> [--force]"
    echo "Example: $0 ./backups/travel_db_20261009_120000.dump"
    exit 1
fi

BACKUP_FILE="$1"
FORCE="${2:-}"

DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-travel}"
DB_USER="${POSTGRES_USER:-travel}"
DB_PASS="${POSTGRES_PASSWORD:-travel}"

if [ ! -f "${BACKUP_FILE}" ]; then
    echo "ERROR: Backup file '${BACKUP_FILE}' not found!"
    exit 1
fi

# Checksum validation if .sha256 file exists
if [ -f "${BACKUP_FILE}.sha256" ]; then
    echo "Verifying SHA-256 checksum..."
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum -c "${BACKUP_FILE}.sha256"
        echo "Checksum verified successfully."
    fi
fi

if [ "${FORCE}" != "--force" ]; then
    echo "================================================================="
    echo "WARNING: Restoring will overwrite existing data in '${DB_NAME}'!"
    echo "Target host: ${DB_HOST}:${DB_PORT}"
    echo "Backup file: ${BACKUP_FILE}"
    echo "================================================================="
    read -r -p "Are you sure you want to proceed with restore? [y/N]: " CONFIRM
    if [[ ! "${CONFIRM}" =~ ^[yY]([eE][sS])?$ ]]; then
        echo "Restore aborted by operator."
        exit 0
    fi
fi

echo "Starting database restore..."
export PGPASSWORD="${DB_PASS}"

# Terminate existing active connections to prevent deadlock during restore
psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d postgres -c \
    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${DB_NAME}' AND pid <> pg_backend_pid();" || true

# Execute pg_restore with clean schema wipe
pg_restore -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" \
    --clean --if-exists --no-owner --no-privileges -v "${BACKUP_FILE}"

echo "Database restore completed successfully!"
echo "Verifying restored tables..."
psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -c \
    "SELECT count(*) AS total_tours FROM tours_tour; SELECT count(*) AS total_destinations FROM destinations_destination;"
