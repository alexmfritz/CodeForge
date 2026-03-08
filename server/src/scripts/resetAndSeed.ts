/**
 * Drops the database and re-runs all seeds including dev data.
 * Usage: npx tsx src/scripts/resetAndSeed.ts
 */
import mongoose from 'mongoose';
import '../config.js'; // loads .env
import { config } from '../config.js';
import { seedInstructor } from '../seed/seedInstructor.js';
import { seedTA } from '../seed/seedTA.js';
import { seedExercises } from '../seed/seedExercises.js';
import { seedAchievements } from '../seed/seedAchievements.js';
import { seedAssignments } from '../seed/seedAssignments.js';
import { seedDevData } from '../seed/seedDevData.js';

async function main() {
  console.log(`Connecting to ${config.mongoUri}…`);
  await mongoose.connect(config.mongoUri);
  console.log('Connected. Dropping database…');

  await mongoose.connection.db!.dropDatabase();
  console.log('Database dropped.\n');

  console.log('Running seeds…');
  await seedInstructor();
  await seedTA();
  await seedExercises();
  await seedAchievements();
  await seedAssignments();
  await seedDevData();

  console.log('\nAll seeds complete. Disconnecting…');
  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
