// Seed script — auto-creates the first instructor account on startup if none exists
import { User } from '../models/User.js';
import { hashPassword } from '../services/authService.js';
import { generateUsername, ensureUniqueUsername } from '../services/userService.js';
import { config } from '../config.js';

// seedInstructor: checks for an existing instructor; if none, creates one from env vars
export async function seedInstructor(): Promise<void> {
  const existing = await User.findOne({ role: 'instructor' });
  if (existing) return;

  // Parse instructor name from config and generate username using the standard convention
  const nameParts = config.instructor.name.split(' ');
  const firstName = nameParts[0] || 'Admin';
  const lastName = nameParts.slice(1).join(' ') || 'User';

  const baseUsername = generateUsername(firstName, lastName);
  const username = await ensureUniqueUsername(baseUsername);
  const passwordHash = await hashPassword(config.instructor.docNumber);

  await User.create({
    username,
    passwordHash,
    role: 'instructor',
    displayName: config.instructor.name,
    docNumber: config.instructor.docNumber,
    isActive: true,
    preferences: { theme: 'midnight' },
  });

  console.log(`Instructor account created: ${username}`);
}
