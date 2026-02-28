// Zod validation middleware factory — validates req.body against a shared schema
import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // safeParse returns errors without throwing — lets us format a clean 400 response
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      res.status(400).json({ success: false, error: errors.join(', ') });
      return;
    }
    // Replace req.body with parsed output so downstream handlers get coerced/defaulted values
    req.body = result.data;
    next();
  };
}
