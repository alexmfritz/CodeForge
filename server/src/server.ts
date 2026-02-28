import mongoose from 'mongoose';
import { app } from './app.js';
import { config } from './config.js';

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

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
