#!/usr/bin/env bash
#
# CodeForge MongoDB Backup Script
#
# Usage:
#   ./scripts/backup.sh                  # Backs up to ./backups/<timestamp>/
#   ./scripts/backup.sh /path/to/dir     # Backs up to custom directory
#
# Cron example (daily at 2 AM):
#   0 2 * * * cd /opt/codeforge && ./scripts/backup.sh >> logs/backup.log 2>&1
#
# Restore:
#   mongorestore --db codeforge <backup-dir>/codeforge/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load .env for MONGODB_URI if present
if [ -f "$PROJECT_DIR/.env" ]; then
  export $(grep -v '^#' "$PROJECT_DIR/.env" | grep MONGODB_URI | xargs)
fi

MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/codeforge}"
BACKUP_ROOT="${1:-$PROJECT_DIR/backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"
RETENTION_DAYS=30

echo "[$TIMESTAMP] Starting CodeForge backup…"
echo "  URI:    $MONGODB_URI"
echo "  Target: $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"

# Run the dump
if mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR" --quiet; then
  SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
  echo "  Backup complete: $SIZE"
else
  echo "  ERROR: mongodump failed" >&2
  exit 1
fi

# Prune old backups
if [ -d "$BACKUP_ROOT" ]; then
  PRUNED=$(find "$BACKUP_ROOT" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -not -path "$BACKUP_ROOT" | wc -l | tr -d ' ')
  if [ "$PRUNED" -gt 0 ]; then
    find "$BACKUP_ROOT" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -not -path "$BACKUP_ROOT" -exec rm -rf {} +
    echo "  Pruned $PRUNED backup(s) older than ${RETENTION_DAYS} days"
  fi
fi

echo "[$TIMESTAMP] Backup finished successfully"
