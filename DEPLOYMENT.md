# CodeForge — Deployment Guide

This guide covers deploying CodeForge to a single classroom server in a DOC facility. The platform runs entirely offline with no external dependencies.

## Prerequisites

- **Node.js** >= 20 (pre-installed or from Verdaccio)
- **MongoDB** 7.x (Community Edition)
- **PM2** (process manager): `npm install -g pm2`
- **mongodump** / **mongorestore** (included with MongoDB Tools)

## 1. Initial Setup

```bash
# Clone or copy the project to the server
cd /opt/codeforge   # or wherever you prefer

# Install dependencies (from Verdaccio in offline environments)
npm install

# Copy and configure environment
cp .env.example .env
```

### Configure `.env`

Edit `.env` with production values:

```env
# Server
PORT=3000
MONGODB_URI=mongodb://localhost:27017/codeforge

# IMPORTANT: Generate a real secret — do NOT use the default
# Example: openssl rand -base64 32
JWT_SECRET=<your-secure-random-secret>
JWT_EXPIRES_IN=24h

# Timezone for chat archival (match your facility's timezone)
TIMEZONE=America/Los_Angeles

# Initial instructor account
INSTRUCTOR_NAME=Your Name
INSTRUCTOR_DOC_NUMBER=your-doc-number
```

**Critical**: The server will refuse to start if `JWT_SECRET` is left as the default value.

## 2. Build

```bash
npm run build
```

This compiles all three workspaces in order: `shared` → `server` → `client`. The client bundle is output to `client/dist/` and served by Express in production mode.

## 3. First Run (Seeds Database)

On first startup, the server automatically:
1. Creates the instructor account from `.env` values
2. Seeds all exercises from `exercises/collections/*.json`
3. Creates achievement definitions
4. Creates sample assignments (if a cohort exists)

These seeds only run if the respective collections are empty — restarting the server does **not** overwrite existing data.

```bash
# Test that it starts correctly
node server/dist/server.js
# You should see:
#   Connected to MongoDB
#   Instructor account created: <username>
#   Seeding exercises from N collection files…
#   CodeForge server running on http://localhost:3000 (production)
```

Visit `http://localhost:3000` to verify the UI loads, then `Ctrl+C` to stop.

## 4. Run with PM2

PM2 keeps the server running, restarts on crash, and manages logs.

```bash
# Start
pm2 start ecosystem.config.cjs

# Verify
pm2 status
pm2 logs codeforge

# Save process list (survives reboot)
pm2 save
pm2 startup  # follow the printed command to enable boot startup
```

### PM2 Commands Reference

| Command | Description |
|---------|-------------|
| `pm2 start ecosystem.config.cjs` | Start the server |
| `pm2 stop codeforge` | Stop the server |
| `pm2 restart codeforge` | Restart (graceful) |
| `pm2 logs codeforge` | Stream logs |
| `pm2 logs codeforge --lines 200` | Show last 200 log lines |
| `pm2 monit` | Real-time monitoring (CPU, memory) |
| `pm2 status` | Show process status |

## 5. Health Check

The server exposes a health endpoint that verifies the MongoDB connection:

```bash
curl http://localhost:3000/api/health
# Healthy:  {"status":"ok","timestamp":"...","database":"connected"}
# Degraded: {"status":"degraded","timestamp":"...","database":"disconnected"} (503)
```

Use this for monitoring scripts or process manager health checks.

## 6. Backups

### Manual Backup

```bash
./scripts/backup.sh
# Output: backups/20260307-143000/codeforge/
```

### Automated Daily Backup (Cron)

```bash
crontab -e
# Add this line (runs daily at 2 AM, logs output):
0 2 * * * cd /opt/codeforge && ./scripts/backup.sh >> logs/backup.log 2>&1
```

The backup script:
- Dumps the full MongoDB database using `mongodump`
- Stores backups in `backups/<timestamp>/`
- Automatically prunes backups older than 30 days
- Reads `MONGODB_URI` from `.env`

### Restore from Backup

```bash
# Stop the server first
pm2 stop codeforge

# Restore (replace <timestamp> with the backup folder name)
mongorestore --db codeforge --drop backups/<timestamp>/codeforge/

# Restart
pm2 start codeforge
```

## 7. Updating CodeForge

```bash
# Stop the server
pm2 stop codeforge

# Pull updates (if using git) or copy new files
git pull origin main

# Reinstall dependencies
npm install

# Rebuild
npm run build

# Start
pm2 start codeforge
```

**Note on exercises**: If a new version adds exercises, the seeder will only insert them if the Exercise collection is empty. To re-seed exercises with new content:

```bash
# This drops the database and re-seeds everything
npm run seed:reset
```

**Warning**: `seed:reset` deletes all student progress data. Only use this for fresh deployments or when you have a backup.

## 8. Security Notes

- **JWT Secret**: Must be changed from the default before production use. The server enforces this.
- **Rate Limiting**: Login attempts are limited to 30 per 15 minutes per IP. General API requests are limited to 120 per minute per IP.
- **CORS**: In production, CORS is disabled (the client is served from the same origin). In development, only `localhost:5173` is allowed.
- **Helmet**: Security headers (X-Frame-Options, CSP, HSTS, etc.) are applied automatically in production.
- **Passwords**: Hashed with bcrypt (10 rounds). Initial instructor password is the DOC number from `.env`.
- **Network**: This platform is designed for isolated networks. Do **not** expose it to the public internet.

## 9. Troubleshooting

### Server won't start

```bash
# Check logs
pm2 logs codeforge --lines 50

# Common causes:
# - MongoDB not running: sudo systemctl start mongod
# - JWT_SECRET not set: edit .env
# - Port in use: check PORT in .env or kill the conflicting process
```

### Students can't connect

```bash
# Verify server is running
pm2 status

# Check health
curl http://localhost:3000/api/health

# Check if MongoDB is up
mongosh --eval "db.adminCommand('ping')"
```

### Need to reset a student password

```bash
# Connect to MongoDB
mongosh codeforge

# Reset password (replace values)
# The hash below is bcrypt of "password"
db.users.updateOne(
  { username: "studentname" },
  { $set: { passwordHash: "$2b$10$YourNewHashHere" } }
)
```

Or use `npm run seed:reset` for a complete fresh start (destroys all data).

### Chat messages not appearing

- Verify Socket.IO is connecting (check browser console for WebSocket errors)
- Ensure the student is assigned to an active cohort
- Check server logs for `[Socket]` messages

## 10. Directory Structure (Production)

```
/opt/codeforge/
├── .env                    # Production config (DO NOT commit)
├── ecosystem.config.cjs    # PM2 process config
├── scripts/backup.sh       # Backup script
├── server/dist/            # Compiled server
├── client/dist/            # Built client (served by Express)
├── exercises/collections/  # Exercise JSON files
├── logs/                   # PM2 log files
│   ├── codeforge-out.log
│   └── codeforge-error.log
├── backups/                # MongoDB backup directories
│   ├── 20260307-020000/
│   └── 20260308-020000/
└── node_modules/           # Dependencies
```
