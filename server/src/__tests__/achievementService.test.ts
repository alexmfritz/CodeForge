import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockDefFind = vi.fn();
vi.mock('../models/AchievementDefinition.js', () => ({
  AchievementDefinition: {
    find: (...args: unknown[]) => mockDefFind(...args),
  },
}));

const mockInstFind = vi.fn();
const mockInstCreate = vi.fn();
vi.mock('../models/AchievementInstance.js', () => ({
  AchievementInstance: {
    find: (...args: unknown[]) => mockInstFind(...args),
    create: (...args: unknown[]) => mockInstCreate(...args),
  },
}));

const mockProgressFind = vi.fn();
vi.mock('../models/Progress.js', () => ({
  Progress: {
    find: (...args: unknown[]) => mockProgressFind(...args),
  },
}));

const mockExerciseFind = vi.fn();
const mockExerciseCountDocuments = vi.fn();
vi.mock('../models/Exercise.js', () => ({
  Exercise: {
    find: (...args: unknown[]) => mockExerciseFind(...args),
    countDocuments: (...args: unknown[]) => mockExerciseCountDocuments(...args),
  },
}));

const mockCollectionFindById = vi.fn();
const mockCollectionFind = vi.fn();
vi.mock('../models/Collection.js', () => ({
  Collection: {
    findById: (...args: unknown[]) => mockCollectionFindById(...args),
    find: (...args: unknown[]) => mockCollectionFind(...args),
  },
}));

const mockChatMessageCountDocuments = vi.fn();
vi.mock('../models/ChatMessage.js', () => ({
  ChatMessage: {
    countDocuments: (...args: unknown[]) => mockChatMessageCountDocuments(...args),
  },
}));

vi.mock('../config.js', () => ({
  config: { jwt: { secret: 'test', expiresIn: '24h' } },
}));

import { checkAchievements, getAllDefinitions, getUserAchievements } from '../services/achievementService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeObjectId(str: string) {
  return { toString: () => str };
}

function makeDefinition(overrides: {
  _id: string;
  name: string;
  criteriaType: string;
  criteriaParams: Record<string, unknown>;
}) {
  return {
    _id: makeObjectId(overrides._id),
    name: overrides.name,
    description: `Description for ${overrides.name}`,
    icon: '🏆',
    criteriaType: overrides.criteriaType,
    criteriaParams: overrides.criteriaParams,
    isActive: true,
  };
}

function setupCheckAchievements(opts: {
  definitions: ReturnType<typeof makeDefinition>[];
  existingInstances?: Array<{ achievementId: string }>;
  progress?: Array<{
    exerciseId: string;
    uniqueAttempts: number;
    solutionViewed: boolean;
    score: number;
    completedAt?: Date;
  }>;
  exercises?: Array<{ _id: string; type: string; tier: number; category?: string[]; collectionId?: string }>;
}) {
  // AchievementDefinition.find({ isActive: true }).lean()
  mockDefFind.mockReturnValue({ lean: () => Promise.resolve(opts.definitions) });

  // AchievementInstance.find({ userId }).lean()
  const instances = (opts.existingInstances || []).map((i) => ({
    achievementId: makeObjectId(i.achievementId),
  }));
  mockInstFind.mockReturnValue({ lean: () => Promise.resolve(instances) });

  // Progress.find({ userId, status: 'completed' }).lean()
  const progress = (opts.progress || []).map((p) => ({
    exerciseId: makeObjectId(p.exerciseId),
    uniqueAttempts: p.uniqueAttempts,
    solutionViewed: p.solutionViewed,
    score: p.score,
    completedAt: p.completedAt,
  }));
  mockProgressFind.mockReturnValue({ lean: () => Promise.resolve(progress) });

  // Exercise.find({ _id: { $in: ... } }).lean()
  const exercises = (opts.exercises || []).map((e) => ({
    _id: makeObjectId(e._id),
    type: e.type,
    tier: e.tier,
    category: e.category || [],
    collectionId: e.collectionId ? makeObjectId(e.collectionId) : undefined,
  }));
  mockExerciseFind.mockReturnValue({ lean: () => Promise.resolve(exercises) });

  // Default instance creation mock
  mockInstCreate.mockImplementation((data: { achievementId: unknown }) => ({
    _id: makeObjectId('inst-new'),
    achievementId: data.achievementId,
    earnedAt: new Date('2026-03-07T12:00:00Z'),
    toJSON: () => ({
      _id: 'inst-new',
      achievementId: String(data.achievementId),
      earnedAt: '2026-03-07T12:00:00.000Z',
    }),
  }));
}

