// Canonical domain types — shared between client and server (single source of truth)
// ─── Exercise Types ────────────────────────────────────────────────────────────

// Supported exercise languages and difficulty tiers (1=spark through 5=mastercraft)
export type ExerciseType = 'js' | 'html' | 'css' | 'html-css';
export type Tier = 1 | 2 | 3 | 4 | 5;
export type TierName = 'spark' | 'foundations' | 'builder' | 'architect' | 'mastercraft';

// Declarative test case shape — used by both JS (Web Worker) and HTML/CSS (iframe) runners
export interface TestCase {
  query?: string;
  assertion:
    | 'exists'
    | 'textContains'
    | 'countAtLeast'
    | 'equals'
    | 'oneOf'
    | 'sourceContains'
    | 'sourceMatch'
    | 'hasId'
    | 'hasClass'
    | 'contains';
  property?: string;
  value?: string | number | string[];
  description: string;
  flags?: string;
}

export interface Resource {
  label: string;
  url: string;
  description?: string;
}

// Full exercise document — mirrors the MongoDB Exercise collection schema
export interface Exercise {
  _id: string;
  legacyId?: number;
  title: string;
  slug: string;
  type: ExerciseType;
  tier: Tier;
  category: string[];
  tags: string[];
  description: string;
  instructions: string;
  starterCode: string;
  solution: string;
  testRunner: string;
  testCases?: TestCase[];
  providedHtml?: string;
  hints: string[];
  resources: Resource[];
  solutionGate?: number;
  basePoints: number;
  collectionId?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Category / Collection ──────────────────────────────────────────────────

// Nested category tree and ordered collection groupings for browse UI
export interface Category {
  label: string;
  icon?: string;
  color?: string;
  children?: Record<string, Category>;
}

export interface Collection {
  _id: string;
  slug: string;
  name: string;
  description: string;
  exerciseIds: string[];
  isDefault?: boolean;
  hidden?: boolean;
  color?: string;
  source?: string;
  license?: string;
  attribution?: string;
  order: number;
}

export interface ExercisesData {
  categories: Record<string, Category>;
  collections: Collection[];
  exercises: Exercise[];
}

// ─── Auth & Users ───────────────────────────────────────────────────────────

// RBAC roles — instructor can CRUD everything, ta can view progress, student is default
export type Role = 'instructor' | 'ta' | 'student';

export interface User {
  _id: string;
  username: string;
  role: Role;
  displayName: string;
  docNumber: string;
  cohortId?: string;
  isActive: boolean;
  lastLogin?: string;
  preferences: {
    theme: Theme;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Cohort {
  _id: string;
  name: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Progress ───────────────────────────────────────────────────────────────

// Per-exercise progress tracking — one Progress doc per (user, exercise, cohort) triple
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface Progress {
  _id: string;
  userId: string;
  exerciseId: string;
  cohortId: string;
  status: ProgressStatus;
  currentCode: string;
  attempts: number;
  uniqueAttempts: number;
  failedCodeHashes: string[];
  hintsViewed: number;
  solutionViewed: boolean;
  score: number;
  firstAttemptAt?: string;
  completedAt?: string;
  totalTimeSpent: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Assignments ────────────────────────────────────────────────────────────

// Instructor-created exercise bundles assigned to a cohort (optionally targeted to specific students)
export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  cohortId: string;
  exerciseIds: string[];
  targetStudentIds?: string[];
  dueDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Achievements ───────────────────────────────────────────────────────────

// Gamification: badge definitions and per-user earned instances
export interface AchievementDefinition {
  _id: string;
  name: string;
  description: string;
  icon: string;
  criteriaType: string;
  criteriaParams: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementInstance {
  _id: string;
  userId: string;
  achievementId: string;
  cohortId: string;
  earnedAt: string;
  metadata: Record<string, unknown>;
}

// ─── Ratings ────────────────────────────────────────────────────────────────

// 1-5 star exercise ratings — one per (user, exercise, cohort)
export interface Rating {
  _id: string;
  userId: string;
  exerciseId: string;
  cohortId: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Test Results ───────────────────────────────────────────────────────────

// Shape returned from test runners to the UI after each submission attempt
export interface TestResult {
  pass: boolean;
  description: string;
  got?: unknown;
}

// ─── UI Types ───────────────────────────────────────────────────────────────

// Client-side UI state types — themes, sort options, toast notifications
export type Theme =
  | 'midnight'
  | 'daylight'
  | 'high-contrast'
  | 'monokai'
  | 'solarized-dark'
  | 'solarized-light'
  | 'nord'
  | 'dracula';

export type StatusSort = 'default' | 'in-progress-first' | 'not-started-first' | 'completed-first';

export interface Toast {
  message: string;
  type: 'error' | 'success' | 'warning' | 'celebration';
}

// ─── API Types ──────────────────────────────────────────────────────────────

// Standardized API envelope and JWT auth payload shapes
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

// JWT payload structure — attached to req.user by auth middleware
export interface JwtPayload {
  userId: string;
  role: Role;
  cohortId: string | null;
}
