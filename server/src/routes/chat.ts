import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getArchivedLogs, getArchivedLog, deleteArchivedLog } from '../services/chatService.js';

const router = Router();
router.use(authenticate);

// GET /api/chat/logs/:cohortId — list archived logs for a cohort
router.get('/logs/:cohortId', async (req, res, next) => {
  try {
    if (req.query.page) {
      const page = Math.max(1, Number(req.query.page) || 1);
      const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 25));
      const result = await getArchivedLogs(req.params.cohortId, { page, pageSize }) as { items: unknown[]; page: number; pageSize: number; totalItems: number; totalPages: number };
      res.json({ success: true, data: result.items, pagination: { page: result.page, pageSize: result.pageSize, totalItems: result.totalItems, totalPages: result.totalPages } });
    } else {
      const logs = await getArchivedLogs(req.params.cohortId);
      res.json({ success: true, data: logs });
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/chat/logs/detail/:logId — get a single archived log with messages
router.get('/logs/detail/:logId', async (req, res, next) => {
  try {
    const log = await getArchivedLog(req.params.logId);
    if (!log) {
      res.status(404).json({ success: false, error: 'Log not found' });
      return;
    }
    res.json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/chat/logs/:logId — delete an archived log (instructor only)
router.delete('/logs/:logId', authorize('instructor'), async (req, res, next) => {
  try {
    const result = await deleteArchivedLog(req.params.logId as string);
    if (!result) {
      res.status(404).json({ success: false, error: 'Log not found' });
      return;
    }
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    next(err);
  }
});

export default router;
