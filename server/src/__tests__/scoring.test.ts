import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  getHintsAvailable,
  BASE_POINTS,
  ATTEMPT_MODIFIERS,
  SOLUTION_VIEWED_MODIFIER,
  HINT_GATES,
  DEFAULT_SOLUTION_GATE,
} from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';

// ─── calculateScore ──────────────────────────────────────────────────────────

describe('calculateScore', () => {
  it('returns full base points on first attempt without solution', () => {
    expect(calculateScore(1, 1, false)).toBe(10);
    expect(calculateScore(2, 1, false)).toBe(25);
    expect(calculateScore(3, 1, false)).toBe(50);
    expect(calculateScore(4, 1, false)).toBe(100);
    expect(calculateScore(5, 1, false)).toBe(200);
  });

  it('applies attempt modifiers correctly', () => {
    // Tier 3 (base 50): 1st=1.0, 2nd=0.9, 3rd=0.75, 4+=0.5
    expect(calculateScore(3, 1, false)).toBe(50);
    expect(calculateScore(3, 2, false)).toBe(45); // floor(50 * 0.9)
    expect(calculateScore(3, 3, false)).toBe(37); // floor(50 * 0.75)
    expect(calculateScore(3, 4, false)).toBe(25); // floor(50 * 0.5)
  });

  it('caps attempt modifier at 4+ attempts', () => {
    // 4th, 5th, 100th attempt all use 0.5 modifier
    expect(calculateScore(3, 4, false)).toBe(25);
    expect(calculateScore(3, 5, false)).toBe(25);
    expect(calculateScore(3, 100, false)).toBe(25);
  });

  it('applies solution viewed modifier (0.5x)', () => {
    expect(calculateScore(3, 1, true)).toBe(25); // floor(50 * 1.0 * 0.5)
    expect(calculateScore(3, 2, true)).toBe(22); // floor(50 * 0.9 * 0.5)
    expect(calculateScore(3, 3, true)).toBe(18); // floor(50 * 0.75 * 0.5)
    expect(calculateScore(3, 4, true)).toBe(12); // floor(50 * 0.5 * 0.5)
  });

  it('uses floor for fractional scores', () => {
    // Tier 2 (25), 2nd attempt, no solution: 25 * 0.9 = 22.5 → 22
    expect(calculateScore(2, 2, false)).toBe(22);
    // Tier 1 (10), 3rd attempt, solution: 10 * 0.75 * 0.5 = 3.75 → 3
    expect(calculateScore(1, 3, true)).toBe(3);
  });

  it('accepts basePointsOverride', () => {
    // Override tier 1 base from 10 to 50
    expect(calculateScore(1, 1, false, 50)).toBe(50);
    expect(calculateScore(1, 2, false, 50)).toBe(45);
    expect(calculateScore(1, 1, true, 50)).toBe(25);
  });

  it('handles edge case of 0 attempts gracefully', () => {
    // 0 attempts → clamped to index 0 → modifier 1.0
    const score = calculateScore(3, 0, false);
    expect(score).toBe(50);
  });

  it('handles negative attempts gracefully', () => {
    const score = calculateScore(3, -1, false);
    expect(score).toBe(50); // clamped by Math.max(0, ...)
  });

  it('scores all tiers with solution viewed at 4+ attempts', () => {
    // Worst-case scenario for each tier
    expect(calculateScore(1, 10, true)).toBe(2);   // floor(10 * 0.5 * 0.5)
    expect(calculateScore(2, 10, true)).toBe(6);   // floor(25 * 0.5 * 0.5)
    expect(calculateScore(3, 10, true)).toBe(12);  // floor(50 * 0.5 * 0.5)
    expect(calculateScore(4, 10, true)).toBe(25);  // floor(100 * 0.5 * 0.5)
    expect(calculateScore(5, 10, true)).toBe(50);  // floor(200 * 0.5 * 0.5)
  });
});

// ─── getHintsAvailable ───────────────────────────────────────────────────────

describe('getHintsAvailable', () => {
  it('returns 0 hints before reaching first gate', () => {
    expect(getHintsAvailable(0, 2)).toBe(0);
    expect(getHintsAvailable(1, 2)).toBe(0);
    expect(getHintsAvailable(2, 2)).toBe(0);
  });

  it('unlocks first hint at gate 1 (3 attempts)', () => {
    expect(getHintsAvailable(3, 2)).toBe(1);
    expect(getHintsAvailable(4, 2)).toBe(1);
    expect(getHintsAvailable(5, 2)).toBe(1);
  });

  it('unlocks second hint at gate 2 (6 attempts)', () => {
    expect(getHintsAvailable(6, 2)).toBe(2);
    expect(getHintsAvailable(10, 2)).toBe(2);
    expect(getHintsAvailable(100, 2)).toBe(2);
  });

  it('never exceeds totalHints even past all gates', () => {
    expect(getHintsAvailable(100, 1)).toBe(1);
    expect(getHintsAvailable(100, 0)).toBe(0);
  });

  it('returns 0 when exercise has no hints', () => {
    expect(getHintsAvailable(10, 0)).toBe(0);
  });
});

// ─── Constants sanity checks ─────────────────────────────────────────────────

describe('scoring constants', () => {
  it('BASE_POINTS covers all 5 tiers', () => {
    for (const tier of [1, 2, 3, 4, 5] as Tier[]) {
      expect(BASE_POINTS[tier]).toBeGreaterThan(0);
    }
  });

  it('BASE_POINTS increase with tier', () => {
    expect(BASE_POINTS[2]).toBeGreaterThan(BASE_POINTS[1]);
    expect(BASE_POINTS[3]).toBeGreaterThan(BASE_POINTS[2]);
    expect(BASE_POINTS[4]).toBeGreaterThan(BASE_POINTS[3]);
    expect(BASE_POINTS[5]).toBeGreaterThan(BASE_POINTS[4]);
  });

  it('ATTEMPT_MODIFIERS decrease', () => {
    for (let i = 1; i < ATTEMPT_MODIFIERS.length; i++) {
      expect(ATTEMPT_MODIFIERS[i]).toBeLessThan(ATTEMPT_MODIFIERS[i - 1]);
    }
  });

  it('SOLUTION_VIEWED_MODIFIER is 0.5', () => {
    expect(SOLUTION_VIEWED_MODIFIER).toBe(0.5);
  });

  it('HINT_GATES are [3, 6]', () => {
    expect([...HINT_GATES]).toEqual([3, 6]);
  });

  it('DEFAULT_SOLUTION_GATE is 10', () => {
    expect(DEFAULT_SOLUTION_GATE).toBe(10);
  });
});
