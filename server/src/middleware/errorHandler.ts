import type { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('[Error]', err.message);

  if (err.name === 'ValidationError') {
    res.status(400).json({ success: false, error: err.message });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  res.status(500).json({ success: false, error: 'Internal server error' });
}
