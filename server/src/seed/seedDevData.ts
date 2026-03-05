import mongoose from 'mongoose';
import crypto from 'crypto';
import { User } from '../models/User.js';
import { Exercise } from '../models/Exercise.js';
import { Cohort } from '../models/Cohort.js';
import { Progress } from '../models/Progress.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { ChatLog } from '../models/ChatLog.js';
import { Rating } from '../models/Rating.js';
import { AchievementDefinition } from '../models/AchievementDefinition.js';
import { AchievementInstance } from '../models/AchievementInstance.js';
import { Assignment } from '../models/Assignment.js';
import { hashPassword } from '../services/authService.js';
import { generateUsername, ensureUniqueUsername } from '../services/userService.js';
import { calculateScore } from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';

// ─── Helpers ────────────────────────────────────────────────────────────────

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function dateString(d: Date): string {
  return d.toISOString().split('T')[0];
}

// ─── Student Names ──────────────────────────────────────────────────────────

const STUDENT_NAMES: { first: string; last: string }[] = [
  { first: 'Alex', last: 'Fritz' },
  { first: 'Jane', last: 'Smith' },
  { first: 'Marcus', last: 'Johnson' },
  { first: 'Priya', last: 'Patel' },
  { first: 'David', last: 'Chen' },
  { first: 'Maria', last: 'Garcia' },
  { first: 'James', last: 'Williams' },
  { first: 'Aisha', last: 'Mohammed' },
  { first: 'Tyler', last: 'Brown' },
  { first: 'Sofia', last: 'Rodriguez' },
  { first: 'Liam', last: 'O\'Brien' },
  { first: 'Kenji', last: 'Tanaka' },
  { first: 'Zara', last: 'Hussein' },
  { first: 'Ethan', last: 'Davis' },
  { first: 'Aaliyah', last: 'Jackson' },
  { first: 'Noah', last: 'Miller' },
  { first: 'Mei', last: 'Lin' },
  { first: 'Jordan', last: 'Taylor' },
  { first: 'Fatima', last: 'Ali' },
  { first: 'Connor', last: 'Murphy' },
  { first: 'Destiny', last: 'Washington' },
  { first: 'Kai', last: 'Nakamura' },
  { first: 'Isabella', last: 'Martinez' },
  { first: 'Deshawn', last: 'Thomas' },
  { first: 'Olivia', last: 'Anderson' },
  { first: 'Raj', last: 'Sharma' },
  { first: 'Emma', last: 'Wilson' },
  { first: 'Carlos', last: 'Lopez' },
  { first: 'Hannah', last: 'Lee' },
  { first: 'Jamal', last: 'Robinson' },
  { first: 'Chloe', last: 'White' },
  { first: 'Yusuf', last: 'Khan' },
  { first: 'Samantha', last: 'Harris' },
  { first: 'Diego', last: 'Hernandez' },
  { first: 'Mia', last: 'Clark' },
  { first: 'Andre', last: 'Lewis' },
  { first: 'Grace', last: 'Hall' },
  { first: 'Omar', last: 'Hassan' },
  { first: 'Brooklyn', last: 'Young' },
  { first: 'Ryu', last: 'Kim' },
  { first: 'Ava', last: 'Scott' },
  { first: 'Tobias', last: 'Green' },
  { first: 'Luna', last: 'Adams' },
  { first: 'Mateo', last: 'Rivera' },
  { first: 'Nadia', last: 'Baker' },
  { first: 'Elijah', last: 'Nelson' },
  { first: 'Iris', last: 'Campbell' },
  { first: 'Victor', last: 'Flores' },
  { first: 'Aria', last: 'Mitchell' },
  { first: 'Sean', last: 'Carter' },
  { first: 'Leila', last: 'Nguyen' },
  { first: 'Derek', last: 'Perez' },
  { first: 'Naomi', last: 'Roberts' },
  { first: 'Ryan', last: 'Turner' },
  { first: 'Jasmine', last: 'Phillips' },
  { first: 'Caleb', last: 'Evans' },
  { first: 'Ruby', last: 'Torres' },
  { first: 'Maxwell', last: 'Collins' },
  { first: 'Stella', last: 'Stewart' },
  { first: 'Brandon', last: 'Reed' },
];

