import type { Request, Response, NextFunction } from 'express';
import { logger } from '../logger.js';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err.name === 'ValidationError') {
    logger.warn({ err: err.message, path: req.path }, 'Validation error');
    res.status(400).json({ success: false, error: err.message });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    logger.warn({ path: req.path }, 'Unauthorized request');
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  logger.error({ err, path: req.path, method: req.method }, 'Unhandled server error');
  res.status(500).json({ success: false, error: 'Internal server error' });
}
