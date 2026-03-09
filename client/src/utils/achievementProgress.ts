import type { AchievementDefinition, Exercise, Progress, Collection } from '@codeforge/shared';

export interface AchievementProgress {
  current: number;
  target: number;
}

/**
 * Computes client-side progress for unearned achievements.
 * Pure function — no React imports, no side effects.
 *
 * Returns a Map keyed by achievement definition _id.
 * Entries are omitted for earned achievements and for criteria
 * that can't be computed on the client (e.g. chat_messages).
 */
export function computeAchievementProgress(
  definitions: AchievementDefinition[],
  earnedIds: Set<string>,
  exercises: Exercise[],
  progressItems: Record<string, Progress>,
  collections: Collection[],
): Map<string, AchievementProgress> {
  const result = new Map<string, AchievementProgress>();

  // ── Pre-compute shared derived data (O(n) on completed entries) ────────

  const completedProgress: Array<{
    exerciseId: string;
    uniqueAttempts: number;
    solutionViewed: boolean;
    score: number;
    completedAt?: string;
  }> = [];

  for (const p of Object.values(progressItems)) {
    if (p.status === 'completed') {
      completedProgress.push({
        exerciseId: p.exerciseId,
        uniqueAttempts: p.uniqueAttempts,
        solutionViewed: p.solutionViewed,
        score: p.score,
        completedAt: p.completedAt,
      });
    }
  }

  const completedIds = new Set(completedProgress.map((p) => p.exerciseId));
  const totalCompleted = completedProgress.length;
  const totalScore = completedProgress.reduce((sum, p) => sum + p.score, 0);

  // Exercise lookup map
  const exerciseMap = new Map<string, Exercise>();
  for (const ex of exercises) {
    exerciseMap.set(ex._id, ex);
  }

  // Tier counts
  const tierCounts = new Map<number, number>();
  for (const p of completedProgress) {
    const ex = exerciseMap.get(p.exerciseId);
    if (ex) {
      tierCounts.set(ex.tier, (tierCounts.get(ex.tier) ?? 0) + 1);
    }
  }

  // Type counts
  const typeCounts = new Map<string, number>();
  for (const p of completedProgress) {
    const ex = exerciseMap.get(p.exerciseId);
    if (ex) {
      typeCounts.set(ex.type, (typeCounts.get(ex.type) ?? 0) + 1);
    }
  }

  // Perfect count: first attempt, no solution viewed
  const perfectCount = completedProgress.filter(
    (p) => p.uniqueAttempts <= 1 && !p.solutionViewed,
  ).length;

  // No-solution count
  const noSolutionCount = completedProgress.filter(
    (p) => !p.solutionViewed,
  ).length;

  // Distinct tiers, types, categories
  const distinctTiers = new Set<number>();
  const distinctTypes = new Set<string>();
  const distinctCategories = new Set<string>();
  for (const p of completedProgress) {
    const ex = exerciseMap.get(p.exerciseId);
    if (ex) {
      distinctTiers.add(ex.tier);
      distinctTypes.add(ex.type);
      if (ex.category?.[0]) distinctCategories.add(ex.category[0]);
    }
  }

  // Max daily completions
  const dayCounts = new Map<string, number>();
  for (const p of completedProgress) {
    if (p.completedAt) {
      const day = p.completedAt.slice(0, 10);
      dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
    }
  }
  let maxDaily = 0;
  for (const count of dayCounts.values()) {
    if (count > maxDaily) maxDaily = count;
  }

  // Completed collections count (non-default, non-hidden)
  let completedCollectionsCount = 0;
  const collectionCompletionMap = new Map<string, { completed: number; total: number }>();
  for (const col of collections) {
    if (col.isDefault || col.hidden) continue;
    const total = col.exerciseIds.length;
    if (total === 0) continue;
    let completed = 0;
    for (const exId of col.exerciseIds) {
      if (completedIds.has(exId)) completed++;
    }
    collectionCompletionMap.set(col._id, { completed, total });
    if (completed >= total) completedCollectionsCount++;
  }

  // Total active exercises count
  const totalExercises = exercises.filter((e) => e.isActive).length;

  // ── Iterate unearned definitions and compute progress ──────────────────

  for (const def of definitions) {
    if (earnedIds.has(def._id)) continue;

    const params = def.criteriaParams;
    let progress: AchievementProgress | null = null;

    switch (def.criteriaType) {
      case 'exercises_completed':
        progress = { current: totalCompleted, target: params.count as number };
        break;

      case 'tier_completed':
        progress = {
          current: tierCounts.get(params.tier as number) ?? 0,
          target: params.count as number,
        };
        break;

      case 'type_completed':
        progress = {
          current: typeCounts.get(params.type as string) ?? 0,
          target: params.count as number,
        };
        break;

      case 'score_reached':
        progress = { current: totalScore, target: params.score as number };
        break;

      case 'collection_completed': {
        const colId = params.collectionId as string;
        const col = collections.find((c) => c._id === colId);
        if (col) {
          const entry = collectionCompletionMap.get(col._id);
          progress = entry
            ? { current: entry.completed, target: entry.total }
            : { current: 0, target: col.exerciseIds.length };
        }
        break;
      }

      case 'perfect_score':
        progress = { current: perfectCount, target: params.count as number };
        break;

      case 'streak':
        progress = { current: noSolutionCount, target: params.count as number };
        break;

      case 'all_exercises':
        progress = { current: totalCompleted, target: totalExercises };
        break;

      case 'all_tiers':
        progress = { current: distinctTiers.size, target: 5 };
        break;

      case 'all_types': {
        const requiredTypes = (params.types as string[]) ?? ['js', 'css', 'html'];
        progress = { current: distinctTypes.size, target: requiredTypes.length };
        break;
      }

      case 'collections_count':
        progress = { current: completedCollectionsCount, target: params.count as number };
        break;

      case 'categories_explored':
        progress = { current: distinctCategories.size, target: params.count as number };
        break;

      case 'daily_completed':
        progress = { current: maxDaily, target: params.count as number };
        break;

      case 'chat_messages':
        // Can't compute on client — skip
        break;

      default:
        break;
    }

    if (progress) {
      result.set(def._id, progress);
    }
  }

  return result;
}
