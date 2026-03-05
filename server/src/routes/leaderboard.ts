import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getLeaderboard, getHighlights } from '../services/leaderboardService.js';

const router = Router();

router.use(authenticate);

// GET /api/leaderboard?cohortId=xxx (optional — defaults to user's cohort)
router.get('/', async (req, res, next) => {
  try {
    const cohortId = (req.query.cohortId as string) || null;
    const userCohortId = req.user!.cohortId?.toString() ?? null;
    const entries = await getLeaderboard(cohortId, userCohortId);
    res.json({ success: true, data: entries });
  } catch (err) {
    next(err);
  }
});

// GET /api/leaderboard/highlights?cohortId=xxx
router.get('/highlights', async (req, res, next) => {
  try {
    const cohortId = (req.query.cohortId as string) || req.user!.cohortId?.toString() || null;
    const highlights = await getHighlights(cohortId);
    res.json({ success: true, data: highlights });
  } catch (err) {
    next(err);
  }
});

export default router;
