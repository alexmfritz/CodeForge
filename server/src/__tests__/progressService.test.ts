import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockProgressFindOne = vi.fn();
const mockProgressCreate = vi.fn();
const mockProgressFind = vi.fn();
const mockProgressSave = vi.fn();

vi.mock('../models/Progress.js', () => ({
  Progress: {
    findOne: (...args: unknown[]) => mockProgressFindOne(...args),
    create: (...args: unknown[]) => mockProgressCreate(...args),
    find: (...args: unknown[]) => mockProgressFind(...args),
  },
}));

const mockExerciseFindById = vi.fn();
vi.mock('../models/Exercise.js', () => ({
  Exercise: {
    findById: (...args: unknown[]) => mockExerciseFindById(...args),
    find: vi.fn().mockReturnValue({ lean: () => Promise.resolve([]) }),
  },
}));

vi.mock('../config.js', () => ({
  config: { jwt: { secret: 'test', expiresIn: '24h' } },
}));

import {
  saveCode,
  recordAttempt,
  markComplete,
  resetProgress,
  viewSolution,
} from '../services/progressService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createMockProgress(overrides = {}) {
  const doc = {
    userId: 'user1',
    exerciseId: 'ex1',
    cohortId: 'cohort1',
    status: 'not_started' as string,
    currentCode: '',
    attempts: 0,
    uniqueAttempts: 0,
    failedCodeHashes: [] as string[],
    hintsViewed: 0,
    solutionViewed: false,
    score: 0,
    firstAttemptAt: undefined as Date | undefined,
    completedAt: undefined as Date | undefined,
    totalTimeSpent: 0,
    save: mockProgressSave,
    toJSON: () => ({ ...doc }),
    ...overrides,
  };
  return doc;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('saveCode', () => {
  beforeEach(() => vi.clearAllMocks());

  it('saves code and transitions to in_progress', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const result = await saveCode('user1', 'ex1', 'cohort1', 'const x = 1;');

    expect(result.currentCode).toBe('const x = 1;');
    expect(result.status).toBe('in_progress');
    expect(mockProgressSave).toHaveBeenCalled();
  });

  it('creates new progress if none exists', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(null);
    mockProgressCreate.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    await saveCode('user1', 'ex1', 'cohort1', 'code');

    expect(mockProgressCreate).toHaveBeenCalledWith({
      userId: 'user1',
      exerciseId: 'ex1',
      cohortId: 'cohort1',
    });
  });

  it('does not overwrite completed status', async () => {
    const progress = createMockProgress({ status: 'completed' });
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const result = await saveCode('user1', 'ex1', 'cohort1', 'updated code');

    expect(result.status).toBe('completed');
    expect(result.currentCode).toBe('updated code');
  });
});

describe('recordAttempt', () => {
  beforeEach(() => vi.clearAllMocks());

  it('increments attempts and sets firstAttemptAt', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const { progress: result } = await recordAttempt('user1', 'ex1', 'cohort1', 'hash1', false);

    expect(result.attempts).toBe(1);
    expect(result.firstAttemptAt).toBeInstanceOf(Date);
    expect(result.status).toBe('in_progress');
  });

  it('tracks unique failed attempts via code hash', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const { isUnique } = await recordAttempt('user1', 'ex1', 'cohort1', 'hash1', false);

    expect(isUnique).toBe(true);
    expect(progress.uniqueAttempts).toBe(1);
    expect(progress.failedCodeHashes).toContain('hash1');
  });

  it('does not increment uniqueAttempts for duplicate hash', async () => {
    const progress = createMockProgress({
      attempts: 1,
      uniqueAttempts: 1,
      failedCodeHashes: ['hash1'],
    });
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const { isUnique } = await recordAttempt('user1', 'ex1', 'cohort1', 'hash1', false);

    expect(isUnique).toBe(false);
    expect(progress.uniqueAttempts).toBe(1); // unchanged
    expect(progress.attempts).toBe(2); // total still increments
  });

  it('does not track hash for passing attempts', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const { isUnique } = await recordAttempt('user1', 'ex1', 'cohort1', 'hash1', true);

    expect(isUnique).toBe(true);
    expect(progress.uniqueAttempts).toBe(0); // not incremented for passing
    expect(progress.failedCodeHashes).not.toContain('hash1');
  });
});

