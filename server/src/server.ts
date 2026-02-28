import mongoose from 'mongoose';
import { app } from './app.js';
import { config } from './config.js';
import { seedInstructor } from './seed/seedInstructor.js';
import { seedExercises } from './seed/seedExercises.js';

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    await seedInstructor();
    await seedExercises();

    const port = config.isDev ? config.devPort : config.port;
    app.listen(port, () => {
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