const THEMES = ['midnight', 'daylight', 'high-contrast', 'monokai', 'solarized-dark', 'solarized-light', 'nord', 'dracula'];

// ─── Chat Templates ─────────────────────────────────────────────────────────

const CHAT_TEXT = [
  'Hey everyone, how\'s the homework going?',
  'I\'m stuck on this loop exercise, any tips?',
  'Just finished the array section, feels good!',
  'Can someone explain what a callback function is?',
  'The CSS flexbox exercises are actually pretty fun',
  'Does anyone know when the next assignment is due?',
  'I keep getting undefined — what am I doing wrong?',
  'Pro tip: use console.log to debug your code step by step',
  'Made it through all the T1 exercises!',
  'The hint on exercise 15 really helped me understand scope',
  'Good morning everyone! Ready to code?',
  'I\'m having trouble with the border-radius exercise',
  'Just realized I was missing a semicolon for 20 minutes...',
  'Has anyone started the T2 exercises yet?',
  'The string methods section is really well organized',
  'I love how the tests give you instant feedback',
  'Can we get a study group going for the array methods?',
  'Finally understand the difference between let and const!',
  'Working on the comparison operators — these are tricky',
  'Great job everyone on this week\'s assignments!',
  'Remember: practice makes perfect. Keep at it!',
  'The grid layout exercise clicked for me today',
  'Anyone else find the object exercises challenging?',
  'Just hit my 10 exercise streak! No peeking at solutions',
  'Thanks for the help yesterday, I finally got it working',
  'The conditional exercises are my favorite so far',
  'How do you all organize your code? I\'m still learning good habits',
  'Don\'t forget to read the hints before viewing the solution',
  'Made the leaderboard! Feels awesome',
  'Who else is working through the HTML section?',
];

