import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockRatingFindOneAndUpdate = vi.fn();
const mockRatingFindOne = vi.fn();
const mockRatingAggregate = vi.fn();

vi.mock('../models/Rating.js', () => ({
  Rating: {
    findOneAndUpdate: (...args: unknown[]) => mockRatingFindOneAndUpdate(...args),
    findOne: (...args: unknown[]) => mockRatingFindOne(...args),
    aggregate: (...args: unknown[]) => mockRatingAggregate(...args),
  },
}));

// Mock mongoose.Types.ObjectId so `new mongoose.Types.ObjectId(str)` returns a usable object
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

import {
  submitRating,
  getExerciseRating,
  getExerciseRatings,
  getUserRating,
  getRatingOverview,
} from '../services/ratingService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeRating(overrides: Record<string, unknown> = {}) {
  const base = {
    _id: 'r1',
    userId: 'u1',
    exerciseId: 'ex1',
    cohortId: 'c1',
    stars: 4,
    ...overrides,
  };
  return {
    ...base,
    toJSON: () => base,
  };
}

// ─── Tests: submitRating ─────────────────────────────────────────────────────

describe('submitRating', () => {
  beforeEach(() => vi.clearAllMocks());

  it('upserts a rating and returns JSON', async () => {
    const rating = makeRating({ stars: 5 });
    mockRatingFindOneAndUpdate.mockResolvedValue(rating);

    const result = await submitRating('u1', 'ex1', 'c1', 5);

    expect(mockRatingFindOneAndUpdate).toHaveBeenCalledOnce();
    expect(result.stars).toBe(5);
  });

  it('handles null cohortId', async () => {
    const rating = makeRating({ cohortId: null, stars: 3 });
    mockRatingFindOneAndUpdate.mockResolvedValue(rating);

    const result = await submitRating('u1', 'ex1', null, 3);

    const callArgs = mockRatingFindOneAndUpdate.mock.calls[0];
    expect(callArgs[1].cohortId).toBeNull();
    expect(result.stars).toBe(3);
  });
});

// ─── Tests: getExerciseRating ────────────────────────────────────────────────

describe('getExerciseRating', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns average and total when ratings exist', async () => {
    mockRatingAggregate.mockResolvedValue([
      { _id: null, averageStars: 4.25, totalRatings: 8 },
    ]);

    const result = await getExerciseRating('ex1');

    expect(result.averageStars).toBe(4.3); // rounded to 1 decimal
    expect(result.totalRatings).toBe(8);
  });

  it('returns zeros when no ratings exist', async () => {
    mockRatingAggregate.mockResolvedValue([]);

    const result = await getExerciseRating('ex1');

    expect(result.averageStars).toBe(0);
    expect(result.totalRatings).toBe(0);
  });

  it('rounds correctly at boundary (e.g., 3.45 → 3.5)', async () => {
    mockRatingAggregate.mockResolvedValue([
      { _id: null, averageStars: 3.45, totalRatings: 2 },
    ]);

    const result = await getExerciseRating('ex1');
    expect(result.averageStars).toBe(3.5);
  });

  it('rounds down at boundary (e.g., 3.44 → 3.4)', async () => {
    mockRatingAggregate.mockResolvedValue([
      { _id: null, averageStars: 3.44, totalRatings: 5 },
    ]);

    const result = await getExerciseRating('ex1');
    expect(result.averageStars).toBe(3.4);
  });
});

// ─── Tests: getExerciseRatings ───────────────────────────────────────────────

describe('getExerciseRatings', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns a map of ratings keyed by exerciseId', async () => {
    mockRatingAggregate.mockResolvedValue([
      { _id: { toString: () => 'ex1' }, averageStars: 4.0, totalRatings: 3 },
      { _id: { toString: () => 'ex2' }, averageStars: 3.7, totalRatings: 5 },
    ]);

    const result = await getExerciseRatings(['ex1', 'ex2', 'ex3']);

    expect(result['ex1']).toEqual({ averageStars: 4.0, totalRatings: 3 });
    expect(result['ex2']).toEqual({ averageStars: 3.7, totalRatings: 5 });
    expect(result['ex3']).toBeUndefined(); // no ratings for ex3
  });

  it('returns empty map when no ratings', async () => {
    mockRatingAggregate.mockResolvedValue([]);

    const result = await getExerciseRatings(['ex1']);
    expect(result).toEqual({});
  });
});

// ─── Tests: getUserRating ────────────────────────────────────────────────────

describe('getUserRating', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns rating JSON when found', async () => {
    const rating = makeRating({ stars: 4 });
    mockRatingFindOne.mockResolvedValue(rating);

    const result = await getUserRating('u1', 'ex1');
    expect(result).toEqual({ _id: 'r1', userId: 'u1', exerciseId: 'ex1', cohortId: 'c1', stars: 4 });
  });

  it('returns null when not found', async () => {
    mockRatingFindOne.mockResolvedValue(null);

    const result = await getUserRating('u1', 'ex99');
    expect(result).toBeNull();
  });
});

// ─── Tests: getRatingOverview ────────────────────────────────────────────────

describe('getRatingOverview', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns overview with top and lowest rated', async () => {
    // getRatingOverview calls Rating.aggregate 3 times in parallel
    mockRatingAggregate
      .mockResolvedValueOnce([{ _id: null, averageStars: 4.2, totalRatings: 50 }]) // summary
      .mockResolvedValueOnce([ // topRated
        { exerciseId: 'ex1', title: 'Best', averageStars: 5.0, totalRatings: 10 },
      ])
      .mockResolvedValueOnce([ // lowestRated
        { exerciseId: 'ex2', title: 'Worst', averageStars: 1.5, totalRatings: 8 },
      ]);

    const result = await getRatingOverview('c1');

    expect(result.averageStars).toBe(4.2);
    expect(result.totalRatings).toBe(50);
    expect(result.topRated).toHaveLength(1);
    expect(result.lowestRated).toHaveLength(1);
  });

  it('returns zeros when no summary data', async () => {
    mockRatingAggregate
      .mockResolvedValueOnce([]) // empty summary
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result = await getRatingOverview();

    expect(result.averageStars).toBe(0);
    expect(result.totalRatings).toBe(0);
    expect(result.topRated).toEqual([]);
    expect(result.lowestRated).toEqual([]);
  });

  it('works without cohortId filter', async () => {
    mockRatingAggregate
      .mockResolvedValueOnce([{ _id: null, averageStars: 3.8, totalRatings: 100 }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result = await getRatingOverview();

    expect(result.averageStars).toBe(3.8);
    expect(result.totalRatings).toBe(100);
  });

  it('rounds averageStars to 1 decimal', async () => {
    mockRatingAggregate
      .mockResolvedValueOnce([{ _id: null, averageStars: 3.456, totalRatings: 20 }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result = await getRatingOverview();
    expect(result.averageStars).toBe(3.5);
  });
});
