import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, { logout, clearError, login, fetchMe, updatePreferences } from '../../src/features/authSlice';

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Stub localStorage for module initialization
beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
});

function makeState(overrides = {}) {
  return {
    user: null,
    token: null,
    loading: false,
    error: null,
    ...overrides,
  };
}

const mockUser = {
  _id: 'u1',
  userId: 'u1',
  username: 'alice',
  displayName: 'Alice',
  role: 'student' as const,
  isActive: true,
  cohortId: 'c1',
  preferences: {},
};

// ─── Reducers ────────────────────────────────────────────────────────────────

describe('authSlice reducers', () => {
  describe('logout', () => {
    it('clears user, token, and error', () => {
      const state = makeState({ user: mockUser, token: 'abc', error: 'old error' });
      const next = reducer(state, logout());
      expect(next.user).toBeNull();
      expect(next.token).toBeNull();
      expect(next.error).toBeNull();
    });
  });

  describe('clearError', () => {
    it('nulls the error field', () => {
      const state = makeState({ error: 'something went wrong' });
      const next = reducer(state, clearError());
      expect(next.error).toBeNull();
    });

    it('is a no-op when error is already null', () => {
      const state = makeState({ error: null });
      const next = reducer(state, clearError());
      expect(next.error).toBeNull();
    });
  });
});

// ─── Thunk extra reducers ────────────────────────────────────────────────────

describe('authSlice thunk handlers', () => {
  describe('login', () => {
    it('sets loading on pending', () => {
      const state = makeState({ error: 'old error' });
      const next = reducer(state, { type: login.pending.type });
      expect(next.loading).toBe(true);
      expect(next.error).toBeNull();
    });

    it('sets user and token on fulfilled', () => {
      const state = makeState({ loading: true });
      const next = reducer(state, {
        type: login.fulfilled.type,
        payload: { user: mockUser, token: 'tok123' },
      });
      expect(next.loading).toBe(false);
      expect(next.user).toEqual(mockUser);
      expect(next.token).toBe('tok123');
    });

    it('sets error on rejected', () => {
      const state = makeState({ loading: true });
      const next = reducer(state, {
        type: login.rejected.type,
        payload: 'Invalid credentials',
      });
      expect(next.loading).toBe(false);
      expect(next.error).toBe('Invalid credentials');
    });
  });

  describe('fetchMe', () => {
    it('sets loading on pending', () => {
      const state = makeState();
      const next = reducer(state, { type: fetchMe.pending.type });
      expect(next.loading).toBe(true);
    });

    it('sets user on fulfilled', () => {
      const state = makeState({ loading: true, token: 'tok' });
      const next = reducer(state, {
        type: fetchMe.fulfilled.type,
        payload: mockUser,
      });
      expect(next.loading).toBe(false);
      expect(next.user).toEqual(mockUser);
    });

    it('clears user and token on rejected', () => {
      const state = makeState({ loading: true, user: mockUser, token: 'tok' });
      const next = reducer(state, { type: fetchMe.rejected.type });
      expect(next.loading).toBe(false);
      expect(next.user).toBeNull();
      expect(next.token).toBeNull();
    });
  });

  describe('updatePreferences', () => {
    it('updates user on fulfilled', () => {
      const state = makeState({ user: mockUser });
      const updatedUser = { ...mockUser, preferences: { theme: 'dark' } };
      const next = reducer(state, {
        type: updatePreferences.fulfilled.type,
        payload: updatedUser,
      });
      expect(next.user).toEqual(updatedUser);
    });

    it('sets error on rejected', () => {
      const state = makeState({ user: mockUser });
      const next = reducer(state, {
        type: updatePreferences.rejected.type,
        payload: 'Update failed',
      });
      expect(next.error).toBe('Update failed');
    });
  });
});
