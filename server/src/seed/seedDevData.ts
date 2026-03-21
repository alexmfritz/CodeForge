import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Exercise } from '../models/Exercise.js';
import { Cohort } from '../models/Cohort.js';
import { Progress } from '../models/Progress.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { ChatLog } from '../models/ChatLog.js';
import { Rating } from '../models/Rating.js';
import { Assignment } from '../models/Assignment.js';
import { Collection } from '../models/Collection.js';
import { hashPassword } from '../services/authService.js';
import { generateUsername, ensureUniqueUsername } from '../services/userService.js';
import { checkAchievements } from '../services/achievementService.js';
import { calculateScore } from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';
import { logger } from '../logger.js';

// ─── Seeded PRNG (mulberry32) ───────────────────────────────────────────────
// Same seed = same data every time. The demo always looks exactly right.

const SEED = 0xC0DEF06E;

function createRng(seed: number) {
  let s = seed;

  function random(): number {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function rand(min: number, max: number): number {
    return Math.floor(random() * (max - min + 1)) + min;
  }

  function pick<T>(arr: T[]): T {
    return arr[Math.floor(random() * arr.length)];
  }

  function chance(prob: number): boolean {
    return random() < prob;
  }

  function hex32(): string {
    let h = '';
    for (let i = 0; i < 32; i++) h += rand(0, 15).toString(16);
    return h;
  }

  return { random, rand, pick, chance, hex32 };
}

type Rng = ReturnType<typeof createRng>;

// ─── Time Helpers ───────────────────────────────────────────────────────────

function getClassDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const d = new Date(start);
  d.setHours(0, 0, 0, 0);
  const endNorm = new Date(end);
  endNorm.setHours(23, 59, 59, 999);
  while (d <= endNorm) {
    if (d.getDay() >= 1 && d.getDay() <= 5) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function classroomTime(day: Date, rng: Rng): Date {
  const result = new Date(day);
  result.setHours(rng.rand(8, 14), rng.rand(0, 59), rng.rand(0, 59), 0);
  return result;
}

function todayString(): string {
  // Must match chatService's getTodayDateString — use configured timezone
  return new Date().toLocaleDateString('en-CA', { timeZone: process.env.TIMEZONE || 'America/Los_Angeles' });
}

function dateString(d: Date): string {
  return d.toLocaleDateString('en-CA', { timeZone: process.env.TIMEZONE || 'America/Los_Angeles' });
}

// ─── Student Names ──────────────────────────────────────────────────────────
// Heroes are at known indices: 0=Jane, 1=Marcus, 2=Priya, 3=David, 4=Maria,
// 5=James, 6=Aisha, 7=Tyler, 8=Sofia. Heroes use 0,1,2,7,8.

const STUDENT_NAMES: { first: string; last: string }[] = [
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
];

const THEMES = ['midnight', 'daylight', 'high-contrast', 'monokai', 'solarized-dark', 'solarized-light', 'nord', 'dracula'];

// ─── Hero Students ──────────────────────────────────────────────────────────
// These students always go in the active Q1 cohort with deterministic behavior.

type HeroType = 'growth' | 'star' | 'explorer' | 'at-risk' | 'perfectionist';

interface HeroConfig {
  nameIndex: number;
  heroType: HeroType;
  leaderboardOptIn: boolean;
  theme: string;
}

const HERO_CONFIGS: HeroConfig[] = [
  { nameIndex: 0, heroType: 'growth', leaderboardOptIn: true, theme: 'midnight' },           // Jane Smith
  { nameIndex: 1, heroType: 'star', leaderboardOptIn: true, theme: 'dracula' },               // Marcus Johnson
  { nameIndex: 2, heroType: 'explorer', leaderboardOptIn: true, theme: 'nord' },              // Priya Patel
  { nameIndex: 7, heroType: 'at-risk', leaderboardOptIn: false, theme: 'monokai' },           // Tyler Brown
  { nameIndex: 8, heroType: 'perfectionist', leaderboardOptIn: true, theme: 'solarized-dark' }, // Sofia Rodriguez
];

const HERO_NAME_INDICES = new Set(HERO_CONFIGS.map((h) => h.nameIndex));

// ─── Archetypes ─────────────────────────────────────────────────────────────

type Archetype = 'star' | 'steady' | 'struggling' | 'disengaged' | 'dropped';

// Deterministic sequence: ~14% star, ~34% steady, ~28% struggling, ~14% disengaged, ~6% dropped
const ARCHETYPE_SEQUENCE: Archetype[] = [
  'star', 'steady', 'struggling', 'steady', 'steady', 'struggling', 'disengaged', 'steady', 'struggling', 'steady',
  'steady', 'star', 'disengaged', 'struggling', 'dropped', 'steady', 'steady', 'struggling', 'steady', 'star',
  'struggling', 'steady', 'disengaged', 'steady', 'struggling', 'steady', 'star', 'steady', 'struggling', 'dropped',
  'steady', 'struggling', 'steady', 'disengaged', 'steady', 'star', 'steady', 'struggling', 'steady', 'steady',
  'disengaged', 'struggling', 'steady', 'steady', 'struggling', 'steady', 'star', 'dropped', 'steady', 'struggling',
];

interface ArchetypeConfig {
  exercisePercent: [number, number];
  attempts: [number, number];
  hintProb: number;
  solutionProb: number;
  timeMs: [number, number];
  completionRate: number;
}

const ARCHETYPE_CONFIG: Record<Archetype, ArchetypeConfig> = {
  star:        { exercisePercent: [70, 90], attempts: [1, 2], hintProb: 0.05, solutionProb: 0, timeMs: [60_000, 300_000], completionRate: 0.98 },
  steady:      { exercisePercent: [40, 65], attempts: [2, 4], hintProb: 0.25, solutionProb: 0.05, timeMs: [180_000, 600_000], completionRate: 0.90 },
  struggling:  { exercisePercent: [15, 35], attempts: [4, 8], hintProb: 0.60, solutionProb: 0.25, timeMs: [300_000, 1_200_000], completionRate: 0.75 },
  disengaged:  { exercisePercent: [2, 10], attempts: [1, 3], hintProb: 0.15, solutionProb: 0.10, timeMs: [60_000, 300_000], completionRate: 0.80 },
  dropped:     { exercisePercent: [0, 5], attempts: [1, 1], hintProb: 0.05, solutionProb: 0, timeMs: [30_000, 120_000], completionRate: 0.50 },
};

// ─── Chat Content ───────────────────────────────────────────────────────────
// Organized by phase (weeks 1-3, 4-7, 8+) with Q&A pairs and standalone messages.

interface QAPair { question: string; answer: string }
interface CodeSnip { text: string; code: string; language: string }

interface ChatPhase {
  qa: QAPair[];
  solo: string[];
  instructor: string[];
  codeSnippets: CodeSnip[];
}

const CHAT_PHASES: Record<string, ChatPhase> = {
  early: {
    qa: [
      { question: 'How do I run the tests?', answer: 'Hit the green "Run Tests" button below the editor. It shows which tests pass and fail.' },
      { question: 'What\'s the difference between a <div> and a <span>?', answer: 'A div is block-level so it takes the full width. A span is inline — it only wraps its content.' },
      { question: 'Do I need to memorize all the HTML tags?', answer: 'Not at all! Focus on the common ones. The resources tab has links if you need to look something up.' },
      { question: 'How do I add a class to an element?', answer: 'Use the class attribute: <div class="my-class">. Then style it in CSS with .my-class { }' },
      { question: 'My CSS isn\'t working. The color won\'t change.', answer: 'Check your selector — make sure it matches the element. Also check for typos in the property name.' },
      { question: 'What does "semantic HTML" mean?', answer: 'It means using tags that describe their content — like <nav> for navigation instead of <div> for everything.' },
      { question: 'Is it okay to look at the hints?', answer: 'Absolutely! That\'s what they\'re there for. Try on your own first, then use hints if you get stuck.' },
    ],
    solo: [
      'Just finished my first exercise! Small win but it feels good.',
      'The color-coded test results make it really clear what\'s passing.',
      'HTML is starting to make sense. It\'s like building blocks.',
      'I didn\'t know websites were made with just text files. That\'s wild.',
      'Finally got my CSS selector right after three tries.',
      'Loving the midnight theme. Easy on the eyes.',
      'Just hit 5 exercises completed!',
      'This is way more fun than I expected.',
      'Reminder to myself: don\'t forget the closing tag!',
      'The Spark tier exercises are great for building the basics.',
    ],
    instructor: [
      'Welcome to the first week! Take your time with the T1 exercises — they\'re designed to build your foundation.',
      'Great participation today! Understanding is more important than speed.',
      'If you\'re stuck, use the hints first. They nudge you without giving the answer away.',
      'I\'m seeing great progress from everyone. Keep it up!',
      'Tomorrow we\'ll start CSS layout. Make sure you\'ve finished the HTML basics.',
    ],
    codeSnippets: [
      { text: 'Got this working:', code: '<h1>Hello World</h1>\n<p>My first web page!</p>', language: 'html' },
      { text: 'CSS selectors make sense now:', code: '.container {\n  background-color: lightblue;\n  padding: 20px;\n}', language: 'css' },
    ],
  },
  mid: {
    qa: [
      { question: 'What\'s the difference between let and const?', answer: 'const can\'t be reassigned after declaration. let can. Use const by default, let when you need to change the value.' },
      { question: 'Why does my function return undefined?', answer: 'You probably forgot the return statement! A function returns undefined by default.' },
      { question: 'How does flexbox centering work?', answer: 'Set display: flex on the parent, then justify-content: center and align-items: center.' },
      { question: 'When do I use === vs ==?', answer: 'Always use ===. It checks both value AND type. == does type coercion which causes weird bugs.' },
      { question: 'What\'s the point of template literals?', answer: 'They let you embed variables directly: `Hello ${name}` instead of "Hello " + name. Way cleaner.' },
      { question: 'Can someone explain what a boolean is?', answer: 'It\'s just true or false. Think of it like a light switch — on or off.' },
    ],
    solo: [
      'Just realized I was missing a semicolon for 20 minutes...',
      'Flexbox finally clicked!',
      'The comparison operators exercise was tricky but I got through it.',
      'Starting to feel more confident with JavaScript.',
      'I love how the tests give instant feedback.',
      'Made it through all the T1 exercises! Moving to T2.',
      'Working on loops today. The for loop syntax is a lot to remember.',
      'Pro tip: read the error messages carefully. They tell you what\'s wrong.',
      'The string methods section is really well organized.',
      'Finished 50 exercises! Halfway to 100.',
    ],
    instructor: [
      'Great work on the CSS layout exercises! Flexbox is one of the most useful tools you\'ll learn.',
      'Starting JavaScript this week. Variables are just containers for data.',
      'I\'m seeing some of you helping each other — that\'s exactly what this chat is for.',
      'If T2 is challenging, go back and review T1. A strong foundation matters.',
      'Office hours today from 10-12. Bring your questions!',
    ],
    codeSnippets: [
      { text: 'Template literals are so clean:', code: 'const name = "Alex";\nconst greeting = `Hello, ${name}!`;\nconsole.log(greeting);', language: 'js' },
      { text: 'Here\'s how I think about loops:', code: 'for (let i = 0; i < 5; i++) {\n  console.log(`Step ${i + 1}`);\n}', language: 'js' },
      { text: 'Flexbox centering in one snippet:', code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', language: 'css' },
    ],
  },
  late: {
    qa: [
      { question: 'Can someone explain how reduce works? I keep getting NaN.', answer: 'Set the initial value as the second argument: array.reduce((acc, num) => acc + num, 0)' },
      { question: 'What\'s the difference between map and forEach?', answer: 'map returns a new array with transformed values. forEach just loops and returns undefined.' },
      { question: 'How do you chain array methods?', answer: 'Each method returns an array: arr.filter(x => x > 0).map(x => x * 2)' },
      { question: 'When should I use arrow functions vs regular?', answer: 'Arrow functions are great for short callbacks. Regular functions when you need this binding or hoisting.' },
      { question: 'What\'s destructuring?', answer: 'Pulling values out of arrays/objects: const { name, age } = person; or const [first, second] = array;' },
      { question: 'How do closures work?', answer: 'A closure is when a function remembers variables from its parent scope even after the parent finishes.' },
      { question: 'What\'s the spread operator for?', answer: 'It spreads contents: [...arr1, ...arr2] merges arrays. { ...obj, newProp: val } copies and extends objects.' },
    ],
    solo: [
      'The callback methods section is challenging but rewarding.',
      'Just finished a reduce exercise without any hints! Progress.',
      'Array methods are my new favorite thing. So much cleaner than for loops.',
      'Made the leaderboard! All that practice is paying off.',
      'The T3 exercises are a real step up. No more hand-holding.',
      'Just chained filter, map, and reduce in one line. Felt like a wizard.',
      'Working through error handling. Try/catch makes so much sense now.',
      'Hit my 10 exercise streak with no solution peeks!',
      'The RPG Questline collection is really creative.',
      'Started the Pop Culture APIs collection — working with data is fun.',
      'Helping others understand map/filter reinforces my own understanding.',
      'Almost at 100 exercises completed!',
    ],
    instructor: [
      'Excellent work this week! I can see real improvement in everyone\'s code quality.',
      'Reading code is just as important as writing it. Take time to understand solutions.',
      'T3 exercises expect you to figure out the approach. That builds problem-solving skills.',
      'If you\'ve finished the default exercises, try the collections for extra practice.',
      'Great collaboration in the chat today. Keep supporting each other!',
    ],
    codeSnippets: [
      { text: 'Reduce example:', code: 'const total = [10, 20, 30].reduce(\n  (sum, num) => sum + num,\n  0\n);\n// total = 60', language: 'js' },
      { text: 'Chaining is powerful:', code: 'const result = students\n  .filter(s => s.grade >= 70)\n  .map(s => s.name)\n  .sort();', language: 'js' },
      { text: 'Destructuring:', code: 'const { name, age, ...rest } = person;\nconst [first, ...others] = items;', language: 'js' },
    ],
  },
};

const SYSTEM_MESSAGES = [
  'Welcome to the Morning 2026 Q1 cohort! Let\'s have a great quarter.',
  'Reminder: check the Assignments tab for this week\'s exercises.',
  'New exercises added to the collections. Check them out!',
  'Great participation this week! Keep up the momentum.',
  'Office hours tomorrow from 10am-12pm. Bring your questions!',
];

// ─── Core Seed Function ─────────────────────────────────────────────────────

export async function seedDevData(): Promise<void> {
  const userCount = await User.countDocuments();
  if (userCount > 5) {
    logger.info({ userCount }, 'Dev data already seeded — skipping');
    return;
  }

  logger.info('Seeding dev data');
  const startTime = Date.now();
  const rng = createRng(SEED);

  const cohorts = await createCohorts();
  const tas = await createTAs(cohorts, rng);
  const students = await createStudents(cohorts, rng);
  const exercises = await Exercise.find({ isActive: true }).sort({ tier: 1, title: 1 }).lean();
  const progressRecords = await createProgress(students, exercises, cohorts, rng);
  await seedTASolutions(tas, exercises, cohorts);
  await createChatData(cohorts, students, rng);
  await createRatings(students, progressRecords, rng);
  await createAchievements(students);
  await createExtraAssignments(cohorts, exercises);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  logger.info({ elapsed: `${elapsed}s` }, 'Dev data seeded');
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
    { name: 'Staff', isActive: false, startDate: new Date('2026-01-01'), endDate: null },
  ];

  const cohorts: CohortInfo[] = [];
  for (const data of cohortData) {
    const cohort = await Cohort.create(data);
    cohorts.push({ _id: cohort._id as mongoose.Types.ObjectId, ...data });
  }
  logger.info({ count: cohorts.length }, 'Created cohorts');
  return cohorts;
}

// ─── TA Accounts ────────────────────────────────────────────────────────────

interface TAInfo {
  _id: mongoose.Types.ObjectId;
  displayName: string;
  username: string;
  cohortId: mongoose.Types.ObjectId;
}

const TA_ACCOUNTS = [
  { first: 'Matthew', last: 'Wellington', docNumber: 'TA0001' },
  { first: 'Alex', last: 'Fritz', docNumber: 'TA0002' },
];

async function createTAs(cohorts: CohortInfo[], _rng: Rng): Promise<TAInfo[]> {
  const staffCohort = cohorts[3]; // Staff cohort
  const tas: TAInfo[] = [];

  for (const ta of TA_ACCOUNTS) {
    const baseUsername = generateUsername(ta.first, ta.last);

    // Check if this TA already exists (e.g., created by seedTA from ENV)
    const existing = await User.findOne({ username: baseUsername, role: 'ta' });
    if (existing) {
      // Ensure they have a cohortId for progress records
      if (!existing.cohortId) {
        await User.updateOne({ _id: existing._id }, { cohortId: staffCohort._id });
      }
      tas.push({
        _id: existing._id as mongoose.Types.ObjectId,
        displayName: existing.displayName,
        username: existing.username,
        cohortId: staffCohort._id,
      });
      continue;
    }

    const username = await ensureUniqueUsername(baseUsername);
    const passwordHash = await hashPassword('password');
    const user = await User.create({
      username,
      passwordHash,
      role: 'ta',
      displayName: `${ta.first} ${ta.last}`,
      docNumber: ta.docNumber,
      cohortId: staffCohort._id,
      isActive: true,
      preferences: { theme: 'midnight' },
    });

    tas.push({
      _id: user._id as mongoose.Types.ObjectId,
      displayName: `${ta.first} ${ta.last}`,
      username,
      cohortId: staffCohort._id,
    });
  }

  logger.info({ count: tas.length }, 'Created TA accounts');
  return tas;
}

async function seedTASolutions(
  tas: TAInfo[],
  exercises: { _id: mongoose.Types.ObjectId; tier: number; basePoints: number; solution: string }[],
  cohorts: CohortInfo[],
): Promise<void> {
  if (tas.length === 0) return;

  const staffCohort = cohorts[3];
  const bulkOps: Record<string, unknown>[] = [];
  const completedAt = new Date('2026-01-05T12:00:00Z'); // day before Q1 starts

  for (const ta of tas) {
    for (const ex of exercises) {
      const score = calculateScore(ex.tier as Tier, 1, false, ex.basePoints);
      bulkOps.push({
        userId: ta._id,
        exerciseId: ex._id,
        cohortId: staffCohort._id,
        status: 'completed',
        currentCode: ex.solution,
        attempts: 1,
        uniqueAttempts: 1,
        failedCodeHashes: [],
        hintsViewed: 0,
        solutionViewed: false,
        score,
        firstAttemptAt: completedAt,
        completedAt,
        totalTimeSpent: 120_000,
        updatedAt: completedAt,
      });
    }
  }

  if (bulkOps.length > 0) {
    await Progress.insertMany(bulkOps, { ordered: false });
  }
  logger.info({ count: bulkOps.length }, 'Seeded TA solutions');
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
  heroType?: HeroType;
}

async function createStudents(cohorts: CohortInfo[], rng: Rng): Promise<StudentInfo[]> {
  const students: StudentInfo[] = [];
  let docNum = 100001;

  // Cohort distribution for general (non-hero) students
  const cohortGeneralCounts = [15, 15, 20]; // Q3, Q4, Q1
  let archetypeIdx = 0;

  // Build a list of general name indices (excluding heroes)
  const generalNameIndices = STUDENT_NAMES.map((_, i) => i).filter((i) => !HERO_NAME_INDICES.has(i));
  let generalIdx = 0;

  // 1. Create hero students in Q1 (cohort index 2)
  for (const hero of HERO_CONFIGS) {
    const name = STUDENT_NAMES[hero.nameIndex];
    const baseUsername = generateUsername(name.first, name.last);
    const username = await ensureUniqueUsername(baseUsername);
    const passwordHash = await hashPassword('password');

    const user = await User.create({
      username,
      passwordHash,
      role: 'student',
      displayName: `${name.first} ${name.last}`,
      docNumber: String(docNum++),
      cohortId: cohorts[2]._id,
      isActive: hero.heroType !== 'at-risk' || true, // at-risk is still active, just no recent activity
      preferences: { theme: hero.theme, leaderboardOptIn: hero.leaderboardOptIn },
    });

    students.push({
      _id: user._id as mongoose.Types.ObjectId,
      displayName: `${name.first} ${name.last}`,
      username,
      cohortId: cohorts[2]._id,
      cohortIndex: 2,
      isActive: true,
      archetype: 'steady', // placeholder — heroes use heroType not archetype
      heroType: hero.heroType,
    });
  }

  // 2. Create general students distributed across cohorts
  for (let ci = 0; ci < 3; ci++) {
    const count = cohortGeneralCounts[ci];
    const cohort = cohorts[ci];

    for (let i = 0; i < count; i++) {
      const nameIdx = generalNameIndices[generalIdx % generalNameIndices.length];
      generalIdx++;
      const name = STUDENT_NAMES[nameIdx];

      const baseUsername = generateUsername(name.first, name.last);
      const username = await ensureUniqueUsername(baseUsername);
      const passwordHash = await hashPassword('password');

      const archetype = ARCHETYPE_SEQUENCE[archetypeIdx % ARCHETYPE_SEQUENCE.length];
      archetypeIdx++;
      const isActive = archetype !== 'dropped';

      const user = await User.create({
        username,
        passwordHash,
        role: 'student',
        displayName: `${name.first} ${name.last}`,
        docNumber: String(docNum++),
        cohortId: cohort._id,
        isActive,
        preferences: {
          theme: rng.pick(THEMES),
          leaderboardOptIn: rng.chance(0.6),
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

  logger.info({ count: students.length }, 'Created students');
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

type ExerciseDoc = { _id: mongoose.Types.ObjectId; tier: number; type: string; basePoints: number; title: string; collectionId?: mongoose.Types.ObjectId; solution: string };

async function createProgress(
  students: StudentInfo[],
  exercises: ExerciseDoc[],
  cohorts: CohortInfo[],
  rng: Rng,
): Promise<ProgressInfo[]> {
  const allProgress: ProgressInfo[] = [];
  const bulkOps: Record<string, unknown>[] = [];

  // Find collections to separate default curriculum from themed collections
  const allCollections = await Collection.find().lean();
  const defaultCollection = allCollections.find((c) => c.isDefault);
  const defaultCollectionId = defaultCollection ? String(defaultCollection._id) : null;

  // Ordered exercise pool (default curriculum only): T1 → T2 → T3
  const defaultExercises = exercises.filter((e) =>
    (defaultCollectionId && e.collectionId && String(e.collectionId) === defaultCollectionId) || !e.collectionId,
  );
  const byTier: Record<number, ExerciseDoc[]> = {};
  for (const ex of defaultExercises) {
    if (!byTier[ex.tier]) byTier[ex.tier] = [];
    byTier[ex.tier].push(ex);
  }
  const orderedExercises = [...(byTier[1] || []), ...(byTier[2] || []), ...(byTier[3] || [])];

  // Collection exercises for explorer hero
  const collectionExercises: Record<string, ExerciseDoc[]> = {};
  const themedCollections = allCollections.filter((c) => !c.isDefault && !c.hidden);
  for (const col of themedCollections) {
    const colExercises = exercises.filter((e) => e.collectionId && String(e.collectionId) === String(col._id));
    if (colExercises.length > 0) collectionExercises[col.slug] = colExercises;
  }

  for (const student of students) {
    const cohort = cohorts[student.cohortIndex];
    const periodEnd = cohort.endDate || new Date();
    const periodStart = cohort.startDate;
    const classDays = getClassDays(periodStart, periodEnd);
    if (classDays.length === 0) continue;

    // Determine exercise set and behavior based on hero type or archetype
    let selectedExercises: ExerciseDoc[];
    let behaviorFn: (idx: number, total: number) => { attempts: number; uniqueAttempts: number; hintsViewed: number; solutionViewed: boolean; timeMs: number; completed: boolean };

    if (student.heroType) {
      const result = getHeroExercisesAndBehavior(student.heroType, orderedExercises, collectionExercises, rng);
      selectedExercises = result.exercises;
      behaviorFn = result.behaviorFn;
    } else {
      const config = ARCHETYPE_CONFIG[student.archetype];
      const percent = rng.rand(config.exercisePercent[0], config.exercisePercent[1]);
      const count = Math.max(0, Math.floor((orderedExercises.length * percent) / 100));
      if (count === 0) continue;
      selectedExercises = orderedExercises.slice(0, count);

      behaviorFn = () => {
        const attempts = rng.rand(config.attempts[0], config.attempts[1]);
        const uniqueAttempts = Math.max(1, attempts - rng.rand(0, Math.min(2, attempts - 1)));
        return {
          attempts,
          uniqueAttempts,
          hintsViewed: rng.chance(config.hintProb) ? rng.rand(1, 2) : 0,
          solutionViewed: rng.chance(config.solutionProb),
          timeMs: rng.rand(config.timeMs[0], config.timeMs[1]),
          completed: rng.chance(config.completionRate),
        };
      };
    }

    if (selectedExercises.length === 0) continue;

    // For at-risk hero, cap timestamps to 10+ days ago
    const atRiskCutoff = student.heroType === 'at-risk'
      ? new Date(Date.now() - 10 * 86_400_000)
      : null;
    const effectiveEnd = atRiskCutoff && atRiskCutoff < periodEnd ? atRiskCutoff : periodEnd;
    const effectiveClassDays = atRiskCutoff ? classDays.filter((d) => d <= atRiskCutoff) : classDays;
    if (effectiveClassDays.length === 0) continue;

    for (let i = 0; i < selectedExercises.length; i++) {
      const ex = selectedExercises[i];
      const behavior = behaviorFn(i, selectedExercises.length);

      const status = behavior.completed ? 'completed' : 'in_progress';
      const score = behavior.completed
        ? calculateScore(ex.tier as Tier, behavior.uniqueAttempts, behavior.solutionViewed, ex.basePoints)
        : 0;

      // Spread timestamps across class days
      const dayIdx = Math.min(
        Math.floor((i / selectedExercises.length) * effectiveClassDays.length),
        effectiveClassDays.length - 1,
      );
      const firstAttemptAt = classroomTime(effectiveClassDays[dayIdx], rng);
      const completedAt = behavior.completed
        ? new Date(firstAttemptAt.getTime() + rng.rand(60_000, behavior.timeMs * 2))
        : null;

      const failedCodeHashes: string[] = [];
      for (let h = 0; h < Math.max(0, behavior.uniqueAttempts - (behavior.completed ? 1 : 0)); h++) {
        failedCodeHashes.push(rng.hex32());
      }

      const doc = {
        userId: student._id,
        exerciseId: ex._id,
        cohortId: student.cohortId,
        status,
        currentCode: '',
        attempts: behavior.attempts,
        uniqueAttempts: behavior.uniqueAttempts,
        failedCodeHashes,
        hintsViewed: behavior.hintsViewed,
        solutionViewed: behavior.solutionViewed,
        score,
        firstAttemptAt,
        completedAt,
        totalTimeSpent: behavior.timeMs,
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
        solutionViewed: behavior.solutionViewed,
        completedAt,
      });
    }
  }

  if (bulkOps.length > 0) {
    await Progress.insertMany(bulkOps, { ordered: false });
  }
  logger.info({ count: bulkOps.length }, 'Created progress records');
  return allProgress;
}

// ─── Hero Behavior Definitions ──────────────────────────────────────────────

function getHeroExercisesAndBehavior(
  heroType: HeroType,
  orderedExercises: ExerciseDoc[],
  collectionExercises: Record<string, ExerciseDoc[]>,
  rng: Rng,
): {
  exercises: ExerciseDoc[];
  behaviorFn: (idx: number, total: number) => { attempts: number; uniqueAttempts: number; hintsViewed: number; solutionViewed: boolean; timeMs: number; completed: boolean };
} {
  switch (heroType) {
    case 'growth': {
      // Jane: 55% of exercises. First 40% = struggling (high attempts, hints), after = breakthrough (low attempts)
      const count = Math.floor(orderedExercises.length * 0.55);
      const exercises = orderedExercises.slice(0, count);
      const breakpoint = Math.floor(count * 0.4);

      return {
        exercises,
        behaviorFn: (idx) => {
          if (idx < breakpoint) {
            // Struggling phase
            return {
              attempts: rng.rand(5, 8),
              uniqueAttempts: rng.rand(4, 6),
              hintsViewed: 2,
              solutionViewed: rng.chance(0.2),
              timeMs: rng.rand(600_000, 1_200_000),
              completed: rng.chance(0.85),
            };
          }
          // Breakthrough phase
          return {
            attempts: rng.rand(1, 2),
            uniqueAttempts: 1,
            hintsViewed: 0,
            solutionViewed: false,
            timeMs: rng.rand(120_000, 400_000),
            completed: true,
          };
        },
      };
    }

    case 'star': {
      // Marcus: 85% of exercises. Always 1 attempt, never views solution.
      const count = Math.floor(orderedExercises.length * 0.85);
      return {
        exercises: orderedExercises.slice(0, count),
        behaviorFn: () => ({
          attempts: 1,
          uniqueAttempts: 1,
          hintsViewed: rng.chance(0.05) ? 1 : 0,
          solutionViewed: false,
          timeMs: rng.rand(60_000, 240_000),
          completed: true,
        }),
      };
    }

    case 'explorer': {
      // Priya: 45% default + exercises from 3 collections
      const defaultCount = Math.floor(orderedExercises.length * 0.45);
      const defaultSlice = orderedExercises.slice(0, defaultCount);

      // Grab portions of collections
      const rpg = (collectionExercises['rpg-questline'] || []).slice(0, 30);
      const popCulture = (collectionExercises['pop-culture-apis'] || []).slice(0, 20);
      const miniGames = (collectionExercises['mini-games'] || []).slice(0, 5);

      return {
        exercises: [...defaultSlice, ...rpg, ...popCulture, ...miniGames],
        behaviorFn: () => ({
          attempts: rng.rand(2, 3),
          uniqueAttempts: rng.rand(1, 2),
          hintsViewed: rng.chance(0.15) ? 1 : 0,
          solutionViewed: false,
          timeMs: rng.rand(180_000, 500_000),
          completed: rng.chance(0.92),
        }),
      };
    }

    case 'at-risk': {
      // Tyler: 20% of exercises, all completed before the cutoff.
      const count = Math.floor(orderedExercises.length * 0.20);
      return {
        exercises: orderedExercises.slice(0, count),
        behaviorFn: () => ({
          attempts: rng.rand(2, 3),
          uniqueAttempts: rng.rand(1, 2),
          hintsViewed: rng.chance(0.2) ? 1 : 0,
          solutionViewed: false,
          timeMs: rng.rand(120_000, 400_000),
          completed: rng.chance(0.90),
        }),
      };
    }

    case 'perfectionist': {
      // Sofia: 35% of exercises. Every one is perfect — 1 attempt, no hints, no solution.
      // Recent completions in last 5 days for highlights.
      const count = Math.floor(orderedExercises.length * 0.35);
      return {
        exercises: orderedExercises.slice(0, count),
        behaviorFn: () => ({
          attempts: 1,
          uniqueAttempts: 1,
          hintsViewed: 0,
          solutionViewed: false,
          timeMs: rng.rand(90_000, 300_000),
          completed: true,
        }),
      };
    }

    default:
      return { exercises: [], behaviorFn: () => ({ attempts: 1, uniqueAttempts: 1, hintsViewed: 0, solutionViewed: false, timeMs: 60_000, completed: true }) };
  }
}

// ─── Chat Data ──────────────────────────────────────────────────────────────

async function createChatData(cohorts: CohortInfo[], students: StudentInfo[], rng: Rng): Promise<void> {
  const q1Cohort = cohorts[2]; // active cohort
  const q1Students = students.filter((s) => s.cohortIndex === 2 && s.isActive);
  const instructor = await User.findOne({ role: 'instructor' }).lean();
  if (!instructor || q1Students.length === 0) return;

  // ── Today's live messages (~60) ──
  const today = todayString();
  const messages: Record<string, unknown>[] = [];
  const phase = CHAT_PHASES.late; // we're in week 11+

  // Generate a realistic class day
  const baseTime = new Date();
  baseTime.setHours(8, 0, 0, 0);
  let minuteOffset = 0;

  function addMessage(msg: Record<string, unknown>) {
    msg.cohortId = q1Cohort._id;
    msg.date = today;
    msg.createdAt = new Date(baseTime.getTime() + minuteOffset * 60_000);
    minuteOffset += rng.rand(2, 12);
    messages.push(msg);
  }

  // Morning system message
  addMessage({
    userId: instructor._id, username: instructor.username, displayName: instructor.displayName,
    role: 'instructor', messageType: 'system', content: 'Good morning! Today we\'re continuing with array callback methods. Check the Assignments tab for this week\'s exercises.',
    isPinned: true,
  });

  // Morning greetings
  addMessage(studentMsg(rng.pick(q1Students), 'Morning! Ready to code.'));
  addMessage(studentMsg(q1Students.find((s) => s.heroType === 'star')!, 'Already knocked out two exercises before class started.'));
  addMessage(studentMsg(q1Students.find((s) => s.heroType === 'growth')!, 'Good morning! The callback exercises from yesterday are starting to click.'));

  // Weave Q&A threads and solo messages through the day
  for (let t = 0; t < phase.qa.length && t < 5; t++) {
    const qa = phase.qa[t];
    const asker = rng.pick(q1Students);
    const answerer = rng.pick(q1Students.filter((s) => s._id !== asker._id));

    addMessage(studentMsg(asker, qa.question));
    minuteOffset += rng.rand(1, 5);

    if (phase.codeSnippets[t]) {
      const snip = phase.codeSnippets[t];
      addMessage({ ...studentMsg(answerer, snip.text), messageType: 'code-snippet', codeSnippet: { code: snip.code, language: snip.language } });
    } else {
      addMessage(studentMsg(answerer, qa.answer));
    }

    // Instructor follow-up on some threads
    if (t < 2) {
      minuteOffset += rng.rand(1, 3);
      addMessage({
        userId: instructor._id, username: instructor.username, displayName: instructor.displayName,
        role: 'instructor', messageType: 'text', content: rng.pick(phase.instructor),
      });
    }
  }

  // Solo messages spread through the day
  for (let i = 0; i < 15; i++) {
    const sender = rng.pick(q1Students);
    addMessage(studentMsg(sender, rng.pick(phase.solo)));
  }

  // A few exercise links
  const linkExercises = await Exercise.find({ isActive: true, tier: { $lte: 3 } }).limit(50).lean();
  for (let i = 0; i < 3; i++) {
    const sender = rng.pick(q1Students);
    const ex = rng.pick(linkExercises);
    addMessage({
      ...studentMsg(sender, 'Working on this one:'),
      messageType: 'exercise-link',
      exerciseLink: { exerciseId: String(ex._id), title: ex.title, tier: ex.tier, type: ex.type },
    });
  }

  // Instructor mid-day check-in
  addMessage({
    userId: instructor._id, username: instructor.username, displayName: instructor.displayName,
    role: 'instructor', messageType: 'text', content: 'Great progress today! Remember to use the hints before viewing solutions.',
  });

  // End of day messages
  addMessage(studentMsg(rng.pick(q1Students), 'Good session today. See everyone tomorrow!'));
  addMessage({
    userId: instructor._id, username: instructor.username, displayName: instructor.displayName,
    role: 'instructor', messageType: 'text', content: 'Excellent work everyone! See you tomorrow.',
  });

  // Add reactions to ~25% of messages
  for (const msg of messages) {
    if (rng.chance(0.25)) {
      const reactionEmojis: ('thumbs-up' | 'lightbulb' | 'checkmark')[] = ['thumbs-up', 'lightbulb', 'checkmark'];
      const reactors = q1Students.slice(0, rng.rand(1, 4)).map((s) => s._id);
      msg.reactions = [{ emoji: rng.pick(reactionEmojis), userIds: reactors }];
    }
  }

  await ChatMessage.insertMany(messages);
  logger.info({ count: messages.length }, 'Created chat messages');

  // ── Archived chat logs ──
  let logCount = 0;
  const allCohortConfigs = [
    { cohort: cohorts[0], students: students.filter((s) => s.cohortIndex === 0), logDays: 25 },
    { cohort: cohorts[1], students: students.filter((s) => s.cohortIndex === 1), logDays: 20 },
    { cohort: cohorts[2], students: q1Students, logDays: 45 },
  ];

  for (const { cohort, students: cohortStudents, logDays } of allCohortConfigs) {
    const activeStudents = cohortStudents.filter((s) => s.isActive);
    if (activeStudents.length === 0) continue;

    const cohortClassDays = getClassDays(cohort.startDate, cohort.endDate || new Date(Date.now() - 86_400_000));
    const daysToLog = cohortClassDays.slice(0, Math.min(logDays, cohortClassDays.length));

    for (const day of daysToLog) {
      // Determine phase based on day offset
      const dayOffset = Math.floor((day.getTime() - cohort.startDate.getTime()) / 86_400_000);
      const phaseName = dayOffset < 21 ? 'early' : dayOffset < 49 ? 'mid' : 'late';
      const phaseContent = CHAT_PHASES[phaseName];

      const messageCount = rng.rand(6, 18);
      const participants = activeStudents.slice(0, rng.rand(3, Math.min(10, activeStudents.length)));
      const logMessages: Record<string, unknown>[] = [];

      // 1-2 Q&A pairs
      const qaCount = rng.rand(1, 2);
      for (let q = 0; q < qaCount && q < phaseContent.qa.length; q++) {
        const qa = rng.pick(phaseContent.qa);
        const asker = rng.pick(participants);
        const answerer = rng.pick(participants.filter((p) => p._id !== asker._id) || participants);
        logMessages.push(archiveMsg(asker, 'text', qa.question, day, rng));
        logMessages.push(archiveMsg(answerer, 'text', qa.answer, day, rng));
      }

      // Solo messages to fill remaining count
      while (logMessages.length < messageCount) {
        const sender = rng.pick(participants);
        logMessages.push(archiveMsg(sender, 'text', rng.pick(phaseContent.solo), day, rng));
      }

      // Sort by createdAt
      logMessages.sort((a, b) => (a.createdAt as Date).getTime() - (b.createdAt as Date).getTime());

      await ChatLog.create({
        cohortId: cohort._id,
        date: dateString(day),
        messages: logMessages,
        messageCount: logMessages.length,
        participants: participants.map((p) => p._id),
        archivedAt: new Date(day.getTime() + 24 * 60 * 60 * 1000),
      });
      logCount++;
    }
  }

  logger.info({ count: logCount }, 'Created archived chat logs');
}

function studentMsg(student: StudentInfo, content: string): Record<string, unknown> {
  return {
    userId: student._id,
    username: student.username,
    displayName: student.displayName,
    role: 'student',
    messageType: 'text',
    content,
  };
}

function archiveMsg(student: StudentInfo, type: string, content: string, day: Date, rng: Rng): Record<string, unknown> {
  return {
    userId: student._id,
    username: student.username,
    displayName: student.displayName,
    role: 'student',
    messageType: type,
    content,
    createdAt: classroomTime(day, rng),
  };
}

// ─── Ratings ────────────────────────────────────────────────────────────────

async function createRatings(students: StudentInfo[], progress: ProgressInfo[], rng: Rng): Promise<void> {
  const completedProgress = progress.filter((p) => p.status === 'completed');
  const ratingDocs: Record<string, unknown>[] = [];
  const seen = new Set<string>();

  for (const p of completedProgress) {
    if (!rng.chance(0.3)) continue;
    const key = `${String(p.userId)}_${String(p.exerciseId)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const tierPenalty = (p.tier - 1) * 0.3;
    const baseStar = 4.2 - tierPenalty + (rng.random() - 0.5) * 2;
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
  logger.info({ count: ratingDocs.length }, 'Created ratings');
}

// ─── Achievements ───────────────────────────────────────────────────────────

async function createAchievements(students: StudentInfo[]): Promise<void> {
  let totalEarned = 0;

  for (const student of students) {
    if (student.archetype === 'dropped' && !student.heroType) continue;
    const earned = await checkAchievements(String(student._id), String(student.cohortId));
    totalEarned += earned.length;
  }

  logger.info({ count: totalEarned }, 'Created achievement instances');
}

// ─── Assignments ────────────────────────────────────────────────────────────

async function createExtraAssignments(
  cohorts: CohortInfo[],
  exercises: ExerciseDoc[],
): Promise<void> {
  const instructor = await User.findOne({ role: 'instructor' }).lean();
  if (!instructor) return;

  const t1Exercises = exercises.filter((e) => e.tier === 1).slice(0, 15);
  const t2Exercises = exercises.filter((e) => e.tier === 2).slice(0, 12);

  const assignments = [];

  // 1. Past-due assignment for Q3 (archived cohort)
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

  // 2. Recently completed Q1 assignment (due last week)
  if (cohorts[2] && t1Exercises.length > 0) {
    assignments.push({
      title: 'Week 6 — JavaScript Fundamentals',
      description: 'Practice variable declarations, data types, and basic operators.',
      cohortId: cohorts[2]._id,
      exerciseIds: t1Exercises.slice(5, 15).map((e) => e._id),
      dueDate: new Date(Date.now() - 7 * 86_400_000),
      isActive: true,
      createdBy: instructor._id,
    });
  }

  // 3. Current Q1 assignment (due in 5 days)
  if (cohorts[2] && t2Exercises.length > 0) {
    assignments.push({
      title: 'Week 10 — Array & String Methods',
      description: 'Practice array manipulation and string methods. Focus on understanding return values.',
      cohortId: cohorts[2]._id,
      exerciseIds: t2Exercises.slice(0, 8).map((e) => e._id),
      dueDate: new Date(Date.now() + 5 * 86_400_000),
      isActive: true,
      createdBy: instructor._id,
    });
  }

  // 4. Upcoming Q1 assignment (due in 2 weeks)
  if (cohorts[2] && t2Exercises.length > 4) {
    assignments.push({
      title: 'Week 12 — Callback Methods',
      description: 'Apply forEach, map, filter, and reduce to solve data transformation problems.',
      cohortId: cohorts[2]._id,
      exerciseIds: t2Exercises.slice(4, 12).map((e) => e._id),
      dueDate: new Date(Date.now() + 14 * 86_400_000),
      isActive: true,
      createdBy: instructor._id,
    });
  }

  if (assignments.length > 0) {
    await Assignment.insertMany(assignments);
  }
  logger.info({ count: assignments.length }, 'Created assignments');
}
