import mongoose from 'mongoose';
import { Progress } from '../models/Progress.js';
import { User } from '../models/User.js';
import { Exercise } from '../models/Exercise.js';
import { AchievementInstance } from '../models/AchievementInstance.js';
import { AchievementDefinition } from '../models/AchievementDefinition.js';
import { Cohort } from '../models/Cohort.js';
import type { LeaderboardEntry, LeaderboardHighlight } from '@codeforge/shared';

const MILESTONE_THRESHOLDS = [10, 25, 50, 100, 150, 200, 250, 300, 400, 500];
const HIGHLIGHTS_WINDOW_DAYS = 7;
const HIGHLIGHTS_LIMIT = 20;

async function computeStreak(userId: mongoose.Types.ObjectId): Promise<number> {
  const completed = await Progress.find({ userId, status: 'completed' })
    .sort({ completedAt: -1 })
    .select('solutionViewed')
    .lean();

  let streak = 0;
  for (const p of completed) {
    if (p.solutionViewed) break;
    streak++;
  }
  return streak;
}

export async function getLeaderboard(
  cohortId: string | null,
  requestingUserCohortId: string | null,
): Promise<LeaderboardEntry[]> {
  // Determine which users to include
  const userFilter: Record<string, unknown> = {
    role: 'student',
    isActive: true,
    'preferences.leaderboardOptIn': true,
  };

  if (cohortId === 'all') {
    // All cohorts — no cohortId filter
  } else {
    const targetCohortId = cohortId || requestingUserCohortId;
    if (!targetCohortId) return [];
    userFilter.cohortId = new mongoose.Types.ObjectId(targetCohortId);
  }

  const optedInUsers = await User.find(userFilter)
    .select('_id displayName cohortId')
    .lean();

  if (optedInUsers.length === 0) return [];

  const userIds = optedInUsers.map((u) => u._id);
  const userMap = new Map(optedInUsers.map((u) => [String(u._id), u]));

  // Load cohort names for display
  const cohortIds = [...new Set(optedInUsers.map((u) => String(u.cohortId)).filter(Boolean))];
  const cohorts = await Cohort.find({ _id: { $in: cohortIds } }).select('_id name').lean();
  const cohortMap = new Map(cohorts.map((c) => [String(c._id), c.name]));

  // Aggregate scores and completions
  const pipeline = await Progress.aggregate([
    { $match: { userId: { $in: userIds }, status: 'completed' } },
    {
      $lookup: {
        from: 'exercises',
        localField: 'exerciseId',
        foreignField: '_id',
        as: 'exercise',
        pipeline: [{ $project: { tier: 1 } }],
      },
    },
    { $unwind: { path: '$exercise', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$userId',
        totalScore: { $sum: '$score' },
        completedCount: { $sum: 1 },
        tiers: { $push: '$exercise.tier' },
      },
    },
  ]);

  // Compute streaks in parallel
  const streakPromises = userIds.map((uid) => computeStreak(uid));
  const streaks = await Promise.all(streakPromises);
  const streakMap = new Map(userIds.map((uid, i) => [String(uid), streaks[i]]));

  // Build entries
  const scoreMap = new Map(pipeline.map((r: { _id: mongoose.Types.ObjectId; totalScore: number; completedCount: number; tiers: number[] }) => [String(r._id), r]));

  const entries: LeaderboardEntry[] = optedInUsers.map((u) => {
    const scoreData = scoreMap.get(String(u._id));
    const tierBreakdown: Record<number, number> = {};
    if (scoreData?.tiers) {
      for (const t of scoreData.tiers) {
        tierBreakdown[t] = (tierBreakdown[t] || 0) + 1;
      }
    }

    return {
      userId: String(u._id),
      displayName: u.displayName,
      cohortId: String(u.cohortId || ''),
      cohortName: cohortMap.get(String(u.cohortId)) || '',
      totalScore: scoreData?.totalScore || 0,
      completedCount: scoreData?.completedCount || 0,
      tierBreakdown,
      streak: streakMap.get(String(u._id)) || 0,
      rank: 0,
    };
  });

  // Sort by totalScore DESC, then completedCount DESC
  entries.sort((a, b) => b.totalScore - a.totalScore || b.completedCount - a.completedCount);

  // Assign ranks
  for (let i = 0; i < entries.length; i++) {
    entries[i].rank = i + 1;
  }

  return entries;
}

