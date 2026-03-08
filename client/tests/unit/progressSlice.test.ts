import { describe, it, expect } from 'vitest';
import reducer, {
  recordLocalFailedAttempt,
  fetchProgress,
  saveSolution,
  recordAttempt,
  markComplete,
  resetExercise,
  viewSolution,
  selectProgress,
  selectIsComplete,
  selectSavedCode,
  selectIsDuplicateCode,
  selectUniqueAttempts,
  selectAttempts,
} from '../../src/features/progressSlice';
import type { Progress } from '@codeforge/shared';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeProgress(overrides: Partial<Progress> = {}): Progress {
  return {
    _id: 'p1',
    userId: 'u1',
    exerciseId: 'ex1',
    cohortId: 'c1',
    status: 'in_progress',
    currentCode: 'const x = 1;',
    attempts: 3,
    uniqueAttempts: 2,
    failedCodeHashes: [],
    solutionViewed: false,
    hintsViewed: 0,
    score: 0,
    totalTimeSpent: 0,
    ...overrides,
  } as Progress;
}

function makeState(items: Record<string, Progress> = {}) {
  return { items, loading: false };
}

function makeRootState(items: Record<string, Progress> = {}) {
  return { progress: makeState(items) } as { progress: { items: Record<string, Progress>; loading: boolean } };
}

// ─── Reducers ────────────────────────────────────────────────────────────────

describe('progressSlice reducers', () => {
  describe('recordLocalFailedAttempt', () => {
    it('adds hash and increments uniqueAttempts', () => {
      const state = makeState({ ex1: makeProgress({ exerciseId: 'ex1' }) });
      const next = reducer(state, recordLocalFailedAttempt({ exerciseId: 'ex1', code: 'bad code' }));
      expect(next.items['ex1'].failedCodeHashes).toHaveLength(1);
      expect(next.items['ex1'].uniqueAttempts).toBe(3); // was 2
    });

    it('detects duplicate code and does not increment', () => {
      const code = 'duplicate code';
      // Pre-compute the hash the same way the slice does
      let hash = 5381;
      for (let i = 0; i < code.length; i++) {
        hash = ((hash << 5) + hash + code.charCodeAt(i)) | 0;
      }
      const h = String(hash);

      const state = makeState({
        ex1: makeProgress({ exerciseId: 'ex1', failedCodeHashes: [h], uniqueAttempts: 3 }),
      });
      const next = reducer(state, recordLocalFailedAttempt({ exerciseId: 'ex1', code }));
      expect(next.items['ex1'].failedCodeHashes).toHaveLength(1);
      expect(next.items['ex1'].uniqueAttempts).toBe(3); // unchanged
    });

    it('is a no-op when exerciseId not in state', () => {
      const state = makeState({});
      const next = reducer(state, recordLocalFailedAttempt({ exerciseId: 'missing', code: 'x' }));
      expect(next.items).toEqual({});
    });

    it('trims whitespace before hashing', () => {
      const state = makeState({ ex1: makeProgress({ exerciseId: 'ex1' }) });
      const next1 = reducer(state, recordLocalFailedAttempt({ exerciseId: 'ex1', code: '  hello  ' }));
      const next2 = reducer(next1, recordLocalFailedAttempt({ exerciseId: 'ex1', code: 'hello' }));
      // Both should produce same hash since trim() is applied
      expect(next2.items['ex1'].failedCodeHashes).toHaveLength(1);
    });
  });
});

// ─── Thunk extra reducers ────────────────────────────────────────────────────

