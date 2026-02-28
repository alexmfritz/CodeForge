// ─── Exercise Types ────────────────────────────────────────────────────────────

export type ExerciseType = 'js' | 'html' | 'css' | 'html-css';
export type Tier = 1 | 2 | 3 | 4 | 5;
export type TierName = 'spark' | 'foundations' | 'builder' | 'architect' | 'mastercraft';

export interface TestCase {
  query?: string;
  assertion:
    | 'exists'
    | 'textContains'
    | 'countAtLeast'
    | 'equals'
    | 'oneOf'
    | 'sourceContains'
    | 'sourceMatch'
    | 'hasId'
    | 'hasClass'
    | 'contains';
  property?: string;
  value?: string | number | string[];
  description: string;
  flags?: string;
}

export interface Resource {
  label: string;
  url: string;
  description?: string;
}

export interface Exercise {
  _id: string;
  legacyId?: number;
  title: string;
  slug: string;
  type: ExerciseType;
  tier: Tier;
  category: string[];
  tags: string[];
  description: string;
  instructions: string;
  starterCode: string;
  solution: string;
  testRunner: string;
  testCases?: TestCase[];
  providedHtml?: string;
  hints: string[];
  resources: Resource[];
  solutionGate?: number;
  basePoints: number;
  collectionId?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Category / Collection ──────────────────────────────────────────────────

export interface Category {
  label: string;
  icon?: string;
  color?: string;
  children?: Record<string, Category>;
}

export interface Collection {
  _id: string;
  slug: string;
  name: string;
  description: string;
  exerciseIds: string[];
  isDefault?: boolean;
  hidden?: boolean;
  color?: string;
  source?: string;
  license?: string;
  attribution?: string;
  order: number;
}

export interface ExercisesData {
  categories: Record<string, Category>;
  collections: Collection[];
  exercises: Exercise[];
}

// ─── Auth & Users ───────────────────────────────────────────────────────────

export type Role = 'instructor' | 'ta' | 'student';

export interface User {
  _id: string;
  username: string;
  role: Role;
  displayName: string;
  docNumber: string;
  cohortId?: string;
  isActive: boolean;
  lastLogin?: string;
  preferences: {
    theme: Theme;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Cohort {
  _id: string;
  name: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Progress ───────────────────────────────────────────────────────────────

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface Progress {
  _id: string;
  userId: string;
  exerciseId: string;
  cohortId: string;
  status: ProgressStatus;
  currentCode: string;
  attempts: number;
  uniqueAttempts: number;
  failedCodeHashes: string[];
  hintsViewed: number;
  solutionViewed: boolean;
  score: number;
  firstAttemptAt?: string;
  completedAt?: string;
  totalTimeSpent: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Dashboard Stats ────────────────────────────────────────────────────────

export interface BreakdownEntry {
  completed: number;
  total: number;
  score: number;
}

export interface RecentActivityItem {
  exerciseId: string;
  title: string;
  tier: number;
  type: ExerciseType;
  score: number;
  completedAt: string;
  attempts: number;
}

export interface DashboardStats {
  totalExercises: number;
  completedCount: number;
  inProgressCount: number;
  totalScore: number;
  totalAttempts: number;
  tierBreakdown: Record<number, BreakdownEntry>;
  typeBreakdown: Record<string, BreakdownEntry>;
  recentActivity: RecentActivityItem[];
}

// ─── Assignments ────────────────────────────────────────────────────────────

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  cohortId: string;
  exerciseIds: string[];
  targetStudentIds?: string[];
  dueDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type AssignmentStatus = 'active' | 'past-due' | 'archived';

export function getAssignmentStatus(assignment: Pick<Assignment, 'isActive' | 'dueDate'>): AssignmentStatus {
  if (!assignment.isActive) return 'archived';
  if (assignment.dueDate && new Date(assignment.dueDate) < new Date()) return 'past-due';
  return 'active';
}

// ─── Achievements ───────────────────────────────────────────────────────────

export interface AchievementDefinition {
  _id: string;
  name: string;
  description: string;
  icon: string;
  criteriaType: string;
  criteriaParams: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementInstance {
  _id: string;
  userId: string;
  achievementId: string;
  cohortId: string;
  earnedAt: string;
  metadata: Record<string, unknown>;
}

// ─── Ratings ────────────────────────────────────────────────────────────────

export interface Rating {
  _id: string;
  userId: string;
  exerciseId: string;
  cohortId: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Test Results ───────────────────────────────────────────────────────────

export interface TestResult {
  pass: boolean;
  description: string;
  got?: unknown;
}

// ─── UI Types ───────────────────────────────────────────────────────────────

export type Theme =
  | 'midnight'
  | 'daylight'
  | 'high-contrast'
  | 'monokai'
  | 'solarized-dark'
  | 'solarized-light'
  | 'nord'
  | 'dracula';

export type StatusSort = 'default' | 'in-progress-first' | 'not-started-first' | 'completed-first';

export interface Toast {
  message: string;
  type: 'error' | 'success' | 'warning' | 'celebration';
}

// ─── API Types ──────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface JwtPayload {
  userId: string;
  role: Role;
  cohortId: string | null;
}

// ─── Chat Types ────────────────────────────────────────────────────────────

export type ChatMessageType = 'text' | 'exercise-link' | 'code-snippet' | 'system';

export type EmojiReaction = 'thumbs-up' | 'lightbulb' | 'checkmark';

export interface ChatReaction {
  emoji: EmojiReaction;
  userIds: string[];
}

export interface ExerciseLinkData {
  exerciseId: string;
  title: string;
  tier: Tier;
  type: ExerciseType;
}

export interface CodeSnippetData {
  code: string;
  language: string;
}

export interface ChatMessage {
  _id: string;
  cohortId: string;
  date: string;
  userId: string;
  username: string;
  displayName: string;
  role: Role;
  messageType: ChatMessageType;
  content: string;
  exerciseLink?: ExerciseLinkData;
  codeSnippet?: CodeSnippetData;
  mentions: string[];
  reactions: ChatReaction[];
  isPinned: boolean;
  createdAt: string;
}

export interface ChatLog {
  _id: string;
  cohortId: string;
  date: string;
  messages: ChatMessage[];
  messageCount: number;
  participants: string[];
  archivedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatActiveUser {
  userId: string;
  username: string;
  displayName: string;
  role: Role;
}

// ─── Socket Event Types ────────────────────────────────────────────────────

export interface ServerToClientEvents {
  'chat:message': (message: ChatMessage) => void;
  'chat:history': (messages: ChatMessage[]) => void;
  'chat:user-joined': (user: ChatActiveUser) => void;
  'chat:user-left': (user: ChatActiveUser) => void;
  'chat:active-users': (users: ChatActiveUser[]) => void;
  'chat:typing': (data: { userId: string; username: string; isTyping: boolean }) => void;
  'chat:pinned': (message: ChatMessage | null) => void;
  'chat:reaction': (data: { messageId: string; reactions: ChatReaction[] }) => void;
  'chat:mention': (data: { from: string; messageId: string; content: string }) => void;
  'chat:error': (error: string) => void;
}

export interface ClientToServerEvents {
  'chat:join': (data: { cohortId: string }) => void;
  'chat:leave': () => void;
  'chat:send-message': (data: {
    messageType: ChatMessageType;
    content: string;
    exerciseLink?: ExerciseLinkData;
    codeSnippet?: CodeSnippetData;
    mentions?: string[];
  }) => void;
  'chat:typing': (isTyping: boolean) => void;
  'chat:pin': (messageId: string) => void;
  'chat:unpin': () => void;
  'chat:react': (data: { messageId: string; emoji: EmojiReaction }) => void;
  'chat:get-active-users': (cohortId: string) => void;
}