// ─── Tests: checkAchievements ───────────────────────────────────────────────

describe('checkAchievements', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty when no active definitions', async () => {
    setupCheckAchievements({ definitions: [] });
    const result = await checkAchievements('u1', 'c1');
    expect(result).toEqual([]);
  });

  it('returns empty when all definitions already earned', async () => {
    setupCheckAchievements({
      definitions: [makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'exercises_completed', criteriaParams: { count: 1 } })],
      existingInstances: [{ achievementId: 'd1' }],
    });
    const result = await checkAchievements('u1', 'c1');
    expect(result).toEqual([]);
  });

  it('earns exercises_completed achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'First Steps', criteriaType: 'exercises_completed', criteriaParams: { count: 2 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 2, solutionViewed: false, score: 40 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('First Steps');
    expect(mockInstCreate).toHaveBeenCalledOnce();
  });

  it('does NOT earn when count not met for exercises_completed', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'exercises_completed', criteriaParams: { count: 5 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns tier_completed achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Tier 2 Pro', criteriaType: 'tier_completed', criteriaParams: { tier: 2, count: 2 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 2 },
        { _id: 'ex2', type: 'js', tier: 2 },
        { _id: 'ex3', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tier 2 Pro');
  });

  it('earns type_completed achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'CSS Master', criteriaType: 'type_completed', criteriaParams: { type: 'css', count: 1 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 40 },
      ],
      exercises: [{ _id: 'ex1', type: 'css', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('CSS Master');
  });

  it('earns score_reached achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Score 100', criteriaType: 'score_reached', criteriaParams: { score: 100 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 60 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Score 100');
  });

  it('does NOT earn score_reached when total below threshold', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'score_reached', criteriaParams: { score: 200 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns collection_completed achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Collection Done', criteriaType: 'collection_completed', criteriaParams: { collectionId: 'col1' } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1, collectionId: 'col1' },
        { _id: 'ex2', type: 'js', tier: 1, collectionId: 'col1' },
      ],
    });

    // Collection has exactly these exercises
    mockCollectionFindById.mockReturnValue({
      lean: () =>
        Promise.resolve({
          _id: makeObjectId('col1'),
          exerciseIds: [makeObjectId('ex1'), makeObjectId('ex2')],
        }),
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Collection Done');
  });

  it('does NOT earn collection_completed when missing exercises', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'collection_completed', criteriaParams: { collectionId: 'col1' } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    mockCollectionFindById.mockReturnValue({
      lean: () =>
        Promise.resolve({
          _id: makeObjectId('col1'),
          exerciseIds: [makeObjectId('ex1'), makeObjectId('ex2')],
        }),
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('returns false for collection_completed when collection not found', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'collection_completed', criteriaParams: { collectionId: 'missing' } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    mockCollectionFindById.mockReturnValue({ lean: () => Promise.resolve(null) });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns perfect_score achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Perfect', criteriaType: 'perfect_score', criteriaParams: { count: 2 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex3', uniqueAttempts: 3, solutionViewed: false, score: 30 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
        { _id: 'ex3', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Perfect');
  });

  it('does NOT count solutionViewed as perfect', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'perfect_score', criteriaParams: { count: 2 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: true, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns streak achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Streak 3', criteriaType: 'streak', criteriaParams: { count: 3 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 2, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 3, solutionViewed: false, score: 40 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
        { _id: 'ex3', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
  });

  it('returns false for unknown criteria type', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'unknown_type', criteriaParams: {} }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns multiple achievements in one call', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'exercises_completed', criteriaParams: { count: 1 } }),
        makeDefinition({ _id: 'd2', name: 'A2', criteriaType: 'score_reached', criteriaParams: { score: 50 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 60 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(2);
    expect(mockInstCreate).toHaveBeenCalledTimes(2);
  });

  it('skips already-earned and only evaluates unearned', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Earned', criteriaType: 'exercises_completed', criteriaParams: { count: 1 } }),
        makeDefinition({ _id: 'd2', name: 'New', criteriaType: 'exercises_completed', criteriaParams: { count: 1 } }),
      ],
      existingInstances: [{ achievementId: 'd1' }],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('New');
  });

  // ─── New criteria types ─────────────────────────────────────────────────

  it('earns all_exercises achievement when all exercises completed', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Completionist', criteriaType: 'all_exercises', criteriaParams: {} }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 2 },
        { _id: 'ex3', type: 'css', tier: 1 },
      ],
    });
    mockExerciseCountDocuments.mockResolvedValue(3);

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Completionist');
  });

  it('does NOT earn all_exercises when some remain', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'all_exercises', criteriaParams: {} }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });
    mockExerciseCountDocuments.mockResolvedValue(100);

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns all_tiers achievement when 1+ exercise at each tier', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Tier Climber', criteriaType: 'all_tiers', criteriaParams: {} }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30 },
        { exerciseId: 'ex4', uniqueAttempts: 1, solutionViewed: false, score: 40 },
        { exerciseId: 'ex5', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 2 },
        { _id: 'ex3', type: 'js', tier: 3 },
        { _id: 'ex4', type: 'js', tier: 4 },
        { _id: 'ex5', type: 'js', tier: 5 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tier Climber');
  });

  it('does NOT earn all_tiers when missing a tier', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'all_tiers', criteriaParams: {} }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 2 },
        { _id: 'ex3', type: 'js', tier: 3 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns all_types achievement when all types represented', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Full Stack', criteriaType: 'all_types', criteriaParams: { types: ['js', 'css', 'html'] } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'css', tier: 1 },
        { _id: 'ex3', type: 'html', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Full Stack');
  });

  it('does NOT earn all_types when missing a type', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'all_types', criteriaParams: { types: ['js', 'css', 'html'] } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'css', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns collections_count achievement when enough collections completed', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Librarian', criteriaType: 'collections_count', criteriaParams: { count: 2 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 50 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 2 },
        { _id: 'ex3', type: 'css', tier: 1 },
      ],
    });

    mockCollectionFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { _id: makeObjectId('col1'), exerciseIds: [makeObjectId('ex1')], isDefault: false, hidden: false },
          { _id: makeObjectId('col2'), exerciseIds: [makeObjectId('ex2'), makeObjectId('ex3')], isDefault: false, hidden: false },
          { _id: makeObjectId('col3'), exerciseIds: [makeObjectId('ex1'), makeObjectId('ex99')], isDefault: false, hidden: false },
        ]),
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Librarian');
  });

  it('does NOT earn collections_count when not enough completed', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'collections_count', criteriaParams: { count: 3 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    mockCollectionFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { _id: makeObjectId('col1'), exerciseIds: [makeObjectId('ex1')], isDefault: false, hidden: false },
          { _id: makeObjectId('col2'), exerciseIds: [makeObjectId('ex2')], isDefault: false, hidden: false },
        ]),
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('collections_count skips default curriculum collection', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'collections_count', criteriaParams: { count: 1 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 50 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });

    mockCollectionFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { _id: makeObjectId('col1'), exerciseIds: [makeObjectId('ex1')], isDefault: true, hidden: false },
        ]),
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns categories_explored achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Explorer', criteriaType: 'categories_explored', criteriaParams: { count: 3 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1, category: ['javascript', 'arrays'] },
        { _id: 'ex2', type: 'css', tier: 1, category: ['css', 'flexbox'] },
        { _id: 'ex3', type: 'html', tier: 1, category: ['html', 'forms'] },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Explorer');
  });

  it('does NOT earn categories_explored when not enough categories', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'categories_explored', criteriaParams: { count: 5 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20 },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1, category: ['javascript', 'arrays'] },
        { _id: 'ex2', type: 'js', tier: 1, category: ['javascript', 'strings'] },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns daily_completed achievement', async () => {
    const sameDay = new Date('2026-03-07T10:00:00Z');
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Marathon', criteriaType: 'daily_completed', criteriaParams: { count: 3 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10, completedAt: sameDay },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20, completedAt: sameDay },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30, completedAt: sameDay },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
        { _id: 'ex3', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Marathon');
  });

  it('does NOT earn daily_completed when exercises spread across days', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'daily_completed', criteriaParams: { count: 3 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10, completedAt: new Date('2026-03-07T10:00:00Z') },
        { exerciseId: 'ex2', uniqueAttempts: 1, solutionViewed: false, score: 20, completedAt: new Date('2026-03-08T10:00:00Z') },
        { exerciseId: 'ex3', uniqueAttempts: 1, solutionViewed: false, score: 30, completedAt: new Date('2026-03-09T10:00:00Z') },
      ],
      exercises: [
        { _id: 'ex1', type: 'js', tier: 1 },
        { _id: 'ex2', type: 'js', tier: 1 },
        { _id: 'ex3', type: 'js', tier: 1 },
      ],
    });

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });

  it('earns chat_messages achievement', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'Chatty', criteriaType: 'chat_messages', criteriaParams: { count: 10 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });
    mockChatMessageCountDocuments.mockResolvedValue(15);

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chatty');
  });

  it('does NOT earn chat_messages when count too low', async () => {
    setupCheckAchievements({
      definitions: [
        makeDefinition({ _id: 'd1', name: 'A1', criteriaType: 'chat_messages', criteriaParams: { count: 25 } }),
      ],
      progress: [
        { exerciseId: 'ex1', uniqueAttempts: 1, solutionViewed: false, score: 10 },
      ],
      exercises: [{ _id: 'ex1', type: 'js', tier: 1 }],
    });
    mockChatMessageCountDocuments.mockResolvedValue(5);

    const result = await checkAchievements('u1', 'c1');
    expect(result).toHaveLength(0);
  });
});

