import { createServer } from 'http';
import mongoose from 'mongoose';
import { app } from './app.js';
import { config } from './config.js';
import { logger } from './logger.js';
import { initSocketIO } from './socket.js';
import { archivePreviousDayLogs } from './services/chatService.js';
import { seedInstructor } from './seed/seedInstructor.js';
import { seedExercises } from './seed/seedExercises.js';
import { seedAchievements } from './seed/seedAchievements.js';
import { seedAssignments } from './seed/seedAssignments.js';

async function start(): Promise<void> {
  try {
    // Validate critical config in production
    if (!config.isDev && config.jwt.secret === 'change-this-to-a-random-secret') {
      logger.fatal('JWT_SECRET is still the default value. Set a secure secret in .env before running in production.');
      process.exit(1);
    }

    await mongoose.connect(config.mongoUri);
    logger.info('Connected to MongoDB');

    await seedInstructor();
    await seedExercises();
    await seedAchievements();
    await seedAssignments();

    if (config.isDev) {
      const { seedDevData } = await import('./seed/seedDevData.js');
      await seedDevData();
    }

    await archivePreviousDayLogs();

    const httpServer = createServer(app);
    const io = initSocketIO(httpServer, app);

    const port = config.isDev ? config.devPort : config.port;
    httpServer.listen(port, () => {
      logger.info({ port, mode: config.isDev ? 'dev' : 'production' }, 'CodeForge server started');
    });

    // Graceful shutdown — drain connections before exiting
    let shuttingDown = false;
    const shutdown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      logger.info({ signal }, 'Shutting down gracefully…');

      io.close();
      await new Promise<void>((resolve) => httpServer.close(() => resolve()));
      logger.info('HTTP server closed');

      await mongoose.disconnect();
      logger.info('MongoDB disconnected');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    logger.fatal({ err }, 'Failed to start server');
    process.exit(1);
  }
}

start();