export async function getHighlights(
  cohortId: string | null,
): Promise<LeaderboardHighlight[]> {
  const windowStart = new Date();
  windowStart.setDate(windowStart.getDate() - HIGHLIGHTS_WINDOW_DAYS);

  const highlights: LeaderboardHighlight[] = [];

  // Build user filter for this cohort
  const userFilter: Record<string, unknown> = {
    role: 'student',
    isActive: true,
  };
  if (cohortId && cohortId !== 'all') {
    userFilter.cohortId = new mongoose.Types.ObjectId(cohortId);
  }
  const cohortUsers = await User.find(userFilter).select('_id displayName').lean();
  if (cohortUsers.length === 0) return [];

  const userIds = cohortUsers.map((u) => u._id);
  const userNameMap = new Map(cohortUsers.map((u) => [String(u._id), u.displayName]));

  // 1. Recent achievements
  const recentAchievements = await AchievementInstance.find({
    userId: { $in: userIds },
    earnedAt: { $gte: windowStart },
  }).lean();

  if (recentAchievements.length > 0) {
    const defIds = [...new Set(recentAchievements.map((a) => String(a.achievementId)))];
    const defs = await AchievementDefinition.find({ _id: { $in: defIds } })
      .select('_id name icon')
      .lean();
    const defMap = new Map(defs.map((d) => [String(d._id), d]));

    for (const ai of recentAchievements) {
      const def = defMap.get(String(ai.achievementId));
      if (!def) continue;
      highlights.push({
        type: 'achievement',
        userId: String(ai.userId),
        displayName: userNameMap.get(String(ai.userId)) || 'Unknown',
        description: `Earned "${def.name}"`,
        icon: def.icon || '🏆',
        timestamp: ai.earnedAt.toISOString(),
      });
    }
  }

  // 2. Perfect scores (1st attempt, no solution viewed)
  const perfectScores = await Progress.find({
    userId: { $in: userIds },
    status: 'completed',
    completedAt: { $gte: windowStart },
    uniqueAttempts: { $lte: 1 },
    solutionViewed: false,
  })
    .sort({ completedAt: -1 })
    .limit(20)
    .lean();

  if (perfectScores.length > 0) {
    const exerciseIds = perfectScores.map((p) => p.exerciseId);
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } })
      .select('_id title tier')
      .lean();
    const exerciseMap = new Map(exercises.map((e) => [String(e._id), e]));

    for (const p of perfectScores) {
      const ex = exerciseMap.get(String(p.exerciseId));
      if (!ex) continue;
      highlights.push({
        type: 'perfect_score',
        userId: String(p.userId),
        displayName: userNameMap.get(String(p.userId)) || 'Unknown',
        description: `Perfect score on "${ex.title}"`,
        icon: '⚡',
        timestamp: p.completedAt!.toISOString(),
      });
    }
  }

  // 3. Milestones
  const completionCounts = await Progress.aggregate([
    { $match: { userId: { $in: userIds }, status: 'completed' } },
    {
      $group: {
        _id: '$userId',
        count: { $sum: 1 },
        latestCompletion: { $max: '$completedAt' },
      },
    },
  ]);

  for (const cc of completionCounts) {
    const count = cc.count as number;
    const latestCompletion = cc.latestCompletion as Date;

    for (const threshold of MILESTONE_THRESHOLDS) {
      if (count >= threshold && count < threshold + 10) {
        // Check if the milestone was hit recently
        // Find the Nth completion to see when it happened
        const nthCompletion = await Progress.findOne({
          userId: cc._id,
          status: 'completed',
        })
          .sort({ completedAt: 1 })
          .skip(threshold - 1)
          .select('completedAt')
          .lean();

        if (nthCompletion?.completedAt && nthCompletion.completedAt >= windowStart) {
          highlights.push({
            type: 'milestone',
            userId: String(cc._id),
            displayName: userNameMap.get(String(cc._id)) || 'Unknown',
            description: `Completed ${threshold} exercises!`,
            icon: '🎯',
            timestamp: nthCompletion.completedAt.toISOString(),
          });
        }
      }
    }
  }

  // Sort by timestamp DESC, limit
  highlights.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return highlights.slice(0, HIGHLIGHTS_LIMIT);
}
