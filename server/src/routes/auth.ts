import { Router } from 'express';
import { login } from '../services/authService.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '@codeforge/shared/validation';
import { User } from '../models/User.js';
import { logger } from '../logger.js';

const router = Router();

router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password);
    if (!result) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error({ err }, 'Login failed');
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user || !user.isActive) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user.toJSON() });
  } catch (err) {
    logger.error({ err, path: req.path }, 'Failed to fetch user');
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

export default router;
