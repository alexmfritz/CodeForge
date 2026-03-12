import type { Exercise, Progress, Collection } from '@codeforge/shared';

export interface Recommendation {
  exercise: Exercise;
  reason: string;
}

interface RecommendationInput {
  currentExercise: Exercise;
  exercises: Exercise[];
  progress: Record<string, Progress>;
  collections: Collection[];
  browseFilter: {
    collectionId: string | null;
    categoryPath: string[];
    tier: number | null;
  };
}

/**
 * Context-aware recommendation for the next exercise to attempt.
 *
 * Priority order:
 * 1. Collection context — next incomplete in collection order
 * 2. Same category + same tier
 * 3. Same category + next tier up
 * 4. Same domain + same tier
 * 5. Any incomplete at same tier (excluding collections)
 */
export function getNextRecommendation(input: RecommendationInput): Recommendation | null {
  const { currentExercise, exercises, progress, collections, browseFilter } = input;
  const isIncomplete = (ex: Exercise) => progress[ex._id]?.status !== 'completed';

  // 1. Collection context — next incomplete in collection order
  const collectionId = browseFilter.collectionId || currentExercise.collectionId || null;
  if (collectionId && collectionId !== '__in-progress__') {
    const col = collections.find((c) => c._id === collectionId);
    if (col) {
      const currentIdx = col.exerciseIds.indexOf(currentExercise._id);
      if (currentIdx !== -1) {
        // Look forward first
        for (let i = currentIdx + 1; i < col.exerciseIds.length; i++) {
          const ex = exercises.find((e) => e._id === col.exerciseIds[i]);
          if (ex && isIncomplete(ex)) return { exercise: ex, reason: `Next in ${col.name}` };
        }
        // Wrap around — check before current
        for (let i = 0; i < currentIdx; i++) {
          const ex = exercises.find((e) => e._id === col.exerciseIds[i]);
          if (ex && isIncomplete(ex)) return { exercise: ex, reason: `Incomplete in ${col.name}` };
        }
      }
    }
  }

  // 2. Same category + same tier
  const [domain, subdomain] = currentExercise.category;
  if (domain && subdomain) {
    const sameCategorySameTier = exercises
      .filter(
        (e) =>
          e._id !== currentExercise._id &&
          e.category[0] === domain &&
          e.category[1] === subdomain &&
          e.tier === currentExercise.tier &&
          isIncomplete(e),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
    if (sameCategorySameTier.length > 0) {
      return { exercise: sameCategorySameTier[0], reason: `More ${subdomain}` };
    }

    // 3. Same category + next tier up
    const sameCategoryNextTier = exercises
      .filter(
        (e) =>
          e._id !== currentExercise._id &&
          e.category[0] === domain &&
          e.category[1] === subdomain &&
          e.tier === currentExercise.tier + 1 &&
          isIncomplete(e),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
    if (sameCategoryNextTier.length > 0) {
      return { exercise: sameCategoryNextTier[0], reason: `Level up to Tier ${currentExercise.tier + 1}` };
    }

    // 4. Same domain + same tier
    const sameDomainSameTier = exercises
      .filter(
        (e) =>
          e._id !== currentExercise._id &&
          e.category[0] === domain &&
          e.tier === currentExercise.tier &&
          isIncomplete(e),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
    if (sameDomainSameTier.length > 0) {
      return { exercise: sameDomainSameTier[0], reason: `More ${domain}` };
    }
  }

  // 5. Any incomplete at same tier (excluding collection exercises)
  const anyIncompleteSameTier = exercises
    .filter(
      (e) =>
        e._id !== currentExercise._id &&
        e.tier === currentExercise.tier &&
        !e.collectionId &&
        isIncomplete(e),
    )
    .sort((a, b) => a.title.localeCompare(b.title));
  if (anyIncompleteSameTier.length > 0) {
    return { exercise: anyIncompleteSameTier[0], reason: `Tier ${currentExercise.tier} exercise` };
  }

  return null;
}
