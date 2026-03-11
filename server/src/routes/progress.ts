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
import { checkAchievements } from '../services/achievementService.js';
import { maybeQueueReview } from '../services/reviewService.js';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const progress = await getUserProgress(req.user!.userId);
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
});

router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const stats = await getUserStats(req.user!.userId);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
});

router.post('/:exerciseId/save', authenticate, validate(saveCodeSchema), async (req, res, next) => {
  try {
    const cohortId = req.user!.cohortId ?? req.user!.userId;
    const progress = await saveCode(req.user!.userId, req.params.exerciseId as string, cohortId, req.body.code);
    res.json({ success: true, data: progress.toJSON() });
  } catch (err) {
    next(err);
  }
});

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
    const newAchievements = await checkAchievements(req.user!.userId, cohortId);
    const newReview = await maybeQueueReview(req.user!.userId, cohortId);
    res.json({ success: true, data: { ...progress.toJSON(), newAchievements, newReview: newReview?.toJSON() ?? null } });
  } catch (err) {
    next(err);
  }
});

router.post('/:exerciseId/reset', authenticate, async (req, res, next) => {
  try {
    const progress = await resetProgress(req.user!.userId, req.params.exerciseId as string);
    res.json({ success: true, data: progress?.toJSON() ?? null });
  } catch (err) {
    next(err);
  }
});

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
