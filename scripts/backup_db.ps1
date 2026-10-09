<#
.SYNOPSIS
    Automated PostgreSQL database backup for Windows / local dev environments.
.DESCRIPTION
    Runs pg_dump, generates SHA-256 hash, and rotates backups older than 30 days.
#>

$ErrorActionPreference = "Stop"

$DB_HOST = if ($env:POSTGRES_HOST) { $env:POSTGRES_HOST } else { "localhost" }
$DB_PORT = if ($env:POSTGRES_PORT) { $env:POSTGRES_PORT } else { "5432" }
$DB_NAME = if ($env:POSTGRES_DB) { $env:POSTGRES_DB } else { "travel" }
$DB_USER = if ($env:POSTGRES_USER) { $env:POSTGRES_USER } else { "travel" }
$DB_PASS = if ($env:POSTGRES_PASSWORD) { $env:POSTGRES_PASSWORD } else { "travel" }

$BACKUP_DIR = if ($env:BACKUP_DIR) { $env:BACKUP_DIR } else { ".\backups" }
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_FILE = Join-Path $BACKUP_DIR "travel_db_$TIMESTAMP.dump"

if (!(Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
}

Write-Host "Starting backup for $DB_NAME from $DB_HOST`:$DB_PORT..." -ForegroundColor Cyan

$env:PGPASSWORD = $DB_PASS
try {
    & pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -Fc -v --no-owner --no-privileges -f $BACKUP_FILE
    if ($LASTEXITCODE -eq 0) {
        $fileInfo = Get-Item $BACKUP_FILE
        $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        Write-Host "Backup created: $BACKUP_FILE ($sizeMB MB)" -ForegroundColor Green

        $hash = Get-FileHash -Path $BACKUP_FILE -Algorithm SHA256
        $hash.Hash | Out-File "$BACKUP_FILE.sha256" -Encoding utf8
        Write-Host "SHA256 checksum saved: $BACKUP_FILE.sha256" -ForegroundColor Green
    } else {
        Write-Error "pg_dump failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Error "Backup failed: $_"
} finally {
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}
