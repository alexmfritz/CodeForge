import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..', '..');

// Load .env manually (no dotenv dependency for offline environments)
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

const isDev = process.argv.includes('--dev')
  || process.env.NODE_ENV === 'development'
  || process.argv[1]?.includes('resetAndSeed');

// Validate critical config — fail fast with clear messages
const port = Number(process.env.PORT || 3000);
const devPort = Number(process.env.VITE_API_PORT || 3001);
if (Number.isNaN(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT: "${process.env.PORT}" — must be 1-65535`);
}
if (Number.isNaN(devPort) || devPort < 1 || devPort > 65535) {
  throw new Error(`Invalid VITE_API_PORT: "${process.env.VITE_API_PORT}" — must be 1-65535`);
}

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeforge';
if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
  throw new Error(`Invalid MONGODB_URI — must start with mongodb:// or mongodb+srv://`);
}

// JWT validation
const jwtSecret = process.env.JWT_SECRET || 'change-this-to-a-random-secret';
if (!isDev && jwtSecret === 'change-this-to-a-random-secret') {
  throw new Error('JWT_SECRET must be set in production — do not use the default value');
}

const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
if (!/^\d+[smhd]$/.test(jwtExpiresIn)) {
  throw new Error(`Invalid JWT_EXPIRES_IN: "${jwtExpiresIn}" — must match pattern like "24h", "7d", "30m", "3600s"`);
}

// Timezone validation
const timezone = process.env.TIMEZONE || 'America/Los_Angeles';
try {
  Intl.DateTimeFormat(undefined, { timeZone: timezone });
} catch {
  throw new Error(`Invalid TIMEZONE: "${timezone}" — must be a valid IANA timezone (e.g. "America/Los_Angeles")`);
}

export const config = {
  port,
  devPort,
  isDev,

  mongoUri,

  jwt: {
    secret: jwtSecret,
    expiresIn: jwtExpiresIn,
  },

  timezone,

  instructor: {
    name: process.env.INSTRUCTOR_NAME || 'Admin User',
    docNumber: process.env.INSTRUCTOR_DOC_NUMBER || '000000',
  },

  ta: {
    name: process.env.TA_NAME || '',
    docNumber: process.env.TA_DOC_NUMBER || '',
  },

  paths: {
    root: ROOT,
    clientDist: path.join(ROOT, 'client', 'dist'),
    exercises: path.join(ROOT, 'exercises'),
  },
} as const;