// ─── Tests: getAllDefinitions ────────────────────────────────────────────────

describe('getAllDefinitions', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns sorted active definitions', async () => {
    const defs = [
      makeDefinition({ _id: 'd1', name: 'Alpha', criteriaType: 'exercises_completed', criteriaParams: { count: 1 } }),
      makeDefinition({ _id: 'd2', name: 'Beta', criteriaType: 'exercises_completed', criteriaParams: { count: 2 } }),
    ];
    mockDefFind.mockReturnValue({
      sort: () => ({ lean: () => Promise.resolve(defs) }),
    });

    const result = await getAllDefinitions();
    expect(result).toHaveLength(2);
    expect(mockDefFind).toHaveBeenCalledWith({ isActive: true });
  });
});

// ─── Tests: getUserAchievements ──────────────────────────────────────────────

describe('getUserAchievements', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns mapped achievements with definitions', async () => {
    const instances = [
      {
        _id: makeObjectId('inst1'),
        userId: makeObjectId('u1'),
        achievementId: {
          _id: makeObjectId('d1'),
          name: 'First Steps',
          description: 'Complete 1 exercise',
          icon: '🏆',
          criteriaType: 'exercises_completed',
          criteriaParams: { count: 1 },
          isActive: true,
        },
        cohortId: makeObjectId('c1'),
        earnedAt: new Date('2026-03-01T10:00:00Z'),
        metadata: {},
      },
    ];

    mockInstFind.mockReturnValue({
      populate: () => ({ lean: () => Promise.resolve(instances) }),
    });

    const result = await getUserAchievements('u1');
    expect(result).toHaveLength(1);
    expect(result[0].definition.name).toBe('First Steps');
    expect(result[0].earnedAt).toBe('2026-03-01T10:00:00.000Z');
  });

  it('returns empty array when no achievements', async () => {
    mockInstFind.mockReturnValue({
      populate: () => ({ lean: () => Promise.resolve([]) }),
    });

    const result = await getUserAchievements('u1');
    expect(result).toEqual([]);
  });
});
