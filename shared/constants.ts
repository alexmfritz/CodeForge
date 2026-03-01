import type { Tier, TierName, ExerciseType, Theme } from './types';

// ─── Tier Metadata ──────────────────────────────────────────────────────────

export const TIER_META: Record<
  Tier,
  { name: TierName; label: string; color: string; bgColor: string; borderColor: string }
> = {
  1: {
    name: 'spark',
    label: 'I',
    color: '#34d399',
    bgColor: 'rgba(52, 211, 153, 0.15)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  2: {
    name: 'foundations',
    label: 'II',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.15)',
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  3: {
    name: 'builder',
    label: 'III',
    color: '#818cf8',
    bgColor: 'rgba(129, 140, 248, 0.15)',
    borderColor: 'rgba(129, 140, 248, 0.4)',
  },
  4: {
    name: 'architect',
    label: 'IV',
    color: '#c084fc',
    bgColor: 'rgba(192, 132, 252, 0.15)',
    borderColor: 'rgba(192, 132, 252, 0.4)',
  },
  5: {
    name: 'mastercraft',
    label: 'V',
    color: '#f472b6',
    bgColor: 'rgba(244, 114, 182, 0.15)',
    borderColor: 'rgba(244, 114, 182, 0.4)',
  },
};

export const TIER_NAMES: Record<TierName, Tier> = {
  spark: 1,
  foundations: 2,
  builder: 3,
  architect: 4,
  mastercraft: 5,
};

// ─── Type Metadata ──────────────────────────────────────────────────────────

export const TYPE_META: Record<ExerciseType, { label: string; color: string }> = {
  js: { label: 'JS', color: '#facc15' },
  html: { label: 'HTML', color: '#f472b6' },
  css: { label: 'CSS', color: '#22d3ee' },
  'html-css': { label: 'HTML+CSS', color: '#a78bfa' },
};

// ─── Scoring ────────────────────────────────────────────────────────────────

export const BASE_POINTS: Record<Tier, number> = {
  1: 10,
  2: 25,
  3: 50,
  4: 100,
  5: 200,
};

export const ATTEMPT_MODIFIERS = [1.0, 0.9, 0.75, 0.5] as const;
export const SOLUTION_VIEWED_MODIFIER = 0.5;

export function calculateScore(
  tier: Tier,
  attempts: number,
  solutionViewed: boolean,
  basePointsOverride?: number,
): number {
  const base = basePointsOverride ?? BASE_POINTS[tier];
  const attemptIndex = Math.min(attempts - 1, ATTEMPT_MODIFIERS.length - 1);
  const attemptMod = ATTEMPT_MODIFIERS[Math.max(0, attemptIndex)];
  const solutionMod = solutionViewed ? SOLUTION_VIEWED_MODIFIER : 1.0;
  return Math.floor(base * attemptMod * solutionMod);
}

// ─── Hint Gates ─────────────────────────────────────────────────────────────

export const HINT_GATES = [3, 6] as const;
export const DEFAULT_SOLUTION_GATE = 10;

export function getHintsAvailable(uniqueAttempts: number, totalHints: number): number {
  let available = 0;
  for (const gate of HINT_GATES) {
    if (uniqueAttempts >= gate && available < totalHints) {
      available++;
    }
  }
  return available;
}

// ─── Roles ──────────────────────────────────────────────────────────────────

export const ROLES = ['instructor', 'ta', 'student'] as const;

// ─── Themes ─────────────────────────────────────────────────────────────────

export const THEMES: {
  id: Theme;
  name: string;
  scheme: 'dark' | 'light';
  accent: string;
}[] = [
  { id: 'midnight', name: 'Midnight', scheme: 'dark', accent: '#818cf8' },
  { id: 'daylight', name: 'Daylight', scheme: 'light', accent: '#6366f1' },
  { id: 'high-contrast', name: 'High Contrast', scheme: 'dark', accent: '#a5b4fc' },
  { id: 'monokai', name: 'Monokai', scheme: 'dark', accent: '#a6e22e' },
  { id: 'solarized-dark', name: 'Solarized Dark', scheme: 'dark', accent: '#268bd2' },
  { id: 'solarized-light', name: 'Solarized Light', scheme: 'light', accent: '#268bd2' },
  { id: 'nord', name: 'Nord', scheme: 'dark', accent: '#88c0d0' },
  { id: 'dracula', name: 'Dracula', scheme: 'dark', accent: '#bd93f9' },
];

export const DEFAULT_THEME: Theme = 'midnight';
