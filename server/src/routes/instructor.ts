import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getOverview,
  getStudentProgress,
  getCohortHeatmap,
  getExerciseDifficultyReport,
  getEngagementTimeline,
} from '../services/instructorService.js';
import { logger } from '../logger.js';

const router = Router();

router.use(authenticate);
router.use(authorize('instructor', 'ta'));

router.get('/overview', async (req, res) => {
  try {
    const cohortId = req.query.cohortId as string | undefined;
    const overview = await getOverview(cohortId);
    res.json({ success: true, data: overview });
  } catch (err) {
    logger.error({ err, path: req.path }, 'Failed to fetch overview');
    res.status(500).json({ success: false, error: 'Failed to fetch overview' });
  }
});

router.get('/students/:id/progress', async (req, res) => {
  try {
    const data = await getStudentProgress(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch student progress';
    const status = message === 'Student not found' ? 404 : 500;
    if (status === 500) logger.error({ err, path: req.path }, 'Failed to fetch student progress');
    res.status(status).json({ success: false, error: message });
  }
});

router.get('/cohort/:id/heatmap', async (req, res) => {
  try {
    const { tier, type, collectionId, page, pageSize } = req.query;
    const data = await getCohortHeatmap(req.params.id, {
      tier: tier ? Number(tier) : undefined,
      type: type as string | undefined,
      collectionId: collectionId as string | undefined,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 50,
    });
    res.json({ success: true, data });
  } catch (err) {
    logger.error({ err, path: req.path }, 'Failed to fetch heatmap data');
    res.status(500).json({ success: false, error: 'Failed to fetch heatmap data' });
  }
});

router.get('/analytics/difficulty', async (req, res) => {
  try {
    const { cohortId, tier, type, collectionId } = req.query;
    const data = await getExerciseDifficultyReport(
      cohortId as string | undefined,
      {
        tier: tier ? Number(tier) : undefined,
        type: type as string | undefined,
        collectionId: collectionId as string | undefined,
      },
    );
    res.json({ success: true, data });
  } catch (err) {
    logger.error({ err, path: req.path }, 'Failed to fetch difficulty report');
    res.status(500).json({ success: false, error: 'Failed to fetch difficulty report' });
  }
});

router.get('/analytics/engagement', async (req, res) => {
  try {
    const { cohortId, days } = req.query;
    const data = await getEngagementTimeline(
      cohortId as string | undefined,
      days ? Number(days) : 30,
    );
    res.json({ success: true, data });
  } catch (err) {
    logger.error({ err, path: req.path }, 'Failed to fetch engagement data');
    res.status(500).json({ success: false, error: 'Failed to fetch engagement data' });
  }
});

export default router;
