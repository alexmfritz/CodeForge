// Zod schemas — shared validation used by both server middleware and client forms
import { z } from 'zod';

// ─── Auth ───────────────────────────────────────────────────────────────────

// Auth: simple username/password (no email — offline DOC environment)
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// ─── Users ──────────────────────────────────────────────────────────────────

// User management — bulk create supports CSV-imported cohort rosters
export const createUserSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  docNumber: z.string().min(1).max(20),
  role: z.enum(['instructor', 'ta', 'student']),
  cohortId: z.string().optional(),
});

export const bulkCreateUsersSchema = z.object({
  users: z.array(
    z.object({
      firstName: z.string().min(1).max(50),
      lastName: z.string().min(1).max(50),
      docNumber: z.string().min(1).max(20),
    }),
  ),
  cohortId: z.string(),
});

// Partial update — students can change display name and theme preference
export const updateUserSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
  preferences: z
    .object({
      theme: z
        .enum([
          'midnight',
          'daylight',
          'high-contrast',
          'monokai',
          'solarized-dark',
          'solarized-light',
          'nord',
          'dracula',
        ])
        .optional(),
    })
    .optional(),
});

// ─── Cohorts ────────────────────────────────────────────────────────────────

// Cohort CRUD — date range defines the active enrollment window
export const createCohortSchema = z.object({
  name: z.string().min(1).max(100),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});

export const updateCohortSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

// ─── Exercises ──────────────────────────────────────────────────────────────

// Full exercise validation — testCases array is optional (JS exercises use testRunner instead)
export const createExerciseSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['js', 'html', 'css', 'html-css']),
  tier: z.number().int().min(1).max(5),
  category: z.array(z.string()),
  tags: z.array(z.string()),
  description: z.string().min(1),
  instructions: z.string().min(1),
  starterCode: z.string().default(''),
  solution: z.string().min(1),
  testRunner: z.string().default(''),
  testCases: z
    .array(
      z.object({
        query: z.string().optional(),
        assertion: z.enum([
          'exists',
          'textContains',
          'countAtLeast',
          'equals',
          'oneOf',
          'sourceContains',
          'sourceMatch',
          'hasId',
          'hasClass',
          'contains',
        ]),
        property: z.string().optional(),
        value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
        description: z.string(),
        flags: z.string().optional(),
      }),
    )
    .optional(),
  providedHtml: z.string().optional(),
  hints: z.array(z.string()).default([]),
  resources: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        description: z.string().optional(),
      }),
    )
    .default([]),
  solutionGate: z.number().int().positive().optional(),
  basePoints: z.number().int().positive().optional(),
  collectionId: z.string().optional(),
});

// ─── Progress ───────────────────────────────────────────────────────────────

// Progress endpoints — save drafts, record attempts (with code hash for uniqueness), mark complete
export const saveCodeSchema = z.object({
  code: z.string(),
});

export const recordAttemptSchema = z.object({
  codeHash: z.string(),
  passed: z.boolean(),
});

export const markCompleteSchema = z.object({
  attempts: z.number().int().positive(),
  solutionViewed: z.boolean(),
});

// ─── Assignments ────────────────────────────────────────────────────────────

// Assignments — instructor bundles exercises and optionally targets specific students
export const createAssignmentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  cohortId: z.string(),
  exerciseIds: z.array(z.string()).min(1),
  targetStudentIds: z.array(z.string()).optional(),
  dueDate: z.string().datetime().optional(),
});

// ─── Ratings ────────────────────────────────────────────────────────────────

// Post-completion 1-5 star rating per exercise
export const submitRatingSchema = z.object({
  exerciseId: z.string(),
  stars: z.number().int().min(1).max(5),
});