const CHAT_CODE_SNIPPETS = [
  { code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}', language: 'js' },
  { code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);', language: 'js' },
  { code: 'for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}', language: 'js' },
  { code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', language: 'css' },
  { code: 'const isEven = (n) => n % 2 === 0;\nconsole.log(isEven(4)); // true', language: 'js' },
];

const SYSTEM_MESSAGES = [
  'Welcome to the Morning 2026 Q1 cohort! Let\'s have a great quarter.',
  'Reminder: Assignment 2 is due Friday. Start early if you haven\'t already.',
  'Great participation this week everyone! Keep up the momentum.',
  'Office hours tomorrow from 10am-12pm. Bring your questions!',
  'New exercises have been added to the T2 section. Check them out!',
];

// ─── Archetypes ─────────────────────────────────────────────────────────────

type Archetype = 'star' | 'steady' | 'struggling' | 'disengaged' | 'dropped';

const ARCHETYPE_WEIGHTS: [Archetype, number][] = [
  ['star', 0.15],
  ['steady', 0.35],
  ['struggling', 0.30],
  ['disengaged', 0.15],
  ['dropped', 0.05],
];

function pickArchetype(): Archetype {
  const r = Math.random();
  let cumulative = 0;
  for (const [archetype, weight] of ARCHETYPE_WEIGHTS) {
    cumulative += weight;
    if (r < cumulative) return archetype;
  }
  return 'steady';
}

interface ArchetypeConfig {
  exercisePercent: [number, number]; // min%, max% of available exercises
  attempts: [number, number];
  hintProb: number;       // probability of viewing hints
  solutionProb: number;   // probability of viewing solution
  timeMs: [number, number]; // min, max totalTimeSpent in ms
  completionRate: number; // probability exercise is completed vs in_progress
}

const ARCHETYPE_CONFIG: Record<Archetype, ArchetypeConfig> = {
  star:        { exercisePercent: [70, 90], attempts: [1, 2], hintProb: 0.05, solutionProb: 0, timeMs: [60_000, 300_000], completionRate: 0.98 },
  steady:      { exercisePercent: [40, 65], attempts: [2, 4], hintProb: 0.25, solutionProb: 0.05, timeMs: [180_000, 600_000], completionRate: 0.90 },
  struggling:  { exercisePercent: [15, 35], attempts: [4, 8], hintProb: 0.60, solutionProb: 0.25, timeMs: [300_000, 1_200_000], completionRate: 0.75 },
  disengaged:  { exercisePercent: [2, 10], attempts: [1, 3], hintProb: 0.15, solutionProb: 0.10, timeMs: [60_000, 300_000], completionRate: 0.80 },
  dropped:     { exercisePercent: [0, 5], attempts: [1, 1], hintProb: 0.05, solutionProb: 0, timeMs: [30_000, 120_000], completionRate: 0.50 },
};

// ─── Core Seed Function ─────────────────────────────────────────────────────

export async function seedDevData(): Promise<void> {
  const userCount = await User.countDocuments();
  if (userCount > 5) {
    console.log(`Found ${userCount} users — dev data already seeded, skipping`);
    return;
  }

  console.log('Seeding dev data…');
  const startTime = Date.now();

  const cohorts = await createCohorts();
  const students = await createStudents(cohorts);
  const exercises = await Exercise.find({ isActive: true }).sort({ tier: 1, title: 1 }).lean();
  const progressRecords = await createProgress(students, exercises, cohorts);
  await createChatData(cohorts, students);
  await createRatings(students, progressRecords);
  await createAchievements(students, progressRecords, cohorts);
  await createExtraAssignments(cohorts, exercises);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Dev data seeded in ${elapsed}s`);
}

// ─── Cohorts ────────────────────────────────────────────────────────────────

interface CohortInfo {
  _id: mongoose.Types.ObjectId;
  name: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
}

async function createCohorts(): Promise<CohortInfo[]> {
  const cohortData = [
    { name: 'Morning 2025 Q3', isActive: false, startDate: new Date('2025-07-01'), endDate: new Date('2025-09-30') },
    { name: 'Afternoon 2025 Q4', isActive: false, startDate: new Date('2025-10-01'), endDate: new Date('2025-12-20') },
    { name: 'Morning 2026 Q1', isActive: true, startDate: new Date('2026-01-06'), endDate: null },
  ];

  const cohorts: CohortInfo[] = [];
  for (const data of cohortData) {
    const cohort = await Cohort.create(data);
    cohorts.push({ _id: cohort._id as mongoose.Types.ObjectId, ...data });
  }
  console.log(`  Created ${cohorts.length} cohorts`);
  return cohorts;
}

// ─── Students ───────────────────────────────────────────────────────────────

interface StudentInfo {
  _id: mongoose.Types.ObjectId;
  displayName: string;
  username: string;
  cohortId: mongoose.Types.ObjectId;
  cohortIndex: number;
  isActive: boolean;
  archetype: Archetype;
}

async function createStudents(cohorts: CohortInfo[]): Promise<StudentInfo[]> {
  const students: StudentInfo[] = [];
  const cohortStudentCounts = [20, 15, 20]; // Q3, Q4, Q1
  let nameIndex = 0;
  let docNum = 100001;

  for (let ci = 0; ci < cohorts.length; ci++) {
    const cohort = cohorts[ci];
    const count = cohortStudentCounts[ci];

    for (let i = 0; i < count; i++) {
      const name = STUDENT_NAMES[nameIndex % STUDENT_NAMES.length];
      nameIndex++;

      const baseUsername = generateUsername(name.first, name.last);
      const username = await ensureUniqueUsername(baseUsername);
      const docNumber = String(docNum++);
      const passwordHash = await hashPassword('password');

      // Only "dropped" archetype students are inactive — archived cohorts still have active student records
      const archetype = pickArchetype();
      const isActive = archetype !== 'dropped';

      const user = await User.create({
        username,
        passwordHash,
        role: 'student',
        displayName: `${name.first} ${name.last}`,
        docNumber,
        cohortId: cohort._id,
        isActive,
        preferences: {
          theme: pick(THEMES),
          leaderboardOptIn: Math.random() < 0.6,
        },
      });

      students.push({
        _id: user._id as mongoose.Types.ObjectId,
        displayName: `${name.first} ${name.last}`,
        username,
        cohortId: cohort._id,
        cohortIndex: ci,
        isActive,
        archetype,
      });
    }
  }

  console.log(`  Created ${students.length} students`);
  return students;
}

// ─── Progress ───────────────────────────────────────────────────────────────

interface ProgressInfo {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  cohortId: mongoose.Types.ObjectId;
  status: string;
  score: number;
  tier: number;
  solutionViewed: boolean;
  completedAt: Date | null;
}

async function createProgress(
  students: StudentInfo[],
  exercises: { _id: mongoose.Types.ObjectId; tier: number; type: string; basePoints: number; title: string }[],
  cohorts: CohortInfo[],
): Promise<ProgressInfo[]> {
  const allProgress: ProgressInfo[] = [];
  const bulkOps: Record<string, unknown>[] = [];

  // Group exercises by tier for ordered selection
  const byTier: Record<number, typeof exercises> = {};
  for (const ex of exercises) {
    if (!byTier[ex.tier]) byTier[ex.tier] = [];
    byTier[ex.tier].push(ex);
  }

  // Ordered exercise pool: T1 → T2 → T3 (students progress through tiers)
  const orderedExercises = [
    ...(byTier[1] || []),
    ...(byTier[2] || []),
    ...(byTier[3] || []),
  ];

  for (const student of students) {
    const config = ARCHETYPE_CONFIG[student.archetype];
    const cohort = cohorts[student.cohortIndex];

    // How many exercises this student attempts
    const percent = rand(config.exercisePercent[0], config.exercisePercent[1]);
    const count = Math.max(0, Math.floor((orderedExercises.length * percent) / 100));
    if (count === 0) continue;

    // Select first N exercises (students progress in order)
    const selectedExercises = orderedExercises.slice(0, count);

    // Generate timestamps spread across the cohort's active period
    const periodEnd = cohort.endDate || new Date();
    const periodStart = cohort.startDate;

    for (let i = 0; i < selectedExercises.length; i++) {
      const ex = selectedExercises[i];
      const attempts = rand(config.attempts[0], config.attempts[1]);
      const uniqueAttempts = Math.max(1, attempts - rand(0, Math.min(2, attempts - 1)));
      const hintsViewed = Math.random() < config.hintProb ? rand(1, 2) : 0;
      const solutionViewed = Math.random() < config.solutionProb;
      const isCompleted = Math.random() < config.completionRate;
      const status = isCompleted ? 'completed' : 'in_progress';

      const score = isCompleted
        ? calculateScore(ex.tier as Tier, uniqueAttempts, solutionViewed, ex.basePoints)
        : 0;

      const totalTimeSpent = rand(config.timeMs[0], config.timeMs[1]);

      // Spread timestamps chronologically across the cohort period
      const progressFraction = selectedExercises.length > 1 ? i / (selectedExercises.length - 1) : 0.5;
      const timeRange = periodEnd.getTime() - periodStart.getTime();
      const baseTime = periodStart.getTime() + timeRange * progressFraction;
      const jitter = rand(-86_400_000, 86_400_000); // ±1 day
      const firstAttemptAt = new Date(Math.max(periodStart.getTime(), Math.min(periodEnd.getTime(), baseTime + jitter)));
      const completedAt = isCompleted
        ? new Date(firstAttemptAt.getTime() + rand(60_000, totalTimeSpent * 2))
        : null;

      // Generate dummy failed code hashes
      const failedCodeHashes: string[] = [];
      for (let h = 0; h < Math.max(0, uniqueAttempts - (isCompleted ? 1 : 0)); h++) {
        failedCodeHashes.push(crypto.randomBytes(16).toString('hex'));
      }

      const doc = {
        userId: student._id,
        exerciseId: ex._id,
        cohortId: student.cohortId,
        status,
        currentCode: '',
        attempts,
        uniqueAttempts,
        failedCodeHashes,
        hintsViewed,
        solutionViewed,
        score,
        firstAttemptAt,
        completedAt,
        totalTimeSpent,
        updatedAt: completedAt || firstAttemptAt,
      };

      bulkOps.push(doc);
      allProgress.push({
        userId: student._id,
        exerciseId: ex._id,
        cohortId: student.cohortId,
        status,
        score,
        tier: ex.tier,
        solutionViewed,
        completedAt,
      });
    }
  }

  // Bulk insert for performance
  if (bulkOps.length > 0) {
    await Progress.insertMany(bulkOps, { ordered: false });
  }

  console.log(`  Created ${bulkOps.length} progress records`);
  return allProgress;
}

// ─── Chat Data ──────────────────────────────────────────────────────────────

async function createChatData(cohorts: CohortInfo[], students: StudentInfo[]): Promise<void> {
  const q1Cohort = cohorts[2]; // active cohort
  const q1Students = students.filter((s) => s.cohortIndex === 2 && s.isActive);
  const instructor = await User.findOne({ role: 'instructor' }).lean();
  if (!instructor || q1Students.length === 0) return;

  // Today's live messages (~200)
  const today = todayString();
  const messages: Record<string, unknown>[] = [];

  for (let i = 0; i < 200; i++) {
    const roll = Math.random();
    let msg: Record<string, unknown>;

    if (roll < 0.05) {
      // System message from instructor
      msg = {
        cohortId: q1Cohort._id,
        date: today,
        userId: instructor._id,
        username: instructor.username,
        displayName: instructor.displayName,
        role: 'instructor',
        messageType: 'system',
        content: pick(SYSTEM_MESSAGES),
        isPinned: i < 2, // first 2 system messages pinned
        createdAt: new Date(Date.now() - rand(0, 8 * 60 * 60 * 1000)), // within last 8 hours
      };
    } else if (roll < 0.15) {
      // Code snippet
      const student = pick(q1Students);
      const snippet = pick(CHAT_CODE_SNIPPETS);
      msg = {
        cohortId: q1Cohort._id,
        date: today,
        userId: student._id,
        username: student.username,
        displayName: student.displayName,
        role: 'student',
        messageType: 'code-snippet',
        content: 'Check out this code:',
        codeSnippet: snippet,
        createdAt: new Date(Date.now() - rand(0, 8 * 60 * 60 * 1000)),
      };
    } else if (roll < 0.25) {
      // Exercise link
      const student = pick(q1Students);
      const exercises = await Exercise.find({ isActive: true, tier: { $lte: 2 } }).limit(50).lean();
      const ex = pick(exercises);
      msg = {
        cohortId: q1Cohort._id,
        date: today,
        userId: student._id,
        username: student.username,
        displayName: student.displayName,
        role: 'student',
        messageType: 'exercise-link',
        content: `Working on this one:`,
        exerciseLink: { exerciseId: String(ex._id), title: ex.title, tier: ex.tier, type: ex.type },
        createdAt: new Date(Date.now() - rand(0, 8 * 60 * 60 * 1000)),
      };
    } else {
      // Text message
      const isInstructor = Math.random() < 0.1;
      const sender = isInstructor ? {
        _id: instructor._id,
        username: instructor.username,
        displayName: instructor.displayName,
        role: 'instructor',
      } : (() => {
        const s = pick(q1Students);
        return { _id: s._id, username: s.username, displayName: s.displayName, role: 'student' };
      })();

      // Occasionally mention another student
      const mentions: string[] = [];
      if (Math.random() < 0.1) {
        const mentioned = pick(q1Students);
        mentions.push(mentioned.username);
      }

      msg = {
        cohortId: q1Cohort._id,
        date: today,
        userId: sender._id,
        username: sender.username,
        displayName: sender.displayName,
        role: sender.role,
        messageType: 'text',
        content: pick(CHAT_TEXT),
        mentions,
        createdAt: new Date(Date.now() - rand(0, 8 * 60 * 60 * 1000)),
      };
    }

    // Add reactions to ~20% of messages
    if (Math.random() < 0.2) {
      const reactionEmojis: ('thumbs-up' | 'lightbulb' | 'checkmark')[] = ['thumbs-up', 'lightbulb', 'checkmark'];
      const reactors = q1Students.slice(0, rand(1, 4)).map((s) => s._id);
      msg.reactions = [{ emoji: pick(reactionEmojis), userIds: reactors }];
    }

    messages.push(msg);
  }

  await ChatMessage.insertMany(messages);
  console.log(`  Created ${messages.length} chat messages`);

  // Archived chat logs for all 3 cohorts
  let logCount = 0;
  const logCounts = [30, 20, 10]; // Q3, Q4, Q1

  for (let ci = 0; ci < cohorts.length; ci++) {
    const cohort = cohorts[ci];
    const cohortStudents = students.filter((s) => s.cohortIndex === ci);
    const numLogs = logCounts[ci];

    for (let d = 0; d < numLogs; d++) {
      const logDate = new Date(cohort.startDate.getTime() + (d * 2 + rand(0, 1)) * 86_400_000);
      const messageCount = rand(5, 25);
      const participants = cohortStudents.slice(0, rand(3, Math.min(10, cohortStudents.length)));

      const logMessages = [];
      for (let m = 0; m < messageCount; m++) {
        const sender = pick(participants);
        logMessages.push({
          userId: sender._id,
          username: sender.username,
          displayName: sender.displayName,
          role: 'student',
          messageType: 'text',
          content: pick(CHAT_TEXT),
          createdAt: new Date(logDate.getTime() + rand(0, 8 * 60 * 60 * 1000)),
        });
      }

      await ChatLog.create({
        cohortId: cohort._id,
        date: dateString(logDate),
        messages: logMessages,
        messageCount,
        participants: participants.map((p) => p._id),
        archivedAt: new Date(logDate.getTime() + 24 * 60 * 60 * 1000),
      });
      logCount++;
    }
  }

  console.log(`  Created ${logCount} archived chat logs`);
}

// ─── Ratings ────────────────────────────────────────────────────────────────

async function createRatings(students: StudentInfo[], progress: ProgressInfo[]): Promise<void> {
  const completedProgress = progress.filter((p) => p.status === 'completed');
  const ratingDocs: Record<string, unknown>[] = [];
  const seen = new Set<string>();

  for (const p of completedProgress) {
    if (Math.random() > 0.3) continue; // ~30% rate their exercises
    const key = `${String(p.userId)}_${String(p.exerciseId)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // Higher tiers get slightly lower ratings on average
    const tierPenalty = (p.tier - 1) * 0.3;
    const baseStar = 4.2 - tierPenalty + (Math.random() - 0.5) * 2;
    const stars = Math.max(1, Math.min(5, Math.round(baseStar)));

    ratingDocs.push({
      userId: p.userId,
      exerciseId: p.exerciseId,
      cohortId: p.cohortId,
      stars,
    });
  }

  if (ratingDocs.length > 0) {
    await Rating.insertMany(ratingDocs, { ordered: false });
  }
  console.log(`  Created ${ratingDocs.length} ratings`);
}

// ─── Achievements ───────────────────────────────────────────────────────────

async function createAchievements(
  students: StudentInfo[],
  progress: ProgressInfo[],
  cohorts: CohortInfo[],
): Promise<void> {
  const definitions = await AchievementDefinition.find({ isActive: true }).lean();
  if (definitions.length === 0) return;

  const defByName = new Map(definitions.map((d) => [d.name, d]));
  const instanceDocs: Record<string, unknown>[] = [];

  // Pre-compute per-student stats
  for (const student of students) {
    const studentProgress = progress.filter((p) => String(p.userId) === String(student._id) && p.status === 'completed');
    const completedCount = studentProgress.length;
    if (completedCount === 0) continue;

    const jsCount = studentProgress.filter((p) => p.tier <= 3).length; // approximation — all are JS
    const perfectCount = studentProgress.filter((p) => p.score > 0 && !p.solutionViewed).length;
    const latestCompletion = studentProgress.reduce((latest, p) =>
      p.completedAt && (!latest || p.completedAt > latest) ? p.completedAt : latest,
      null as Date | null,
    );

    const checks: [string, boolean][] = [
      ['First Spark', completedCount >= 1],
      ['Getting Started', completedCount >= 5],
      ['Double Digits', completedCount >= 10],
      ['Quarter Century', completedCount >= 25],
      ['Century Club', completedCount >= 100],
      ['JavaScript Journeyman', jsCount >= 50],
      ['Perfect Ten', perfectCount >= 10],
      ['No Peeking', perfectCount >= 10],
    ];

    for (const [name, earned] of checks) {
      if (!earned) continue;
      const def = defByName.get(name);
      if (!def) continue;

      instanceDocs.push({
        userId: student._id,
        achievementId: def._id,
        cohortId: student.cohortId,
        earnedAt: latestCompletion || new Date(),
        metadata: {},
      });
    }
  }

  if (instanceDocs.length > 0) {
    await AchievementInstance.insertMany(instanceDocs, { ordered: false });
  }
  console.log(`  Created ${instanceDocs.length} achievement instances`);
}

// ─── Extra Assignments ──────────────────────────────────────────────────────

async function createExtraAssignments(
  cohorts: CohortInfo[],
  exercises: { _id: mongoose.Types.ObjectId; tier: number; title: string }[],
): Promise<void> {
  const instructor = await User.findOne({ role: 'instructor' }).lean();
  if (!instructor) return;

  const t1Exercises = exercises.filter((e) => e.tier === 1).slice(0, 15);
  const t2Exercises = exercises.filter((e) => e.tier === 2).slice(0, 8);

  const assignments = [];

  // Past-due assignment for Q3 (archived cohort)
  if (cohorts[0] && t1Exercises.length > 0) {
    assignments.push({
      title: 'Q3 Week 4 — HTML & CSS Basics',
      description: 'Complete these foundational exercises covering HTML structure and CSS styling.',
      cohortId: cohorts[0]._id,
      exerciseIds: t1Exercises.slice(0, 10).map((e) => e._id),
      dueDate: new Date('2025-08-01'),
      isActive: true,
      createdBy: instructor._id,
    });
  }

  // In-progress assignment for Q1 (active cohort)
  if (cohorts[2] && t2Exercises.length > 0) {
    assignments.push({
      title: 'Week 8 — Array & String Methods',
      description: 'Practice array manipulation and string methods. Focus on understanding the return values.',
      cohortId: cohorts[2]._id,
      exerciseIds: t2Exercises.map((e) => e._id),
      dueDate: new Date(Date.now() + 5 * 86_400_000),
      isActive: true,
      createdBy: instructor._id,
    });
  }

  if (assignments.length > 0) {
    await Assignment.insertMany(assignments);
  }
  console.log(`  Created ${assignments.length} extra assignments`);
}
