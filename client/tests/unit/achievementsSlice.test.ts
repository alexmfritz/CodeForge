import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  addNewlyEarned,
  showAchievementToast,
  dismissAchievementToast,
  fetchDefinitions,
  fetchMyAchievements,
  selectEarnedIds,
  selectEarnedMap,
  selectPendingToast,
} from '../../src/features/achievementsSlice';

// Stub localStorage for module initialization
beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeState(overrides = {}) {
  return {
    definitions: [],
    earned: [] as Array<{
      _id: string;
      userId: string;
      achievementId: string;
      cohortId: string;
      earnedAt: string;
      metadata: Record<string, unknown>;
      definition: {
        _id: string;
        name: string;
        description: string;
        icon: string;
        criteriaType: string;
        criteriaParams: Record<string, unknown>;
        isActive: boolean;
      };
    }>,
    loading: false,
    pendingToast: null as { _id: string; achievementId: string; name: string; description: string; icon: string; earnedAt: string } | null,
    ...overrides,
  };
}

function makeNewAchievement(overrides = {}) {
  return {
    _id: 'inst1',
    achievementId: 'a1',
    name: 'First Steps',
    description: 'Complete your first exercise',
    icon: '🏆',
    earnedAt: '2026-03-07T12:00:00Z',
    ...overrides,
  };
}

function makeEarnedInstance(overrides = {}) {
  return {
    _id: 'inst1',
    userId: 'u1',
    achievementId: 'a1',
    cohortId: 'c1',
    earnedAt: '2026-03-07T12:00:00Z',
    metadata: {},
    definition: {
      _id: 'a1',
      name: 'First Steps',
      description: 'Complete your first exercise',
      icon: '🏆',
      criteriaType: 'exercises_completed',
      criteriaParams: { count: 1 },
      isActive: true,
    },
    ...overrides,
  };
}

// ─── Reducers ────────────────────────────────────────────────────────────────

describe('achievementsSlice reducers', () => {
  describe('addNewlyEarned', () => {
    it('adds new achievement to earned array', () => {
      const state = makeState();
      const next = reducer(state, addNewlyEarned([makeNewAchievement()]));
      expect(next.earned).toHaveLength(1);
      expect(next.earned[0].achievementId).toBe('a1');
    });

    it('deduplicates by achievementId', () => {
      const state = makeState({
        earned: [makeEarnedInstance({ achievementId: 'a1' })],
      });
      const next = reducer(state, addNewlyEarned([
        makeNewAchievement({ achievementId: 'a1' }),
      ]));
      expect(next.earned).toHaveLength(1);
    });

    it('adds multiple non-duplicate achievements', () => {
      const state = makeState();
      const next = reducer(state, addNewlyEarned([
        makeNewAchievement({ _id: 'i1', achievementId: 'a1' }),
        makeNewAchievement({ _id: 'i2', achievementId: 'a2' }),
      ]));
      expect(next.earned).toHaveLength(2);
    });

    it('skips duplicates while adding new ones', () => {
      const state = makeState({
        earned: [makeEarnedInstance({ achievementId: 'a1' })],
      });
      const next = reducer(state, addNewlyEarned([
        makeNewAchievement({ _id: 'i1', achievementId: 'a1' }), // dup
        makeNewAchievement({ _id: 'i2', achievementId: 'a2' }), // new
      ]));
      expect(next.earned).toHaveLength(2);
    });
  });

  describe('showAchievementToast / dismissAchievementToast', () => {
    it('sets pendingToast', () => {
      const state = makeState();
      const achievement = makeNewAchievement();
      const next = reducer(state, showAchievementToast(achievement));
      expect(next.pendingToast).toEqual(achievement);
    });

    it('dismisses toast', () => {
      const state = makeState({ pendingToast: makeNewAchievement() });
      const next = reducer(state, dismissAchievementToast());
      expect(next.pendingToast).toBeNull();
    });
  });
});

// ─── Thunk extra reducers ────────────────────────────────────────────────────

describe('achievementsSlice thunk handlers', () => {
  describe('fetchDefinitions', () => {
    it('sets loading on pending', () => {
      const state = makeState();
      const next = reducer(state, { type: fetchDefinitions.pending.type });
      expect(next.loading).toBe(true);
    });

    it('populates definitions on fulfilled', () => {
      const state = makeState({ loading: true });
      const defs = [{ _id: 'd1', name: 'A1' }, { _id: 'd2', name: 'A2' }];
      const next = reducer(state, {
        type: fetchDefinitions.fulfilled.type,
        payload: defs,
      });
      expect(next.loading).toBe(false);
      expect(next.definitions).toEqual(defs);
    });

    it('resets loading on rejected', () => {
      const state = makeState({ loading: true });
      const next = reducer(state, { type: fetchDefinitions.rejected.type });
      expect(next.loading).toBe(false);
    });
  });

  describe('fetchMyAchievements', () => {
    it('populates earned on fulfilled', () => {
      const state = makeState({ loading: true });
      const earned = [makeEarnedInstance()];
      const next = reducer(state, {
        type: fetchMyAchievements.fulfilled.type,
        payload: earned,
      });
      expect(next.loading).toBe(false);
      expect(next.earned).toHaveLength(1);
    });
  });
});

// ─── Selectors ───────────────────────────────────────────────────────────────

describe('achievementsSlice selectors', () => {
  it('selectEarnedIds returns Set of achievementIds', () => {
    const root = {
      achievements: makeState({
        earned: [
          makeEarnedInstance({ achievementId: 'a1' }),
          makeEarnedInstance({ _id: 'i2', achievementId: 'a2' }),
        ],
      }),
    };
    const ids = selectEarnedIds(root as never);
    expect(ids).toBeInstanceOf(Set);
    expect(ids.has('a1')).toBe(true);
    expect(ids.has('a2')).toBe(true);
    expect(ids.has('a3')).toBe(false);
  });

  it('selectEarnedMap returns map keyed by achievementId', () => {
    const inst = makeEarnedInstance({ achievementId: 'a1' });
    const root = { achievements: makeState({ earned: [inst] }) };
    const map = selectEarnedMap(root as never);
    expect(map['a1']).toEqual(inst);
  });

  it('selectPendingToast returns pending toast', () => {
    const toast = makeNewAchievement();
    const root = { achievements: makeState({ pendingToast: toast }) };
    expect(selectPendingToast(root as never)).toEqual(toast);
  });

  it('selectPendingToast returns null when no toast', () => {
    const root = { achievements: makeState() };
    expect(selectPendingToast(root as never)).toBeNull();
  });
});
