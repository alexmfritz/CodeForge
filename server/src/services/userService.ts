import { User } from '../models/User.js';
import { hashPassword } from './authService.js';
import type { Role } from '@codeforge/shared';

export function generateUsername(firstName: string, lastName: string): string {
  const first = firstName.trim().toLowerCase();
  const last = lastName.trim().toLowerCase().replace(/\s+/g, '');
  return `${first.charAt(0)}${last}`;
}

export async function ensureUniqueUsername(baseUsername: string): Promise<string> {
  let username = baseUsername;
  let suffix = 1;
  while (await User.findOne({ username })) {
    username = `${baseUsername}${suffix}`;
    suffix++;
  }
  return username;
}

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

export async function resetPassword(userId: string) {
  const user = await User.findById(userId);
  if (!user) return null;

  const passwordHash = await hashPassword(user.docNumber);
  user.passwordHash = passwordHash;
  await user.save();

  return user.toJSON();
}
