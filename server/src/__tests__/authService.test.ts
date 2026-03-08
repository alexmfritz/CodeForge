import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

// Mock the User model
const mockFindOne = vi.fn();
const mockSave = vi.fn();
vi.mock('../models/User.js', () => ({
  User: { findOne: (...args: unknown[]) => mockFindOne(...args) },
}));

// Mock config
vi.mock('../config.js', () => ({
  config: {
    jwt: { secret: 'test-secret', expiresIn: '24h' },
  },
}));

import { hashPassword, verifyPassword, generateToken, login } from '../services/authService.js';

describe('hashPassword', () => {
  it('returns a bcrypt hash string', async () => {
    const hash = await hashPassword('password123');
    expect(hash).toMatch(/^\$2[aby]\$/);
    expect(hash.length).toBeGreaterThan(50);
  });

  it('produces different hashes for the same password', async () => {
    const hash1 = await hashPassword('password123');
    const hash2 = await hashPassword('password123');
    expect(hash1).not.toBe(hash2); // salt differs each time
  });
});

describe('verifyPassword', () => {
  it('returns true for matching password', async () => {
    const hash = await hashPassword('mypassword');
    const result = await verifyPassword('mypassword', hash);
    expect(result).toBe(true);
  });

  it('returns false for wrong password', async () => {
    const hash = await hashPassword('mypassword');
    const result = await verifyPassword('wrongpassword', hash);
    expect(result).toBe(false);
  });

  it('returns false for empty password against a hash', async () => {
    const hash = await hashPassword('mypassword');
    const result = await verifyPassword('', hash);
    expect(result).toBe(false);
  });
});

describe('generateToken', () => {
  it('generates a valid JWT with the correct payload', () => {
    const payload = { userId: 'user123', role: 'student' as const, cohortId: 'cohort456' };
    const token = generateToken(payload);

    const decoded = jwt.verify(token, 'test-secret') as jwt.JwtPayload;
    expect(decoded.userId).toBe('user123');
    expect(decoded.role).toBe('student');
    expect(decoded.cohortId).toBe('cohort456');
  });

  it('sets expiration on the token', () => {
    const payload = { userId: 'user123', role: 'instructor' as const, cohortId: null };
    const token = generateToken(payload);

    const decoded = jwt.verify(token, 'test-secret') as jwt.JwtPayload;
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  it('handles null cohortId', () => {
    const payload = { userId: 'user123', role: 'instructor' as const, cohortId: null };
    const token = generateToken(payload);

    const decoded = jwt.verify(token, 'test-secret') as jwt.JwtPayload;
    expect(decoded.cohortId).toBeNull();
  });
});

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns token and user on valid credentials', async () => {
    const hash = await hashPassword('password');
    const mockUser = {
      _id: { toString: () => 'user123' },
      username: 'jdoe',
      passwordHash: hash,
      role: 'student',
      cohortId: { toString: () => 'cohort456' },
      lastLogin: null as Date | null,
      save: mockSave,
      toJSON: () => ({ _id: 'user123', username: 'jdoe', role: 'student' }),
    };
    mockFindOne.mockResolvedValue(mockUser);
    mockSave.mockResolvedValue(undefined);

    const result = await login('jdoe', 'password');

    expect(result).not.toBeNull();
    expect(result!.token).toBeDefined();
    expect(result!.user.username).toBe('jdoe');
    expect(mockUser.lastLogin).toBeInstanceOf(Date);
    expect(mockSave).toHaveBeenCalled();
  });

  it('converts username to lowercase', async () => {
    mockFindOne.mockResolvedValue(null);

    await login('JDoe', 'password');

    expect(mockFindOne).toHaveBeenCalledWith({ username: 'jdoe', isActive: true });
  });

  it('returns null when user not found', async () => {
    mockFindOne.mockResolvedValue(null);

    const result = await login('nonexistent', 'password');
    expect(result).toBeNull();
  });

  it('returns null on wrong password', async () => {
    const hash = await hashPassword('correctpassword');
    mockFindOne.mockResolvedValue({
      _id: { toString: () => 'user123' },
      passwordHash: hash,
      role: 'student',
      cohortId: null,
      save: mockSave,
      toJSON: () => ({}),
    });

    const result = await login('jdoe', 'wrongpassword');
    expect(result).toBeNull();
    expect(mockSave).not.toHaveBeenCalled();
  });

  it('includes cohortId as null for instructor without cohort', async () => {
    const hash = await hashPassword('password');
    mockFindOne.mockResolvedValue({
      _id: { toString: () => 'inst1' },
      passwordHash: hash,
      role: 'instructor',
      cohortId: undefined,
      lastLogin: null,
      save: mockSave,
      toJSON: () => ({ _id: 'inst1', role: 'instructor' }),
    });
    mockSave.mockResolvedValue(undefined);

    const result = await login('admin', 'password');

    expect(result).not.toBeNull();
    const decoded = jwt.verify(result!.token, 'test-secret') as jwt.JwtPayload;
    expect(decoded.role).toBe('instructor');
    expect(decoded.cohortId).toBeNull();
  });
});