describe('markComplete', () => {
  beforeEach(() => vi.clearAllMocks());

  it('sets status to completed with score', async () => {
    const progress = createMockProgress({ status: 'in_progress', uniqueAttempts: 1 });
    mockProgressFindOne.mockResolvedValue(progress);
    mockExerciseFindById.mockResolvedValue({ tier: 3, basePoints: 50 });
    mockProgressSave.mockResolvedValue(undefined);

    const result = await markComplete('user1', 'ex1', 'cohort1', 1, false);

    expect(result.status).toBe('completed');
    expect(result.score).toBe(50); // tier 3, 1st attempt, no solution
    expect(result.completedAt).toBeInstanceOf(Date);
  });

  it('applies solution viewed penalty', async () => {
    const progress = createMockProgress({ status: 'in_progress' });
    mockProgressFindOne.mockResolvedValue(progress);
    mockExerciseFindById.mockResolvedValue({ tier: 3, basePoints: 50 });
    mockProgressSave.mockResolvedValue(undefined);

    const result = await markComplete('user1', 'ex1', 'cohort1', 1, true);

    expect(result.score).toBe(25); // 50 * 1.0 * 0.5
    expect(result.solutionViewed).toBe(true);
  });

  it('does not re-complete already completed exercises', async () => {
    const progress = createMockProgress({ status: 'completed', score: 50 });
    mockProgressFindOne.mockResolvedValue(progress);

    const result = await markComplete('user1', 'ex1', 'cohort1', 1, false);

    expect(result.score).toBe(50); // unchanged
    expect(mockExerciseFindById).not.toHaveBeenCalled();
    expect(mockProgressSave).not.toHaveBeenCalled();
  });

  it('throws when exercise not found', async () => {
    const progress = createMockProgress({ status: 'in_progress' });
    mockProgressFindOne.mockResolvedValue(progress);
    mockExerciseFindById.mockResolvedValue(null);

    await expect(markComplete('user1', 'ex1', 'cohort1', 1, false)).rejects.toThrow(
      'Exercise not found',
    );
  });

  it('uses basePoints override from exercise', async () => {
    const progress = createMockProgress({ status: 'in_progress' });
    mockProgressFindOne.mockResolvedValue(progress);
    mockExerciseFindById.mockResolvedValue({ tier: 1, basePoints: 100 }); // override from default 10
    mockProgressSave.mockResolvedValue(undefined);

    const result = await markComplete('user1', 'ex1', 'cohort1', 1, false);

    expect(result.score).toBe(100); // uses override, not tier default
  });

  it('falls back to uniqueAttempts from progress when 0 passed', async () => {
    const progress = createMockProgress({ status: 'in_progress', uniqueAttempts: 3 });
    mockProgressFindOne.mockResolvedValue(progress);
    mockExerciseFindById.mockResolvedValue({ tier: 3, basePoints: 50 });
    mockProgressSave.mockResolvedValue(undefined);

    const result = await markComplete('user1', 'ex1', 'cohort1', 0, false);

    expect(result.score).toBe(37); // tier 3, 3 attempts → 50 * 0.75
  });
});

describe('resetProgress', () => {
  beforeEach(() => vi.clearAllMocks());

  it('resets all fields to initial state', async () => {
    const progress = createMockProgress({
      status: 'completed',
      currentCode: 'const x = 1;',
      attempts: 5,
      uniqueAttempts: 3,
      failedCodeHashes: ['h1', 'h2', 'h3'],
      score: 37,
      solutionViewed: true,
      completedAt: new Date(),
    });
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const result = await resetProgress('user1', 'ex1');

    expect(result).not.toBeNull();
    expect(result!.status).toBe('not_started');
    expect(result!.currentCode).toBe('');
    expect(result!.attempts).toBe(0);
    expect(result!.uniqueAttempts).toBe(0);
    expect(result!.failedCodeHashes).toEqual([]);
    expect(result!.score).toBe(0);
    expect(result!.solutionViewed).toBe(false);
  });

  it('returns null when no progress exists', async () => {
    mockProgressFindOne.mockResolvedValue(null);

    const result = await resetProgress('user1', 'ex1');
    expect(result).toBeNull();
  });
});

describe('viewSolution', () => {
  beforeEach(() => vi.clearAllMocks());

  it('sets solutionViewed to true', async () => {
    const progress = createMockProgress();
    mockProgressFindOne.mockResolvedValue(progress);
    mockProgressSave.mockResolvedValue(undefined);

    const result = await viewSolution('user1', 'ex1', 'cohort1');

    expect(result.solutionViewed).toBe(true);
    expect(mockProgressSave).toHaveBeenCalled();
  });
});
