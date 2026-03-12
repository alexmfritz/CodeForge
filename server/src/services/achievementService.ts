import mongoose from 'mongoose';
import { AchievementDefinition, IAchievementDefinition } from '../models/AchievementDefinition.js';
import { AchievementInstance } from '../models/AchievementInstance.js';
import { Progress } from '../models/Progress.js';
import { Exercise } from '../models/Exercise.js';
import { Collection } from '../models/Collection.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { User } from '../models/User.js';

interface EarnedAchievement {
  _id: string;
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

async function evaluateCriteria(
  definition: IAchievementDefinition,
  userId: string,
  completedProgress: Array<{
    exerciseId: string;
    uniqueAttempts: number;
    solutionViewed: boolean;
    score: number;
    completedAt?: Date;
  }>,
  exerciseMap: Map<string, { type: string; tier: number; category: string[]; collectionId?: string }>,
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

    // ─── New criteria types ───────────────────────────────────────────────

    case 'all_exercises': {
      const totalExercises = await Exercise.countDocuments({ isActive: true });
      return totalExercises > 0 && completedProgress.length >= totalExercises;
    }

    case 'all_tiers': {
      const tiers = new Set<number>();
      for (const p of completedProgress) {
        const ex = exerciseMap.get(p.exerciseId);
        if (ex) tiers.add(ex.tier);
      }
      return [1, 2, 3, 4, 5].every((t) => tiers.has(t));
    }

    case 'all_types': {
      const types = new Set<string>();
      for (const p of completedProgress) {
        const ex = exerciseMap.get(p.exerciseId);
        if (ex) types.add(ex.type);
      }
      const requiredTypes = (params.types as string[]) || ['js', 'css', 'html'];
      return requiredTypes.every((t) => types.has(t));
    }

    case 'collections_count': {
      const requiredCount = params.count as number;
      const allCollections = await Collection.find({ hidden: false }).lean();
      const completedIds = new Set(completedProgress.map((p) => p.exerciseId));
      let completedCollections = 0;
      for (const col of allCollections) {
        if (col.isDefault) continue; // skip default curriculum
        const colExIds = col.exerciseIds.map((id) => String(id));
        if (colExIds.length > 0 && colExIds.every((id) => completedIds.has(id))) {
          completedCollections++;
        }
      }
      return completedCollections >= requiredCount;
    }

    case 'categories_explored': {
      const requiredCount = params.count as number;
      const categories = new Set<string>();
      for (const p of completedProgress) {
        const ex = exerciseMap.get(p.exerciseId);
        if (ex?.category?.[0]) categories.add(ex.category[0]);
      }
      return categories.size >= requiredCount;
    }

    case 'daily_completed': {
      const requiredCount = params.count as number;
      const dayCounts = new Map<string, number>();
      for (const p of completedProgress) {
        if (p.completedAt) {
          const day = new Date(p.completedAt).toISOString().slice(0, 10);
          dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
        }
      }
      return [...dayCounts.values()].some((count) => count >= requiredCount);
    }

    case 'chat_messages': {
      const requiredCount = params.count as number;
      const messageCount = await ChatMessage.countDocuments({ userId });
      return messageCount >= requiredCount;
    }

    default:
      return false;
  }
}

export async function checkAchievements(
  userId: string,
  cohortId: string,
): Promise<EarnedAchievement[]> {
  const definitions = await AchievementDefinition.find({ isActive: true }).lean();
  if (definitions.length === 0) return [];

  const existingInstances = await AchievementInstance.find({ userId }).lean();
  const earnedIds = new Set(
    existingInstances.map((i) => String(i.achievementId)),
  );

  const unearnedDefinitions = definitions.filter(
    (d) => !earnedIds.has(String(d._id)),
  );
  if (unearnedDefinitions.length === 0) return [];

  const allProgress = await Progress.find({
    userId,
    status: 'completed',
  }).lean();

  const completedProgress = allProgress.map((p) => ({
    exerciseId: String(p.exerciseId),
    uniqueAttempts: p.uniqueAttempts,
    solutionViewed: p.solutionViewed,
    score: p.score,
    completedAt: p.completedAt,
  }));

  const exerciseIds = completedProgress.map((p) => p.exerciseId);
  const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).lean();
  const exerciseMap = new Map(
    exercises.map((e) => [
      String(e._id),
      {
        type: e.type,
        tier: e.tier,
        category: e.category as string[],
        collectionId: e.collectionId ? String(e.collectionId) : undefined,
      },
    ]),
  );

  const newlyEarned: EarnedAchievement[] = [];

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

export async function getUserAchievements(userId: string) {
  const instances = await AchievementInstance.find({ userId })
    .populate('achievementId')
    .lean();

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

export async function getAchievementRarity(cohortId: string) {
  const [counts, totalStudents] = await Promise.all([
    AchievementInstance.aggregate([
      { $match: { cohortId: new mongoose.Types.ObjectId(cohortId) } },
      { $group: { _id: '$achievementId', count: { $sum: 1 } } },
    ]),
    User.countDocuments({
      cohortId: new mongoose.Types.ObjectId(cohortId),
      role: 'student',
      isActive: true,
    }),
  ]);

  const rarity: Record<string, { earned: number; total: number }> = {};
  for (const { _id, count } of counts) {
    rarity[_id.toString()] = { earned: count, total: totalStudents };
  }
  return rarity;
}
