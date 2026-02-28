// Auth service — password hashing, JWT generation, and login flow
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { User } from '../models/User.js';
import type { JwtPayload } from '@codeforge/shared';

// bcrypt cost factor for password hashing
const SALT_ROUNDS = 10;

// Hash a plaintext password with bcrypt
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare a plaintext password against a bcrypt hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create a signed JWT with userId, role, and cohortId claims
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
}

// Login flow: find active user by username, verify password, update lastLogin, return JWT + user
export async function login(username: string, password: string) {
  const user = await User.findOne({ username: username.toLowerCase(), isActive: true });
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
    cohortId: user.cohortId?.toString() ?? null,
  });

  return { token, user: user.toJSON() };
}
