import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Setup ──────────────────────────────────────────────────────────────

const mockUserFindOne = vi.fn();
const mockUserCreate = vi.fn();
const mockUserFindById = vi.fn();
vi.mock('../models/User.js', () => ({
  User: {
    findOne: (...args: unknown[]) => mockUserFindOne(...args),
    create: (...args: unknown[]) => mockUserCreate(...args),
    findById: (...args: unknown[]) => mockUserFindById(...args),
  },
}));

const mockHashPassword = vi.fn();
vi.mock('../services/authService.js', () => ({
  hashPassword: (...args: unknown[]) => mockHashPassword(...args),
}));

vi.mock('../config.js', () => ({
  config: { jwt: { secret: 'test', expiresIn: '24h' } },
}));

import { generateUsername, ensureUniqueUsername, createUser, bulkCreateUsers, resetPassword } from '../services/userService.js';

// ─── Tests: generateUsername ─────────────────────────────────────────────────

describe('generateUsername', () => {
  it('generates from first initial + last name', () => {
    expect(generateUsername('John', 'Doe')).toBe('jdoe');
  });

  it('lowercases everything', () => {
    expect(generateUsername('Alice', 'SMITH')).toBe('asmith');
  });

  it('handles names with spaces in last name', () => {
    expect(generateUsername('Mary', 'Van Buren')).toBe('mvanburen');
  });

  it('trims whitespace', () => {
    expect(generateUsername('  Bob  ', '  Jones  ')).toBe('bjones');
  });

  it('handles special characters like apostrophes', () => {
    expect(generateUsername('Sean', "O'Connor")).toBe("so'connor");
  });
});

// ─── Tests: ensureUniqueUsername ──────────────────────────────────────────────

describe('ensureUniqueUsername', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns base username when no collision', async () => {
    mockUserFindOne.mockResolvedValue(null);
    const result = await ensureUniqueUsername('jdoe');
    expect(result).toBe('jdoe');
  });

  it('appends suffix on collision', async () => {
    mockUserFindOne
      .mockResolvedValueOnce({ username: 'jdoe' }) // collision
      .mockResolvedValueOnce(null); // jdoe1 is free

    const result = await ensureUniqueUsername('jdoe');
    expect(result).toBe('jdoe1');
  });

  it('increments suffix until unique', async () => {
    mockUserFindOne
      .mockResolvedValueOnce({ username: 'jdoe' }) // jdoe taken
      .mockResolvedValueOnce({ username: 'jdoe1' }) // jdoe1 taken
      .mockResolvedValueOnce({ username: 'jdoe2' }) // jdoe2 taken
      .mockResolvedValueOnce(null); // jdoe3 free

    const result = await ensureUniqueUsername('jdoe');
    expect(result).toBe('jdoe3');
  });
});

// ─── Tests: createUser ───────────────────────────────────────────────────────

describe('createUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('creates user with generated username and hashed password', async () => {
    mockUserFindOne.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue('hashed123');
    const created = {
      username: 'jdoe',
      displayName: 'John Doe',
      role: 'student',
      toJSON: () => ({ username: 'jdoe', displayName: 'John Doe', role: 'student' }),
    };
    mockUserCreate.mockResolvedValue(created);

    const result = await createUser({
      firstName: 'John',
      lastName: 'Doe',
      docNumber: '12345',
      role: 'student',
      cohortId: 'c1',
    });

    expect(mockHashPassword).toHaveBeenCalledWith('12345');
    expect(mockUserCreate).toHaveBeenCalledOnce();
    const createArg = mockUserCreate.mock.calls[0][0];
    expect(createArg.username).toBe('jdoe');
    expect(createArg.passwordHash).toBe('hashed123');
    expect(createArg.displayName).toBe('John Doe');
    expect(createArg.cohortId).toBe('c1');
    expect(result.username).toBe('jdoe');
  });

  it('sets cohortId to null when not provided', async () => {
    mockUserFindOne.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue('hashed');
    mockUserCreate.mockResolvedValue({
      toJSON: () => ({ cohortId: null }),
    });

    await createUser({
      firstName: 'Test',
      lastName: 'User',
      docNumber: '000',
      role: 'student',
    });

    const createArg = mockUserCreate.mock.calls[0][0];
    expect(createArg.cohortId).toBeNull();
  });
});

// ─── Tests: bulkCreateUsers ──────────────────────────────────────────────────

describe('bulkCreateUsers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('creates multiple users in sequence', async () => {
    mockUserFindOne.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue('hashed');
    let callCount = 0;
    mockUserCreate.mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        toJSON: () => ({ _id: `u${callCount}`, username: `user${callCount}` }),
      });
    });

    const result = await bulkCreateUsers(
      [
        { firstName: 'Alice', lastName: 'A', docNumber: '001' },
        { firstName: 'Bob', lastName: 'B', docNumber: '002' },
      ],
      'c1',
    );

    expect(result).toHaveLength(2);
    expect(mockUserCreate).toHaveBeenCalledTimes(2);
  });
});

// ─── Tests: resetPassword ────────────────────────────────────────────────────

describe('resetPassword', () => {
  beforeEach(() => vi.clearAllMocks());

  it('resets password using docNumber', async () => {
    const mockSave = vi.fn();
    mockUserFindById.mockResolvedValue({
      _id: 'u1',
      docNumber: '12345',
      passwordHash: 'old',
      save: mockSave,
      toJSON: () => ({ _id: 'u1' }),
    });
    mockHashPassword.mockResolvedValue('newhash');

    const result = await resetPassword('u1');

    expect(mockHashPassword).toHaveBeenCalledWith('12345');
    expect(mockSave).toHaveBeenCalledOnce();
    expect(result).toEqual({ _id: 'u1' });
  });

  it('returns null when user not found', async () => {
    mockUserFindById.mockResolvedValue(null);
    const result = await resetPassword('missing');
    expect(result).toBeNull();
  });
});
