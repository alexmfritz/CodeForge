import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockUserCountDocuments = vi.fn();
const mockUserFind = vi.fn();
vi.mock('../models/User.js', () => ({
  User: {
    countDocuments: (...args: unknown[]) => mockUserCountDocuments(...args),
    find: (...args: unknown[]) => mockUserFind(...args),
    findById: vi.fn(),
  },
}));

const mockProgressFind = vi.fn();
const mockProgressCountDocuments = vi.fn();
const mockProgressAggregate = vi.fn();
vi.mock('../models/Progress.js', () => ({
  Progress: {
    find: (...args: unknown[]) => mockProgressFind(...args),
    countDocuments: (...args: unknown[]) => mockProgressCountDocuments(...args),
    aggregate: (...args: unknown[]) => mockProgressAggregate(...args),
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

const mockCohortFind = vi.fn();
vi.mock('../models/Cohort.js', () => ({
  Cohort: {
    find: (...args: unknown[]) => mockCohortFind(...args),
  },
}));

// Mock mongoose.Types.ObjectId
vi.mock('mongoose', () => {
  const makeOid = (str: string) => ({ toString: () => str, _bsontype: 'ObjectId' });
  return {
    Types: {
      ObjectId: vi.fn((str: string) => makeOid(str)),
    },
  };
});

vi.mock('../config.js', () => ({
  config: { jwt: { secret: 'test', expiresIn: '24h' } },
}));

import { getOverview, getCohortHeatmap, getEngagementTimeline } from '../services/instructorService.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeObjectId(str: string) {
  return { toString: () => str };
}

// ─── Tests: getOverview ──────────────────────────────────────────────────────

describe('getOverview', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns correct counts with a cohort filter', async () => {
    mockUserCountDocuments.mockResolvedValue(10);
    mockProgressFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { score: 50 },
          { score: 100 },
          { score: 75 },
        ]),
    });
    mockCohortFind.mockReturnValue({
      sort: () => ({
        lean: () =>
          Promise.resolve([
            { _id: makeObjectId('c1'), name: 'Cohort 1', isActive: true },
          ]),
      }),
    });
    // Cohort summary sub-queries
    mockUserCountDocuments.mockResolvedValueOnce(10).mockResolvedValueOnce(5);
    mockProgressCountDocuments.mockResolvedValue(20);

    const result = await getOverview('c1');

    expect(result.totalStudents).toBe(10);
    expect(result.totalCompleted).toBe(3);
    expect(result.totalScore).toBe(225);
    expect(result.avgScore).toBe(75);
    expect(result.cohortSummary).toHaveLength(1);
  });

  it('returns zero avgScore when no completed exercises', async () => {
    mockUserCountDocuments.mockResolvedValue(5);
    mockProgressFind.mockReturnValue({ lean: () => Promise.resolve([]) });
    mockCohortFind.mockReturnValue({
      sort: () => ({ lean: () => Promise.resolve([]) }),
    });

    const result = await getOverview();

    expect(result.avgScore).toBe(0);
    expect(result.totalCompleted).toBe(0);
  });

  it('works without cohortId filter', async () => {
    mockUserCountDocuments.mockResolvedValue(20);
    mockProgressFind.mockReturnValue({
      lean: () => Promise.resolve([{ score: 100 }]),
    });
    mockCohortFind.mockReturnValue({
      sort: () => ({ lean: () => Promise.resolve([]) }),
    });

    const result = await getOverview();

    expect(result.totalStudents).toBe(20);
    expect(result.totalCompleted).toBe(1);
  });
});

// ─── Tests: getCohortHeatmap ─────────────────────────────────────────────────

