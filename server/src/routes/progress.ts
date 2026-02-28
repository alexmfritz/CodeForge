import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { saveCodeSchema, recordAttemptSchema, markCompleteSchema } from '@codeforge/shared/validation';
import {
  saveCode,
  recordAttempt,
  markComplete,
  resetProgress,
  viewSolution,
  getUserProgress,
  getUserStats,
} from '../services/progressService.js';

const router = Router();

// Bulk fetch all progress records so the client can hydrate its local state map
router.get('/', authenticate, async (req, res, next) => {
  try {
    const progress = await getUserProgress(req.user!.userId);
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
});

// Aggregated stats for the student dashboard (completion count, total score, etc.)
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const stats = await getUserStats(req.user!.userId);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
});

// Auto-save endpoint called on editor blur/interval — persists work-in-progress code
router.post('/:exerciseId/save', authenticate, validate(saveCodeSchema), async (req, res, next) => {
  try {
    // Fall back to userId as cohort when no cohort is assigned (solo learners)
    const cohortId = req.user!.cohortId ?? req.user!.userId;
    const progress = await saveCode(req.user!.userId, req.params.exerciseId as string, cohortId, req.body.code);
    res.json({ success: true, data: progress.toJSON() });
  } catch (err) {
    next(err);
  }
});

// Logs each test run; returns whether the code hash was a new unique attempt
router.post('/:exerciseId/attempt', authenticate, validate(recordAttemptSchema), async (req, res, next) => {
  try {
    const cohortId = req.user!.cohortId ?? req.user!.userId;
    const { progress, isUnique } = await recordAttempt(
      req.user!.userId,
      req.params.exerciseId as string,
      cohortId,
      req.body.codeHash,
      req.body.passed,
    );
    res.json({ success: true, data: { progress: progress.toJSON(), isUnique } });
  } catch (err) {
    next(err);
  }
});

// Finalizes the exercise — computes score based on attempts and solution usage
router.post('/:exerciseId/complete', authenticate, validate(markCompleteSchema), async (req, res, next) => {
  try {
    const cohortId = req.user!.cohortId ?? req.user!.userId;
    const progress = await markComplete(
      req.user!.userId,
      req.params.exerciseId as string,
      cohortId,
      req.body.attempts,
      req.body.solutionViewed,
    );
    res.json({ success: true, data: progress.toJSON() });
  } catch (err) {
    next(err);
  }
});

// Wipes all progress so the student can re-attempt from scratch
router.post('/:exerciseId/reset', authenticate, async (req, res, next) => {
  try {
    const progress = await resetProgress(req.user!.userId, req.params.exerciseId as string);
    res.json({ success: true, data: progress?.toJSON() ?? null });
  } catch (err) {
    next(err);
  }
});

// Records that the student peeked at the solution (affects final score penalty)
router.post('/:exerciseId/view-solution', authenticate, async (req, res, next) => {
  try {
    const cohortId = req.user!.cohortId ?? req.user!.userId;
    const progress = await viewSolution(req.user!.userId, req.params.exerciseId as string, cohortId);
    res.json({ success: true, data: progress.toJSON() });
  } catch (err) {
    next(err);
  }
});

export default router;
