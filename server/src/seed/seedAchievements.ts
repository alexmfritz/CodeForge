import { AchievementDefinition } from '../models/AchievementDefinition.js';

const ACHIEVEMENT_SEEDS = [
  {
    name: 'First Spark',
    description: 'Complete your first exercise',
    icon: '\u26A1',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 1 },
  },
  {
    name: 'Getting Started',
    description: 'Complete 5 exercises',
    icon: '\uD83D\uDE80',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 5 },
  },
  {
    name: 'Double Digits',
    description: 'Complete 10 exercises',
    icon: '\uD83D\uDD1F',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 10 },
  },
  {
    name: 'Quarter Century',
    description: 'Complete 25 exercises',
    icon: '\u2B50',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 25 },
  },
  {
    name: 'Century Club',
    description: 'Complete 100 exercises',
    icon: '\uD83C\uDFC6',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 100 },
  },
  {
    name: 'Tier V Master',
    description: 'Complete 5 tier-5 exercises',
    icon: '\uD83D\uDC8E',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 5, count: 5 },
  },
  {
    name: 'JavaScript Journeyman',
    description: 'Complete 50 JavaScript exercises',
    icon: '\uD83D\uDCDC',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'js', count: 50 },
  },
  {
    name: 'CSS Artisan',
    description: 'Complete 20 CSS exercises',
    icon: '\uD83C\uDFA8',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'css', count: 20 },
  },
  {
    name: 'Perfect Ten',
    description: 'Complete 10 exercises on your first attempt',
    icon: '\uD83C\uDFAF',
    criteriaType: 'perfect_score',
    criteriaParams: { count: 10 },
  },
  {
    name: 'No Peeking',
    description: 'Complete 10 exercises without viewing the solution',
    icon: '\uD83D\uDE48',
    criteriaType: 'streak',
    criteriaParams: { count: 10 },
  },
];

// Seeds default achievement definitions if database is empty
export async function seedAchievements(): Promise<void> {
  const existingCount = await AchievementDefinition.countDocuments();
  if (existingCount > 0) {
    console.log(`Found ${existingCount} achievement definitions already seeded \u2014 skipping`);
    return;
  }

  console.log('Seeding achievement definitions\u2026');

  // Insert all predefined achievement templates
  for (const seed of ACHIEVEMENT_SEEDS) {
    await AchievementDefinition.create({
      ...seed,
      isActive: true,
    });
  }

  console.log(`Seed complete: ${ACHIEVEMENT_SEEDS.length} achievement definitions created`);
}
