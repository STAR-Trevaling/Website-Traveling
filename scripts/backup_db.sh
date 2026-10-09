#!/usr/bin/env bash
# ==============================================================================
# STAR Travels - Automated PostgreSQL Database Backup Script
# Conforms to Decree 13/2023/NĐ-CP & ISO 27001 Data Protection Standards
# ==============================================================================
set -euo pipefail

# Configuration with environment defaults
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-travel}"
DB_USER="${POSTGRES_USER:-travel}"
DB_PASS="${POSTGRES_PASSWORD:-travel}"

BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
TIMESTAMP="$(date +'%Y%m%d_%H%M%S')"
BACKUP_FILE="${BACKUP_DIR}/travel_db_${TIMESTAMP}.dump"
LOG_FILE="${BACKUP_DIR}/backup.log"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

log() {
    local msg="[$(date +'%Y-%m-%d %H:%M:%S')] $1"
    echo "${msg}"
    echo "${msg}" >> "${LOG_FILE}"
}

log "================================================================="
log "STARTING POSTGRESQL DATABASE BACKUP: ${DB_NAME} at ${DB_HOST}:${DB_PORT}"
log "================================================================="

# Execute pg_dump with custom compressed format (-Fc)
export PGPASSWORD="${DB_PASS}"
if pg_dump -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" \
    -Fc -v --no-owner --no-privileges -f "${BACKUP_FILE}" 2>> "${LOG_FILE}"; then
    
    FILE_SIZE="$(du -h "${BACKUP_FILE}" | cut -f1)"
    log "Backup successful: ${BACKUP_FILE} (Size: ${FILE_SIZE})"
    
    # Generate SHA-256 Checksum for tamper verification
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "${BACKUP_FILE}" > "${BACKUP_FILE}.sha256"
        log "Checksum created: ${BACKUP_FILE}.sha256"
    fi

    # Rotate old backups (delete older than RETENTION_DAYS)
    log "Rotating backups older than ${RETENTION_DAYS} days..."
    find "${BACKUP_DIR}" -type f -name "travel_db_*.dump*" -mtime "+${RETENTION_DAYS}" -delete || true
    log "Backup rotation completed."
    log "BACKUP PROCESS FINISHED SUCCESSFULLY."
    exit 0
else
    log "ERROR: Database backup failed! Check ${LOG_FILE} for details."
    exit 1
fi
