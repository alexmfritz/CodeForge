// Express app setup — middleware, routes, and static serving (no routes wired yet)
import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
// Global middleware — CORS for dev proxy, 1MB JSON limit for large exercise payloads
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check
// Lightweight health probe — used by client to detect server reachability
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static client build in production
// Production: serve Vite build output and fall through to index.html for SPA routing
if (!config.isDev) {
  app.use(express.static(config.paths.clientDist));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(config.paths.clientDist, 'index.html'));
  });
}

// Error handler (must be last)
// Catch-all error handler must be registered last
app.use(errorHandler);

export { app };
