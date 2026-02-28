import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static client build in production
if (!config.isDev) {
  app.use(express.static(config.paths.clientDist));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(config.paths.clientDist, 'index.html'));
  });
}

// Error handler (must be last)
app.use(errorHandler);

export { app };
