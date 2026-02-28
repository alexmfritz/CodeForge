// Auth middleware — JWT verification and role-based authorization
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import type { JwtPayload, Role } from '@codeforge/shared';

// Augment Express Request to carry the decoded JWT payload on req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// authenticate: extracts Bearer token from Authorization header, verifies it, and attaches payload to req.user
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

// authorize: factory that returns middleware restricting access to the listed roles
export function authorize(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    next();
  };
}
