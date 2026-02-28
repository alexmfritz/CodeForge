import { AchievementDefinition, IAchievementDefinition } from '../models/AchievementDefinition.js';
import { AchievementInstance } from '../models/AchievementInstance.js';
import { Progress } from '../models/Progress.js';
import { Exercise } from '../models/Exercise.js';
import { Collection } from '../models/Collection.js';

interface EarnedAchievement {
  _id: string;
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Evaluates if a user meets achievement criteria based on their progress data
async function evaluateCriteria(
  definition: IAchievementDefinition,
  userId: string,
  completedProgress: Array<{
    exerciseId: string;
    uniqueAttempts: number;
    solutionViewed: boolean;
    score: number;
  }>,
  exerciseMap: Map<string, { type: string; tier: number; collectionId?: string }>,
): Promise<boolean> {
  const params = definition.criteriaParams;

  switch (definition.criteriaType) {
    case 'exercises_completed': {
      const requiredCount = params.count as number;
      return completedProgress.length >= requiredCount;
    }

    case 'tier_completed': {
      const tier = params.tier as number;
      const requiredCount = params.count as number;
      const tierCompleted = completedProgress.filter((p) => {
        const ex = exerciseMap.get(p.exerciseId);
        return ex && ex.tier === tier;
      });
      return tierCompleted.length >= requiredCount;
    }

    case 'type_completed': {
      const type = params.type as string;
      const requiredCount = params.count as number;
      const typeCompleted = completedProgress.filter((p) => {
        const ex = exerciseMap.get(p.exerciseId);
        return ex && ex.type === type;
      });
      return typeCompleted.length >= requiredCount;
    }

    case 'score_reached': {
      const requiredScore = params.score as number;
      const totalScore = completedProgress.reduce((sum, p) => sum + p.score, 0);
      return totalScore >= requiredScore;
    }

    case 'collection_completed': {
      const collectionId = params.collectionId as string;
      const collection = await Collection.findById(collectionId).lean();
      if (!collection) return false;
      const collectionExerciseIds = new Set(
        collection.exerciseIds.map((id) => String(id)),
      );
      const completedIds = new Set(completedProgress.map((p) => p.exerciseId));
      for (const exId of collectionExerciseIds) {
        if (!completedIds.has(exId)) return false;
      }
      return collectionExerciseIds.size > 0;
    }

    case 'perfect_score': {
      const requiredCount = params.count as number;
      const perfectCount = completedProgress.filter(
        (p) => p.uniqueAttempts <= 1 && !p.solutionViewed,
      ).length;
      return perfectCount >= requiredCount;
    }

    case 'streak': {
      const requiredCount = params.count as number;
      const noSolutionCount = completedProgress.filter(
        (p) => !p.solutionViewed,
      ).length;
      return noSolutionCount >= requiredCount;
    }

    default:
      return false;
  }
}

// Main achievement check function—queries for new achievements and returns newly earned ones
export async function checkAchievements(
  userId: string,
  cohortId: string,
): Promise<EarnedAchievement[]> {
  const definitions = await AchievementDefinition.find({ isActive: true }).lean();
  if (definitions.length === 0) return [];

  // Filter out already earned achievements to avoid duplicates
  const existingInstances = await AchievementInstance.find({ userId }).lean();
  const earnedIds = new Set(
    existingInstances.map((i) => String(i.achievementId)),
  );

  const unearnedDefinitions = definitions.filter(
    (d) => !earnedIds.has(String(d._id)),
  );
  if (unearnedDefinitions.length === 0) return [];

  // Fetch and normalize user's completed exercises
  const allProgress = await Progress.find({
    userId,
    status: 'completed',
  }).lean();

  const completedProgress = allProgress.map((p) => ({
    exerciseId: String(p.exerciseId),
    uniqueAttempts: p.uniqueAttempts,
    solutionViewed: p.solutionViewed,
    score: p.score,
  }));

  // Build exercise metadata map for fast lookups during criteria evaluation
  const exerciseIds = completedProgress.map((p) => p.exerciseId);
  const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).lean();
  const exerciseMap = new Map(
    exercises.map((e) => [
      String(e._id),
      {
        type: e.type,
        tier: e.tier,
        collectionId: e.collectionId ? String(e.collectionId) : undefined,
      },
    ]),
  );

  const newlyEarned: EarnedAchievement[] = [];

  // Check each unearned achievement and persist those that are now met
  for (const definition of unearnedDefinitions) {
    const met = await evaluateCriteria(
      definition as unknown as IAchievementDefinition,
      userId,
      completedProgress,
      exerciseMap,
    );

    if (met) {
      const instance = await AchievementInstance.create({
        userId,
        achievementId: definition._id,
        cohortId,
        earnedAt: new Date(),
        metadata: {},
      });

      newlyEarned.push({
        _id: String(instance._id),
        achievementId: String(definition._id),
        name: definition.name,
        description: definition.description,
        icon: definition.icon,
        earnedAt: instance.earnedAt.toISOString(),
      });
    }
  }

  return newlyEarned;
}

export async function getAllDefinitions() {
  return AchievementDefinition.find({ isActive: true }).sort({ name: 1 }).lean();
}

// Returns all achievements earned by a user with full definition details
export async function getUserAchievements(userId: string) {
  const instances = await AchievementInstance.find({ userId })
    .populate('achievementId')
    .lean();

  // Enrich instances with populated achievement definitions for client display
  return instances.map((inst) => {
    const def = inst.achievementId as unknown as IAchievementDefinition;
    return {
      _id: String(inst._id),
      userId: String(inst.userId),
      achievementId: String(def._id),
      cohortId: String(inst.cohortId),
      earnedAt: inst.earnedAt.toISOString(),
      metadata: inst.metadata,
      definition: {
        _id: String(def._id),
        name: def.name,
        description: def.description,
        icon: def.icon,
        criteriaType: def.criteriaType,
        criteriaParams: def.criteriaParams,
        isActive: def.isActive,
      },
    };
  });
}
