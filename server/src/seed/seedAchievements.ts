import { AchievementDefinition } from '../models/AchievementDefinition.js';
import { Collection } from '../models/Collection.js';
import { logger } from '../logger.js';

// ─── Static achievements (no DB lookups needed) ────────────────────────────

const STATIC_ACHIEVEMENTS = [
  // ── Milestone Ladder ────────────────────────────────────────────────────
  {
    name: 'First Spark',
    description: 'Complete your first exercise',
    icon: '⚡',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 1 },
  },
  {
    name: 'Getting Started',
    description: 'Complete 5 exercises',
    icon: '🚀',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 5 },
  },
  {
    name: 'Double Digits',
    description: 'Complete 10 exercises',
    icon: '🔟',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 10 },
  },
  {
    name: 'Quarter Century',
    description: 'Complete 25 exercises',
    icon: '⭐',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 25 },
  },
  {
    name: 'Fifty Fire',
    description: 'Complete 50 exercises',
    icon: '🔥',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 50 },
  },
  {
    name: 'Century Club',
    description: 'Complete 100 exercises',
    icon: '🏆',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 100 },
  },
  {
    name: 'Two-Fifty',
    description: 'Complete 250 exercises',
    icon: '💫',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 250 },
  },
  {
    name: 'Five Hundred Club',
    description: 'Complete 500 exercises',
    icon: '🌟',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 500 },
  },
  {
    name: 'The Thousand',
    description: 'Complete 1,000 exercises',
    icon: '👑',
    criteriaType: 'exercises_completed',
    criteriaParams: { count: 1000 },
  },
  {
    name: 'Completionist',
    description: 'Complete every single exercise on the platform',
    icon: '🏅',
    criteriaType: 'all_exercises',
    criteriaParams: {},
  },

  // ── Tier Mastery ────────────────────────────────────────────────────────
  {
    name: 'Spark Finisher',
    description: 'Complete 25 Tier 1 exercises',
    icon: '🌱',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 1, count: 25 },
  },
  {
    name: 'Foundation Builder',
    description: 'Complete 25 Tier 2 exercises',
    icon: '🔨',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 2, count: 25 },
  },
  {
    name: 'Master Builder',
    description: 'Complete 25 Tier 3 exercises',
    icon: '🏗️',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 3, count: 25 },
  },
  {
    name: 'Architect',
    description: 'Complete 10 Tier 4 exercises',
    icon: '🏛️',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 4, count: 10 },
  },
  {
    name: 'Tier V Master',
    description: 'Complete 5 Tier 5 exercises',
    icon: '💎',
    criteriaType: 'tier_completed',
    criteriaParams: { tier: 5, count: 5 },
  },
  {
    name: 'Tier Climber',
    description: 'Complete at least one exercise at every tier',
    icon: '🧗',
    criteriaType: 'all_tiers',
    criteriaParams: {},
  },

  // ── Type Breadth ────────────────────────────────────────────────────────
  {
    name: 'HTML Pioneer',
    description: 'Complete 10 HTML exercises',
    icon: '🏷️',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'html', count: 10 },
  },
  {
    name: 'CSS Artisan',
    description: 'Complete 20 CSS exercises',
    icon: '🎨',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'css', count: 20 },
  },
  {
    name: 'CSS Master',
    description: 'Complete 50 CSS exercises',
    icon: '🖌️',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'css', count: 50 },
  },
  {
    name: 'JavaScript Journeyman',
    description: 'Complete 50 JavaScript exercises',
    icon: '📜',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'js', count: 50 },
  },
  {
    name: 'JavaScript Centurion',
    description: 'Complete 100 JavaScript exercises',
    icon: '💻',
    criteriaType: 'type_completed',
    criteriaParams: { type: 'js', count: 100 },
  },
  {
    name: 'Full Stack Taster',
    description: 'Complete at least one JS, one CSS, and one HTML exercise',
    icon: '🔗',
    criteriaType: 'all_types',
    criteriaParams: { types: ['js', 'css', 'html'] },
  },

  // ── Quality & Skill ────────────────────────────────────────────────────
  {
    name: 'Perfect Ten',
    description: 'Complete 10 exercises on your first attempt',
    icon: '🎯',
    criteriaType: 'perfect_score',
    criteriaParams: { count: 10 },
  },
  {
    name: 'Sharpshooter',
    description: 'Complete 25 exercises on your first attempt',
    icon: '💥',
    criteriaType: 'perfect_score',
    criteriaParams: { count: 25 },
  },
  {
    name: 'Ninja Coder',
    description: 'Complete 50 exercises on your first attempt',
    icon: '🥷',
    criteriaType: 'perfect_score',
    criteriaParams: { count: 50 },
  },
  {
    name: 'No Peeking',
    description: 'Complete 10 exercises without viewing the solution',
    icon: '🙈',
    criteriaType: 'streak',
    criteriaParams: { count: 10 },
  },
  {
    name: 'Self-Reliant',
    description: 'Complete 25 exercises without viewing the solution',
    icon: '🧘',
    criteriaType: 'streak',
    criteriaParams: { count: 25 },
  },
  {
    name: 'Iron Will',
    description: 'Complete 50 exercises without viewing the solution',
    icon: '🛡️',
    criteriaType: 'streak',
    criteriaParams: { count: 50 },
  },

  // ── Score-Based ─────────────────────────────────────────────────────────
  {
    name: 'Point Collector',
    description: 'Earn 500 total points',
    icon: '📊',
    criteriaType: 'score_reached',
    criteriaParams: { score: 500 },
  },
  {
    name: 'High Scorer',
    description: 'Earn 2,500 total points',
    icon: '📈',
    criteriaType: 'score_reached',
    criteriaParams: { score: 2500 },
  },
  {
    name: 'Elite',
    description: 'Earn 10,000 total points',
    icon: '🥇',
    criteriaType: 'score_reached',
    criteriaParams: { score: 10000 },
  },

  // ── Fun / Engagement ────────────────────────────────────────────────────
  {
    name: 'Explorer',
    description: 'Complete exercises in 5 different categories',
    icon: '🗺️',
    criteriaType: 'categories_explored',
    criteriaParams: { count: 5 },
  },
  {
    name: 'Marathon Runner',
    description: 'Complete 10 exercises in a single day',
    icon: '🏃',
    criteriaType: 'daily_completed',
    criteriaParams: { count: 10 },
  },
  {
    name: 'Conversationalist',
    description: 'Send 25 chat messages',
    icon: '💬',
    criteriaType: 'chat_messages',
    criteriaParams: { count: 25 },
  },
  {
    name: 'Study Buddy',
    description: 'Send 100 chat messages',
    icon: '🤝',
    criteriaType: 'chat_messages',
    criteriaParams: { count: 100 },
  },

  // ── Collection: Librarian (complete 3+ collections) ─────────────────────
  {
    name: 'Librarian',
    description: 'Fully complete 3 exercise collections',
    icon: '📚',
    criteriaType: 'collections_count',
    criteriaParams: { count: 3 },
  },
];

