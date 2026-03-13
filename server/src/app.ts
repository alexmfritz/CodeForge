import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import mongoose from 'mongoose';
import { config } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cohortRoutes from './routes/cohorts.js';
import exerciseRoutes from './routes/exercises.js';
import progressRoutes from './routes/progress.js';
import instructorRoutes from './routes/instructor.js';
import assignmentRoutes from './routes/assignments.js';
import achievementRoutes from './routes/achievements.js';
import ratingRoutes from './routes/ratings.js';
import chatRoutes from './routes/chat.js';
import leaderboardRoutes from './routes/leaderboard.js';
import reviewRoutes from './routes/reviews.js';

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: config.isDev ? false : undefined,
  }),
);

// CORS — restrict to known origins in production
app.use(
  cors(
    config.isDev
      ? { origin: ['http://localhost:5173'], credentials: true }
      : { origin: false },
  ),
);

app.use(express.json({ limit: '1mb' }));

// Rate limiters — relaxed in dev mode to avoid blocking e2e test runs
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.isDev ? 200 : 30,
  message: { success: false, error: 'Too many login attempts — try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: config.isDev ? 600 : 120,
  message: { success: false, error: 'Too many requests — slow down' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check — verifies MongoDB connection + basic metrics
const startedAt = Date.now();
app.get('/api/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
  const healthy = dbState === 1;
  const mem = process.memoryUsage();

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    database: dbStatus,
    memory: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
    },
    socketConnections: app.get('socketConnectionCount') ?? 0,
  });
});

// Apply rate limiters
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/reviews', reviewRoutes);

if (!config.isDev) {
  app.use(express.static(config.paths.clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(config.paths.clientDist, 'index.html'));
  });
}

app.use(errorHandler);

export { app };
