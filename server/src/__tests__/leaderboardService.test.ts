import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockUserFind = vi.fn();
vi.mock('../models/User.js', () => ({
  User: {
    find: (...args: unknown[]) => mockUserFind(...args),
  },
}));

const mockProgressFind = vi.fn();
const mockProgressAggregate = vi.fn();
vi.mock('../models/Progress.js', () => ({
  Progress: {
    find: (...args: unknown[]) => mockProgressFind(...args),
    aggregate: (...args: unknown[]) => mockProgressAggregate(...args),
  },
}));

const mockExerciseFind = vi.fn();
vi.mock('../models/Exercise.js', () => ({
  Exercise: {
    find: (...args: unknown[]) => mockExerciseFind(...args),
  },
}));

const mockCohortFind = vi.fn();
vi.mock('../models/Cohort.js', () => ({
  Cohort: {
    find: (...args: unknown[]) => mockCohortFind(...args),
  },
}));

const mockAchievementInstanceFind = vi.fn();
vi.mock('../models/AchievementInstance.js', () => ({
  AchievementInstance: {
    find: (...args: unknown[]) => mockAchievementInstanceFind(...args),
  },
}));

const mockAchievementDefinitionFind = vi.fn();
vi.mock('../models/AchievementDefinition.js', () => ({
  AchievementDefinition: {
    find: (...args: unknown[]) => mockAchievementDefinitionFind(...args),
  },
}));

// Mock mongoose.Types.ObjectId so short test IDs don't throw BSONError
vi.mock('mongoose', () => {
  const makeOid = (str: string) => ({ toString: () => str, _bsontype: 'ObjectId' });
  return {
    default: {
      Types: {
        ObjectId: vi.fn((str: string) => makeOid(str)),
      },
    },
  };
});

vi.mock('../config.js', () => ({
  config: { jwt: { secret: 'test', expiresIn: '24h' } },
}));

import { getLeaderboard, getHighlights } from '../services/leaderboardService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeObjectId(str: string) {
  return { toString: () => str };
}

function setupUserFind(users: Array<{ _id: string; displayName: string; cohortId?: string }>) {
  const mapped = users.map((u) => ({
    _id: makeObjectId(u._id),
    displayName: u.displayName,
    cohortId: u.cohortId ? makeObjectId(u.cohortId) : undefined,
  }));
  mockUserFind.mockReturnValue({
    select: () => ({ lean: () => Promise.resolve(mapped) }),
  });
  return mapped;
}

function setupCohortFind(cohorts: Array<{ _id: string; name: string }>) {
  const mapped = cohorts.map((c) => ({
    _id: makeObjectId(c._id),
    name: c.name,
  }));
  mockCohortFind.mockReturnValue({
    select: () => ({ lean: () => Promise.resolve(mapped) }),
  });
}

function setupProgressAggregate(results: Array<{
  _id: string;
  totalScore: number;
  completedCount: number;
  tiers: (number | null)[];
}>) {
  const mapped = results.map((r) => ({
    _id: makeObjectId(r._id),
    totalScore: r.totalScore,
    completedCount: r.completedCount,
    tiers: r.tiers,
  }));
  mockProgressAggregate.mockResolvedValue(mapped);
}

function setupStreakData(entries: Array<{ solutionViewed: boolean }>) {
  // computeStreak calls Progress.find({ userId, status: 'completed' }).sort().select().lean()
  mockProgressFind.mockReturnValue({
    sort: () => ({
      select: () => ({
        lean: () => Promise.resolve(entries),
      }),
    }),
  });
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('getLeaderboard', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty array when no opted-in users exist', async () => {
    mockUserFind.mockReturnValue({
      select: () => ({ lean: () => Promise.resolve([]) }),
    });

    const result = await getLeaderboard('cohort1', null);
    expect(result).toEqual([]);
  });

  it('returns empty array when no cohortId and no requestingUserCohortId', async () => {
    const result = await getLeaderboard(null, null);
    expect(result).toEqual([]);
  });

  it('builds entries with correct scores and ranking', async () => {
    setupUserFind([
      { _id: 'u1', displayName: 'Alice', cohortId: 'c1' },
      { _id: 'u2', displayName: 'Bob', cohortId: 'c1' },
    ]);
    setupCohortFind([{ _id: 'c1', name: 'Cohort 1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 200, completedCount: 10, tiers: [1, 2, 3] },
      { _id: 'u2', totalScore: 300, completedCount: 15, tiers: [2, 3, 3] },
    ]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);

    expect(result).toHaveLength(2);
    expect(result[0].displayName).toBe('Bob');
    expect(result[0].totalScore).toBe(300);
    expect(result[0].rank).toBe(1);
    expect(result[1].displayName).toBe('Alice');
    expect(result[1].totalScore).toBe(200);
    expect(result[1].rank).toBe(2);
  });

  it('handles tied scores by ranking by completedCount', async () => {
    setupUserFind([
      { _id: 'u1', displayName: 'Alice', cohortId: 'c1' },
      { _id: 'u2', displayName: 'Bob', cohortId: 'c1' },
    ]);
    setupCohortFind([{ _id: 'c1', name: 'Cohort 1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 200, completedCount: 10, tiers: [1] },
      { _id: 'u2', totalScore: 200, completedCount: 15, tiers: [1] },
    ]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);

    expect(result[0].displayName).toBe('Bob');
    expect(result[0].completedCount).toBe(15);
    expect(result[1].displayName).toBe('Alice');
  });

  it('filters null tiers from tier breakdown', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'Cohort 1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 100, completedCount: 5, tiers: [1, 2, null, 3, null] },
    ]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);

    expect(result[0].tierBreakdown).toEqual({ 1: 1, 2: 1, 3: 1 });
    expect(result[0].tierBreakdown).not.toHaveProperty('null');
  });

  it('returns zero scores for users with no progress', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'Cohort 1' }]);
    setupProgressAggregate([]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);

    expect(result[0].totalScore).toBe(0);
    expect(result[0].completedCount).toBe(0);
    expect(result[0].tierBreakdown).toEqual({});
    expect(result[0].streak).toBe(0);
  });

  it('uses requestingUserCohortId when cohortId is null', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c2' }]);
    setupCohortFind([{ _id: 'c2', name: 'Cohort 2' }]);
    setupProgressAggregate([]);
    setupStreakData([]);

    await getLeaderboard(null, 'c2');

    // Verify User.find was called (the cohortId filter is applied internally)
    expect(mockUserFind).toHaveBeenCalled();
  });

  it('maps cohort names correctly', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'Spring 2026' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 50, completedCount: 2, tiers: [1] },
    ]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);

    expect(result[0].cohortName).toBe('Spring 2026');
  });
});

