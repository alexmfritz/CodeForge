import { Progress } from '../models/Progress.js';
import { Exercise } from '../models/Exercise.js';
import { computeScore } from './scoreService.js';
import type { Tier } from '@codeforge/shared';

export async function getOrCreateProgress(userId: string, exerciseId: string, cohortId: string) {
  let progress = await Progress.findOne({ userId, exerciseId });
  if (!progress) {
    progress = await Progress.create({ userId, exerciseId, cohortId });
  }
  return progress;
}

export async function saveCode(userId: string, exerciseId: string, cohortId: string, code: string) {
  const progress = await getOrCreateProgress(userId, exerciseId, cohortId);
  progress.currentCode = code;
  if (progress.status === 'not_started') {
    progress.status = 'in_progress';
  }
  await progress.save();
  return progress;
}

export async function recordAttempt(
  userId: string,
  exerciseId: string,
  cohortId: string,
  codeHash: string,
  passed: boolean,
) {
  const progress = await getOrCreateProgress(userId, exerciseId, cohortId);
  progress.attempts += 1;
  if (!progress.firstAttemptAt) {
    progress.firstAttemptAt = new Date();
  }
  if (progress.status === 'not_started') {
    progress.status = 'in_progress';
  }

  const isUnique = !progress.failedCodeHashes.includes(codeHash);
  if (isUnique && !passed) {
    progress.uniqueAttempts += 1;
    progress.failedCodeHashes.push(codeHash);
  }

  await progress.save();
  return { progress, isUnique };
}

export async function markComplete(
  userId: string,
  exerciseId: string,
  cohortId: string,
  uniqueAttempts: number,
  solutionViewed: boolean,
) {
  const progress = await getOrCreateProgress(userId, exerciseId, cohortId);
  if (progress.status === 'completed') return progress;

  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) throw new Error('Exercise not found');

  const score = computeScore(
    exercise.tier as Tier,
    uniqueAttempts || progress.uniqueAttempts || 1,
    solutionViewed || progress.solutionViewed,
    exercise.basePoints,
  );

  progress.status = 'completed';
  progress.completedAt = new Date();
  progress.score = score;
  if (solutionViewed) progress.solutionViewed = true;
  await progress.save();
  return progress;
}

export async function resetProgress(userId: string, exerciseId: string) {
  const progress = await Progress.findOne({ userId, exerciseId });
  if (!progress) return null;
  progress.status = 'not_started';
  progress.currentCode = '';
  progress.attempts = 0;
  progress.uniqueAttempts = 0;
  progress.failedCodeHashes = [];
  progress.hintsViewed = 0;
  progress.solutionViewed = false;
  progress.score = 0;
  progress.completedAt = undefined;
  progress.totalTimeSpent = 0;
  await progress.save();
  return progress;
}

export async function viewSolution(userId: string, exerciseId: string, cohortId: string) {
  const progress = await getOrCreateProgress(userId, exerciseId, cohortId);
  progress.solutionViewed = true;
  await progress.save();
  return progress;
}

export async function getUserProgress(userId: string) {
  return Progress.find({ userId }).lean();
}

export async function getUserStats(userId: string) {
  const progress = await Progress.find({ userId }).lean();
  const completed = progress.filter((p) => p.status === 'completed');
  const totalScore = completed.reduce((sum, p) => sum + p.score, 0);
  const totalAttempts = progress.reduce((sum, p) => sum + p.attempts, 0);

  const exerciseIds = progress.map((p) => p.exerciseId);
  const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).lean();
  const exerciseMap = new Map(exercises.map((e) => [String(e._id), e]));

  const tierBreakdown: Record<number, { completed: number; total: number; score: number }> = {};
  const typeBreakdown: Record<string, { completed: number; total: number; score: number }> = {};

  for (const p of progress) {
    const ex = exerciseMap.get(String(p.exerciseId));
    if (!ex) continue;

    const tier = ex.tier;
    if (!tierBreakdown[tier]) tierBreakdown[tier] = { completed: 0, total: 0, score: 0 };
    tierBreakdown[tier].total += 1;
    if (p.status === 'completed') {
      tierBreakdown[tier].completed += 1;
      tierBreakdown[tier].score += p.score;
    }

    const type = ex.type;
    if (!typeBreakdown[type]) typeBreakdown[type] = { completed: 0, total: 0, score: 0 };
    typeBreakdown[type].total += 1;
    if (p.status === 'completed') {
      typeBreakdown[type].completed += 1;
      typeBreakdown[type].score += p.score;
    }
  }

  const recentActivity = completed
    .filter((p) => p.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
    .slice(0, 10)
    .map((p) => {
      const ex = exerciseMap.get(String(p.exerciseId));
      return {
        exerciseId: String(p.exerciseId),
        title: ex?.title ?? 'Unknown',
        tier: ex?.tier ?? 1,
        type: ex?.type ?? 'js',
        score: p.score,
        completedAt: p.completedAt,
        attempts: p.uniqueAttempts,
      };
    });

  return {
    totalExercises: progress.length,
    completedCount: completed.length,
    inProgressCount: progress.filter((p) => p.status === 'in_progress').length,
    totalScore,
    totalAttempts,
    tierBreakdown,
    typeBreakdown,
    recentActivity,
  };
}
