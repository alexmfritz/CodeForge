import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getAllDefinitions, getUserAchievements } from '../services/achievementService.js';

const router = Router();

// Fetch all available achievement definitions
router.get('/', authenticate, async (_req, res, next) => {
  try {
    const definitions = await getAllDefinitions();
    res.json({ success: true, data: definitions });
  } catch (err) {
    next(err);
  }
});

// Fetch achievements earned by current user with full definitions
router.get('/mine', authenticate, async (req, res, next) => {
  try {
    const achievements = await getUserAchievements(req.user!.userId);
    res.json({ success: true, data: achievements });
  } catch (err) {
    next(err);
  }
});

export default router;
