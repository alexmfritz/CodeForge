import { User } from '../models/User.js';
import { hashPassword } from '../services/authService.js';
import { generateUsername, ensureUniqueUsername } from '../services/userService.js';
import { config } from '../config.js';
import { logger } from '../logger.js';

export async function seedTA(): Promise<void> {
  if (!config.ta.name || !config.ta.docNumber) return;

  const existing = await User.findOne({ role: 'ta' });
  if (existing) return;

  const nameParts = config.ta.name.split(' ');
  const firstName = nameParts[0] || 'TA';
  const lastName = nameParts.slice(1).join(' ') || 'User';

  const baseUsername = generateUsername(firstName, lastName);
  const username = await ensureUniqueUsername(baseUsername);
  const passwordHash = await hashPassword(config.ta.docNumber);

  await User.create({
    username,
    passwordHash,
    role: 'ta',
    displayName: config.ta.name,
    docNumber: config.ta.docNumber,
    isActive: true,
    preferences: { theme: 'midnight' },
  });

  logger.info({ username }, 'TA account created');
}