// ─── Collection achievements (need DB lookup for collectionId) ──────────────

const COLLECTION_ACHIEVEMENTS = [
  {
    name: 'Turing Complete',
    description: 'Complete every exercise in the Turing Foundations collection',
    icon: '🟢',
    collectionSlug: 'turing-foundations',
  },
  {
    name: 'Exercism Expert',
    description: 'Complete every exercise in the Exercism collection',
    icon: '🟣',
    collectionSlug: 'exercism',
  },
  {
    name: 'Interview Ready',
    description: 'Complete every exercise in the Rithm Interview Prep collection',
    icon: '🟠',
    collectionSlug: 'rithm-interview-prep',
  },
  {
    name: "Odin's Chosen",
    description: 'Complete every exercise in The Odin Project collection',
    icon: '🟡',
    collectionSlug: 'odin-project',
  },
  {
    name: 'Quest Complete',
    description: 'Complete every exercise in the RPG Questline collection',
    icon: '🗡️',
    collectionSlug: 'rpg-questline',
  },
  {
    name: 'Pop Culture Buff',
    description: 'Complete every exercise in the Pop Culture APIs collection',
    icon: '🌸',
    collectionSlug: 'pop-culture-apis',
  },
  {
    name: 'Scientist',
    description: 'Complete every exercise in the Hard Math & Science collection',
    icon: '🧬',
    collectionSlug: 'hard-math-science',
  },
  {
    name: 'Game Master',
    description: 'Complete every exercise in the Mini-Games collection',
    icon: '🎮',
    collectionSlug: 'mini-games',
  },
];

export async function seedAchievements(): Promise<void> {
  const existingCount = await AchievementDefinition.countDocuments();
  if (existingCount > 0) {
    logger.info({ count: existingCount }, 'Achievement definitions already seeded — skipping');
    return;
  }

  logger.info('Seeding achievement definitions');

  // ── Static achievements ──────────────────────────────────────────────
  for (const seed of STATIC_ACHIEVEMENTS) {
    await AchievementDefinition.create({
      ...seed,
      isActive: true,
    });
  }

  // ── Collection-based achievements (look up IDs by slug) ──────────────
  for (const colAch of COLLECTION_ACHIEVEMENTS) {
    const collection = await Collection.findOne({ slug: colAch.collectionSlug }).lean();
    if (collection) {
      await AchievementDefinition.create({
        name: colAch.name,
        description: colAch.description,
        icon: colAch.icon,
        criteriaType: 'collection_completed',
        criteriaParams: { collectionId: String(collection._id) },
        isActive: true,
      });
    } else {
      logger.warn({ slug: colAch.collectionSlug }, 'Collection not found for achievement — skipping');
    }
  }

  const totalCount = await AchievementDefinition.countDocuments();
  logger.info({ count: totalCount }, 'Achievement seed complete');
}
