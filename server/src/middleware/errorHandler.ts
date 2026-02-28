// Global Express error handler — maps known error types to HTTP status codes
import type { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('[Error]', err.message);

  // Mongoose/Zod validation failures -> 400
  if (err.name === 'ValidationError') {
    res.status(400).json({ success: false, error: err.message });
    return;
  }

  // JWT verification failures -> 401
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  // Unclassified errors -> 500 with generic message (no leak of internals)
  res.status(500).json({ success: false, error: 'Internal server error' });
}