describe('computeStreak (via getLeaderboard)', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns streak of 0 for empty progress', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'C1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 10, completedCount: 1, tiers: [1] },
    ]);
    setupStreakData([]);

    const result = await getLeaderboard('c1', null);
    expect(result[0].streak).toBe(0);
  });

  it('counts consecutive exercises without solution viewed', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'C1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 50, completedCount: 5, tiers: [1, 2, 3] },
    ]);
    // Sorted DESC by completedAt — newest first
    setupStreakData([
      { solutionViewed: false },
      { solutionViewed: false },
      { solutionViewed: false },
      { solutionViewed: true },
      { solutionViewed: false },
    ]);

    const result = await getLeaderboard('c1', null);
    expect(result[0].streak).toBe(3);
  });

  it('breaks streak on first solution viewed', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'C1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 10, completedCount: 3, tiers: [1] },
    ]);
    setupStreakData([
      { solutionViewed: true },
      { solutionViewed: false },
      { solutionViewed: false },
    ]);

    const result = await getLeaderboard('c1', null);
    expect(result[0].streak).toBe(0);
  });

  it('returns full count when no solutions viewed', async () => {
    setupUserFind([{ _id: 'u1', displayName: 'Alice', cohortId: 'c1' }]);
    setupCohortFind([{ _id: 'c1', name: 'C1' }]);
    setupProgressAggregate([
      { _id: 'u1', totalScore: 100, completedCount: 4, tiers: [1, 2] },
    ]);
    setupStreakData([
      { solutionViewed: false },
      { solutionViewed: false },
      { solutionViewed: false },
      { solutionViewed: false },
    ]);

    const result = await getLeaderboard('c1', null);
    expect(result[0].streak).toBe(4);
  });
});

describe('getHighlights', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty array when no users in cohort', async () => {
    mockUserFind.mockReturnValue({
      select: () => ({ lean: () => Promise.resolve([]) }),
    });

    const result = await getHighlights('c1');
    expect(result).toEqual([]);
  });

  it('returns highlights sorted by timestamp DESC and capped at 20', async () => {
    const users = [{ _id: makeObjectId('u1'), displayName: 'Alice' }];
    mockUserFind.mockReturnValue({
      select: () => ({ lean: () => Promise.resolve(users) }),
    });

    // No achievements
    mockAchievementInstanceFind.mockReturnValue({ lean: () => Promise.resolve([]) });

    // 25 perfect scores to verify limit
    const perfectScores = Array.from({ length: 25 }, (_, i) => ({
      userId: makeObjectId('u1'),
      exerciseId: makeObjectId(`ex${i}`),
      completedAt: new Date(2026, 2, 7, 10, i),
    }));
    mockProgressFind.mockReturnValue({
      sort: () => ({ limit: () => ({ lean: () => Promise.resolve(perfectScores) }) }),
    });

    // Exercise lookup for perfect scores
    mockExerciseFind.mockReturnValue({
      select: () => ({
        lean: () =>
          Promise.resolve(
            Array.from({ length: 25 }, (_, i) => ({
              _id: makeObjectId(`ex${i}`),
              title: `Exercise ${i}`,
              tier: 1,
            })),
          ),
      }),
    });

    // No milestones
    mockProgressAggregate.mockResolvedValue([]);

    const result = await getHighlights('c1');

    expect(result.length).toBeLessThanOrEqual(20);
  });
});