describe('getCohortHeatmap', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns grid of students × exercises with progress', async () => {
    mockUserFind.mockReturnValue({
      sort: () => ({
        lean: () =>
          Promise.resolve([
            { _id: makeObjectId('u1'), displayName: 'Alice' },
            { _id: makeObjectId('u2'), displayName: 'Bob' },
          ]),
      }),
    });

    mockExerciseCountDocuments.mockResolvedValue(2);
    mockExerciseFind.mockReturnValue({
      sort: () => ({
        skip: () => ({
          limit: () => ({
            select: () => ({
              lean: () =>
                Promise.resolve([
                  { _id: makeObjectId('ex1'), title: 'Ex 1', tier: 1, type: 'js' },
                  { _id: makeObjectId('ex2'), title: 'Ex 2', tier: 2, type: 'js' },
                ]),
            }),
          }),
        }),
      }),
    });

    mockProgressFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { userId: makeObjectId('u1'), exerciseId: makeObjectId('ex1'), status: 'completed' },
          { userId: makeObjectId('u2'), exerciseId: makeObjectId('ex2'), status: 'in_progress' },
        ]),
    });

    const result = await getCohortHeatmap('c1');

    expect(result.students).toHaveLength(2);
    expect(result.exercises).toHaveLength(2);
    expect(result.students[0].cells).toHaveLength(2);
    expect(result.students[0].cells[0].status).toBe('completed');
    expect(result.students[0].cells[1].status).toBe('not_started');
    expect(result.students[1].cells[1].status).toBe('in_progress');
  });

  it('returns pagination metadata', async () => {
    mockUserFind.mockReturnValue({
      sort: () => ({ lean: () => Promise.resolve([]) }),
    });
    mockExerciseCountDocuments.mockResolvedValue(100);
    mockExerciseFind.mockReturnValue({
      sort: () => ({
        skip: () => ({
          limit: () => ({
            select: () => ({
              lean: () => Promise.resolve([]),
            }),
          }),
        }),
      }),
    });
    mockProgressFind.mockReturnValue({ lean: () => Promise.resolve([]) });

    const result = await getCohortHeatmap('c1', { page: 2, pageSize: 25 });

    expect(result.pagination.page).toBe(2);
    expect(result.pagination.pageSize).toBe(25);
    expect(result.pagination.totalExercises).toBe(100);
    expect(result.pagination.totalPages).toBe(4);
  });
});

// ─── Tests: getEngagementTimeline ────────────────────────────────────────────

describe('getEngagementTimeline', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns empty results for cohort with no students', async () => {
    mockUserFind.mockReturnValue({
      lean: () => Promise.resolve([]),
    });
    mockProgressAggregate.mockResolvedValue([]);

    const result = await getEngagementTimeline('c1', 7);

    expect(result.totalStudents).toBe(0);
    expect(result.atRiskStudents).toEqual([]);
    expect(result.dailyActivity).toEqual([]);
  });

  it('identifies students with no progress as at-risk', async () => {
    mockUserFind.mockReturnValue({
      lean: () =>
        Promise.resolve([
          { _id: makeObjectId('u1'), displayName: 'Alice' },
        ]),
    });
    // Daily activity aggregation
    mockProgressAggregate.mockResolvedValueOnce([]);
    // Per-student summary — no progress for u1
    mockProgressAggregate.mockResolvedValueOnce([]);

    const result = await getEngagementTimeline('c1', 7);

    expect(result.totalStudents).toBe(1);
    expect(result.atRiskStudents).toHaveLength(1);
    expect(result.atRiskStudents[0].displayName).toBe('Alice');
    expect(result.atRiskStudents[0].totalCompleted).toBe(0);
    expect(result.atRiskStudents[0].lastActivity).toBeNull();
  });

  it('returns daily activity summary', async () => {
    mockUserFind.mockReturnValue({
      lean: () =>
        Promise.resolve([{ _id: makeObjectId('u1'), displayName: 'Alice' }]),
    });
    mockProgressAggregate
      .mockResolvedValueOnce([
        {
          date: '2026-03-06',
          activeStudentCount: 1,
          exercisesAttempted: 5,
          exercisesCompleted: 3,
          totalTimeSpent: 1200000,
        },
      ])
      .mockResolvedValueOnce([
        { _id: makeObjectId('u1'), totalAttempted: 5, totalCompleted: 3, totalTimeSpent: 1200000, lastActivity: new Date() },
      ]);

    const result = await getEngagementTimeline('c1', 7);

    expect(result.dailyActivity).toHaveLength(1);
    expect(result.summary.totalCompletionsThisPeriod).toBe(3);
  });
});
