import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cohortRoutes from './routes/cohorts.js';
import exerciseRoutes from './routes/exercises.js';
import progressRoutes from './routes/progress.js';
import instructorRoutes from './routes/instructor.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/instructor', instructorRoutes);

if (!config.isDev) {
  app.use(express.static(config.paths.clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(config.paths.clientDist, 'index.html'));
  });
}

app.use(errorHandler);

export { app };
