import { createServer } from 'http';
import mongoose from 'mongoose';
import { app } from './app.js';
import { config } from './config.js';
import { initSocketIO } from './socket.js';
import { archivePreviousDayLogs } from './services/chatService.js';
import { seedInstructor } from './seed/seedInstructor.js';
import { seedExercises } from './seed/seedExercises.js';
import { seedAchievements } from './seed/seedAchievements.js';
import { seedAssignments } from './seed/seedAssignments.js';

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

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
    initSocketIO(httpServer);

    const port = config.isDev ? config.devPort : config.port;
    httpServer.listen(port, () => {
      console.log(
        `CodeForge server running on http://localhost:${port} (${config.isDev ? 'dev' : 'production'})`,
      );
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
