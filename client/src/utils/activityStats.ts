import type { Progress } from '@codeforge/shared';

export interface DayCell {
  date: string; // 'YYYY-MM-DD'
  count: number;
  points: number;
}

export interface ActivityData {
  days: DayCell[]; // 84 entries (12 weeks × 7), oldest first
  currentStreak: number;
  weekExercises: number;
  weekPoints: number;
}

const TOTAL_DAYS = 84; // 12 weeks

function toDateKey(d: Date): string {
  // 'en-CA' locale produces YYYY-MM-DD
  return d.toLocaleDateString('en-CA');
}

export function computeActivityData(
  progressItems: Record<string, Progress>,
): ActivityData {
  // 1. Aggregate completions by date
  const dateMap = new Map<string, { count: number; points: number }>();

  for (const p of Object.values(progressItems)) {
    if (p.status !== 'completed' || !p.completedAt) continue;
    const key = toDateKey(new Date(p.completedAt));
    const existing = dateMap.get(key);
    if (existing) {
      existing.count += 1;
      existing.points += p.score;
    } else {
      dateMap.set(key, { count: 1, points: p.score });
    }
  }

  // 2. Generate 84 DayCell entries (83 days ago → today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (TOTAL_DAYS - 1));

  // Align start to Sunday so columns are full weeks
  const dayOfWeek = startDate.getDay(); // 0=Sun
  startDate.setDate(startDate.getDate() - dayOfWeek);

  const days: DayCell[] = [];
  const cursor = new Date(startDate);
  const todayKey = toDateKey(today);

  while (days.length < TOTAL_DAYS) {
    const key = toDateKey(cursor);
    const entry = dateMap.get(key);
    days.push({
      date: key,
      count: entry?.count ?? 0,
      points: entry?.points ?? 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  // 3. Compute streak (walk backward from today)
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].date === todayKey) {
      // Today: count toward streak if > 0, but don't break on 0
      // (student may not have completed anything yet today)
      if (days[i].count > 0) currentStreak++;
      continue;
    }
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // 4. Week stats (last 7 days)
  let weekExercises = 0;
  let weekPoints = 0;
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 6);
  const weekStartKey = toDateKey(weekStart);

  for (const day of days) {
    if (day.date >= weekStartKey) {
      weekExercises += day.count;
      weekPoints += day.points;
    }
  }

  return { days, currentStreak, weekExercises, weekPoints };
}