describe('progressSlice thunk handlers', () => {
  describe('fetchProgress', () => {
    it('sets loading on pending', () => {
      const state = makeState();
      const next = reducer(state, { type: fetchProgress.pending.type });
      expect(next.loading).toBe(true);
    });

    it('populates items map on fulfilled', () => {
      const state = makeState();
      const items = [
        makeProgress({ exerciseId: 'ex1' }),
        makeProgress({ exerciseId: 'ex2', _id: 'p2' }),
      ];
      const next = reducer(state, {
        type: fetchProgress.fulfilled.type,
        payload: items,
      });
      expect(next.loading).toBe(false);
      expect(Object.keys(next.items)).toHaveLength(2);
      expect(next.items['ex1']).toBeDefined();
      expect(next.items['ex2']).toBeDefined();
    });

    it('resets loading on rejected', () => {
      const state = { items: {}, loading: true };
      const next = reducer(state, { type: fetchProgress.rejected.type });
      expect(next.loading).toBe(false);
    });
  });

  describe('saveSolution', () => {
    it('updates item on fulfilled', () => {
      const state = makeState({ ex1: makeProgress() });
      const updated = makeProgress({ currentCode: 'new code' });
      const next = reducer(state, {
        type: saveSolution.fulfilled.type,
        payload: updated,
      });
      expect(next.items['ex1'].currentCode).toBe('new code');
    });
  });

  describe('recordAttempt', () => {
    it('updates progress from payload', () => {
      const state = makeState({ ex1: makeProgress() });
      const updated = makeProgress({ attempts: 5 });
      const next = reducer(state, {
        type: recordAttempt.fulfilled.type,
        payload: { progress: updated, isUnique: true },
      });
      expect(next.items['ex1'].attempts).toBe(5);
    });
  });

  describe('markComplete', () => {
    it('updates progress to completed', () => {
      const state = makeState({ ex1: makeProgress() });
      const completed = makeProgress({ status: 'completed', score: 100 });
      const next = reducer(state, {
        type: markComplete.fulfilled.type,
        payload: { progress: completed, newAchievements: [] },
      });
      expect(next.items['ex1'].status).toBe('completed');
      expect(next.items['ex1'].score).toBe(100);
    });
  });

  describe('resetExercise', () => {
    it('replaces progress when new progress returned', () => {
      const state = makeState({ ex1: makeProgress({ status: 'completed' }) });
      const reset = makeProgress({ status: 'in_progress', score: 0, attempts: 0 });
      const next = reducer(state, {
        type: resetExercise.fulfilled.type,
        payload: { exerciseId: 'ex1', progress: reset },
      });
      expect(next.items['ex1'].status).toBe('in_progress');
    });

    it('removes exercise when progress is null', () => {
      const state = makeState({ ex1: makeProgress() });
      const next = reducer(state, {
        type: resetExercise.fulfilled.type,
        payload: { exerciseId: 'ex1', progress: null },
      });
      expect(next.items['ex1']).toBeUndefined();
    });
  });

  describe('viewSolution', () => {
    it('updates progress with solution viewed', () => {
      const state = makeState({ ex1: makeProgress() });
      const updated = makeProgress({ solutionViewed: true });
      const next = reducer(state, {
        type: viewSolution.fulfilled.type,
        payload: updated,
      });
      expect(next.items['ex1'].solutionViewed).toBe(true);
    });
  });
});

// ─── Selectors ───────────────────────────────────────────────────────────────

describe('progressSlice selectors', () => {
  it('selectProgress returns the progress item', () => {
    const p = makeProgress();
    const root = makeRootState({ ex1: p });
    expect(selectProgress('ex1')(root as never)).toEqual(p);
  });

  it('selectProgress returns undefined for unknown exercise', () => {
    const root = makeRootState();
    expect(selectProgress('missing')(root as never)).toBeUndefined();
  });

  it('selectIsComplete returns true for completed', () => {
    const root = makeRootState({ ex1: makeProgress({ status: 'completed' }) });
    expect(selectIsComplete('ex1')(root as never)).toBe(true);
  });

  it('selectIsComplete returns false for in_progress', () => {
    const root = makeRootState({ ex1: makeProgress({ status: 'in_progress' }) });
    expect(selectIsComplete('ex1')(root as never)).toBe(false);
  });

  it('selectSavedCode returns current code', () => {
    const root = makeRootState({ ex1: makeProgress({ currentCode: 'saved' }) });
    expect(selectSavedCode('ex1')(root as never)).toBe('saved');
  });

  it('selectSavedCode returns null for unknown exercise', () => {
    const root = makeRootState();
    expect(selectSavedCode('missing')(root as never)).toBeNull();
  });

  it('selectUniqueAttempts returns count', () => {
    const root = makeRootState({ ex1: makeProgress({ uniqueAttempts: 7 }) });
    expect(selectUniqueAttempts('ex1')(root as never)).toBe(7);
  });

  it('selectAttempts returns count', () => {
    const root = makeRootState({ ex1: makeProgress({ attempts: 12 }) });
    expect(selectAttempts('ex1')(root as never)).toBe(12);
  });

  it('selectIsDuplicateCode detects known hash', () => {
    const code = 'test code';
    let hash = 5381;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) + hash + code.charCodeAt(i)) | 0;
    }
    const root = makeRootState({
      ex1: makeProgress({ failedCodeHashes: [String(hash)] }),
    });
    expect(selectIsDuplicateCode('ex1', code)(root as never)).toBe(true);
  });

  it('selectIsDuplicateCode returns false for new code', () => {
    const root = makeRootState({
      ex1: makeProgress({ failedCodeHashes: ['12345'] }),
    });
    expect(selectIsDuplicateCode('ex1', 'something new')(root as never)).toBe(false);
  });

  it('selectIsDuplicateCode returns false for unknown exercise', () => {
    const root = makeRootState();
    expect(selectIsDuplicateCode('missing', 'code')(root as never)).toBe(false);
  });
});
