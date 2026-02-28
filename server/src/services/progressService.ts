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

  return {
    totalExercises: progress.length,
    completedCount: completed.length,
    inProgressCount: progress.filter((p) => p.status === 'in_progress').length,
    totalScore,
    totalAttempts,
  };
}
