// User service — credential generation and user CRUD
import { User } from '../models/User.js';
import { hashPassword } from './authService.js';
import type { Role } from '@codeforge/shared';

// Username convention: first initial + full last name, e.g. "Jane Doe" -> "jdoe"
export function generateUsername(firstName: string, lastName: string): string {
  const first = firstName.trim().toLowerCase();
  const last = lastName.trim().toLowerCase().replace(/\s+/g, '');
  return `${first.charAt(0)}${last}`;
}

// Append numeric suffix if the generated username already exists (jdoe, jdoe1, jdoe2, ...)
export async function ensureUniqueUsername(baseUsername: string): Promise<string> {
  let username = baseUsername;
  let suffix = 1;
  while (await User.findOne({ username })) {
    username = `${baseUsername}${suffix}`;
    suffix++;
  }
  return username;
}

// Create a single user; default password is the DOC number (hashed)
export async function createUser(data: {
  firstName: string;
  lastName: string;
  docNumber: string;
  role: Role;
  cohortId?: string;
}) {
  const baseUsername = generateUsername(data.firstName, data.lastName);
  const username = await ensureUniqueUsername(baseUsername);
  const passwordHash = await hashPassword(data.docNumber);

  const user = await User.create({
    username,
    passwordHash,
    role: data.role,
    displayName: `${data.firstName.trim()} ${data.lastName.trim()}`,
    docNumber: data.docNumber,
    cohortId: data.cohortId || null,
    isActive: true,
    preferences: { theme: 'midnight' },
  });

  return user.toJSON();
}

// Bulk-create students for a given cohort (iterates to handle unique username generation)
export async function bulkCreateUsers(
  users: { firstName: string; lastName: string; docNumber: string }[],
  cohortId: string,
) {
  const results = [];
  for (const userData of users) {
    const user = await createUser({
      ...userData,
      role: 'student',
      cohortId,
    });
    results.push(user);
  }
  return results;
}

// Reset password back to the user's DOC number (instructor-initiated)
export async function resetPassword(userId: string) {
  const user = await User.findById(userId);
  if (!user) return null;

  const passwordHash = await hashPassword(user.docNumber);
  user.passwordHash = passwordHash;
  await user.save();

  return user.toJSON();
}
