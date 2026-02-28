import { useMemo } from 'react';
import { useAppSelector } from '../../../features/store';
import type { Exercise } from '@codeforge/shared';

interface UseExerciseNavigationResult {
  sortedExercises: Exercise[];
  currentIndex: number;
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  navContext: string | null;
}

export function useExerciseNavigation(exerciseId: string): UseExerciseNavigationResult {
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const collections = useAppSelector((s) => s.exercises.collections);
  const browseFilter = useAppSelector((s) => s.ui.browseFilter);

  const sortedExercises = useMemo(() => {
    let result = exercises;

    if (browseFilter.categoryPath.length > 0) {
      result = result.filter((ex) =>
        browseFilter.categoryPath.every((seg, i) => ex.category[i] === seg),
      );
    }

    if (browseFilter.collectionId && browseFilter.collectionId !== '__in-progress__') {
      const col = collections.find((c) => c._id === browseFilter.collectionId);
      if (col) {
        return col.exerciseIds
          .map((eid) => result.find((ex) => ex._id === eid))
          .filter(Boolean) as typeof exercises;
      }
    }

    if (browseFilter.tier) {
      result = result.filter((ex) => ex.tier === browseFilter.tier);
    }

    return [...result].sort((a, b) => a.tier - b.tier || a.title.localeCompare(b.title));
  }, [exercises, collections, browseFilter]);

  const currentIndex = sortedExercises.findIndex((ex) => ex._id === exerciseId);
  const prevExercise = currentIndex > 0 ? sortedExercises[currentIndex - 1] : null;
  const nextExercise =
    currentIndex >= 0 && currentIndex < sortedExercises.length - 1
      ? sortedExercises[currentIndex + 1]
      : null;

  const navContext = useMemo(() => {
    if (browseFilter.collectionId && browseFilter.collectionId !== '__in-progress__') {
      const col = collections.find((c) => c._id === browseFilter.collectionId);
      return col?.name ?? null;
    }
    if (browseFilter.categoryPath.length > 0) {
      return browseFilter.categoryPath[browseFilter.categoryPath.length - 1]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    if (browseFilter.tier) return `Tier ${browseFilter.tier}`;
    return null;
  }, [browseFilter, collections]);

  return { sortedExercises, currentIndex, prevExercise, nextExercise, navContext };
}
