import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getOverview, getStudentProgress, getCohortHeatmap } from '../services/instructorService.js';

const router = Router();

router.use(authenticate);
router.use(authorize('instructor', 'ta'));

router.get('/overview', async (req, res) => {
  try {
    const cohortId = req.query.cohortId as string | undefined;
    const overview = await getOverview(cohortId);
    res.json({ success: true, data: overview });
  } catch {
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
    res.status(status).json({ success: false, error: message });
  }
});

router.get('/cohort/:id/heatmap', async (req, res) => {
  try {
    const data = await getCohortHeatmap(req.params.id);
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch heatmap data' });
  }
});

export default router;
