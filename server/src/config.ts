// Server configuration — reads .env manually (no dotenv dep for offline installs)
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..', '..');

// Load .env manually (no dotenv dependency for offline environments)
// Manual .env loader — parse KEY=VAL lines, skip comments, never overwrite existing env vars
const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// Frozen config object — all runtime settings derived from env or sensible defaults
export const config = {
  port: Number(process.env.PORT || 3000),
  devPort: Number(process.env.VITE_API_PORT || 3001),
  isDev: process.argv.includes('--dev') || process.env.NODE_ENV === 'development',

  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/codeforge',

  // Auth — secret MUST be overridden in production .env
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-to-a-random-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Seed instructor account created on first boot if no users exist
  instructor: {
    name: process.env.INSTRUCTOR_NAME || 'Admin User',
    docNumber: process.env.INSTRUCTOR_DOC_NUMBER || '000000',
  },

  // Resolved absolute paths for static serving and exercise JSON seeding
  paths: {
    root: ROOT,
    clientDist: path.join(ROOT, 'client', 'dist'),
    exercises: path.join(ROOT, 'exercises'),
  },
} as const;
