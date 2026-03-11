import { useState, useCallback, useRef, useEffect } from 'react';
import { store, useAppDispatch } from '../../../features/store';
import {
  recordAttempt,
  markComplete,
  recordLocalFailedAttempt,
  selectIsDuplicateCode,
} from '../../../features/progressSlice';
import {
  addNewlyEarned,
  showAchievementToast,
} from '../../../features/achievementsSlice';
import { runJsTests } from '../../../runners/jsRunner';
import { runHtmlTests } from '../../../runners/htmlRunner';
import { runCssTests } from '../../../runners/cssRunner';
import { runHtmlCssTests } from '../../../runners/htmlCssRunner';
import { showToast } from '../../../features/uiSlice';
import { getRandomCelebration } from '../../../utils/celebrationMessages';
import type { Exercise, TestResult } from '@codeforge/shared';

function hashCode(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return String(hash);
}

interface UseTestRunnerResult {
  testResults: TestResult[];
  isRunning: boolean;
  duplicateWarning: boolean;
  runTests: () => Promise<void>;
  clearResults: () => void;
}

export function useTestRunner(
  exercise: Exercise | undefined,
  code: string,
  cssCode: string,
  onTestsStart: () => void,
  reviewId?: string | null,
): UseTestRunnerResult {
  const dispatch = useAppDispatch();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Clear pending cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(cleanupTimerRef.current);
      cleanupRef.current?.();
    };
  }, []);

  const clearResults = useCallback(() => {
    setTestResults([]);
  }, []);

  const runTests = useCallback(async () => {
    if (!exercise) return;

    const fullCode = exercise.type === 'html-css' ? code + '\n' + cssCode : code;
    const codeHash = hashCode(fullCode.trim());

    const isDuplicate = selectIsDuplicateCode(exercise._id, fullCode)(store.getState());
    if (isDuplicate) {
      setDuplicateWarning(true);
      setTimeout(() => setDuplicateWarning(false), 3000);
    } else {
      setDuplicateWarning(false);
    }

    cleanupRef.current?.();
    setIsRunning(true);
    onTestsStart();

    let results: TestResult[] = [];

    try {
      if (exercise.type === 'js') {
        results = await runJsTests(code, exercise.testRunner);
      } else if (exercise.type === 'html') {
        results = runHtmlTests(code, exercise.testCases ?? []);
      } else if (exercise.type === 'css') {
        const { results: r, cleanup } = await runCssTests(code, exercise.providedHtml ?? '', exercise.testCases ?? []);
        results = r;
        cleanupRef.current = cleanup;
        cleanupTimerRef.current = setTimeout(() => cleanup(), 2000);
      } else if (exercise.type === 'html-css') {
        const { results: r, cleanup } = await runHtmlCssTests(code, cssCode, exercise.testCases ?? []);
        results = r;
        cleanupRef.current = cleanup;
        cleanupTimerRef.current = setTimeout(() => cleanup(), 2000);
      }
    } catch (err) {
      results = [{ pass: false, description: `Test error: ${err instanceof Error ? err.message : String(err)}` }];
    }

    setTestResults(results);
    setIsRunning(false);

    const allPass = results.length > 0 && results.every((r) => r.pass);

    // Don't record attempts for reviews (original progress stays untouched)
    if (!reviewId) {
      void dispatch(recordAttempt({ exerciseId: exercise._id, codeHash, passed: allPass }));
    }

    if (allPass) {
      if (reviewId) {
        // REVIEW MODE: complete the review, show toast, skip progress/achievements
        const { completeReview } = await import('../../../features/reviewSlice');
        void dispatch(completeReview(reviewId));
        dispatch(showToast({ message: 'Review complete! Great refresher!', type: 'success' }));
      } else {
        // NORMAL MODE
        const wasAlreadyComplete = store.getState().progress.items[exercise._id]?.status === 'completed';
        const progress = store.getState().progress.items[exercise._id];
        const completeResult = await dispatch(markComplete({
          exerciseId: exercise._id,
          attempts: Math.max(progress?.uniqueAttempts ?? 0, 1),
          solutionViewed: progress?.solutionViewed ?? false,
        }));
        if (!wasAlreadyComplete) {
          dispatch(showToast({ message: getRandomCelebration(), type: 'celebration' }));
        }
        if (markComplete.fulfilled.match(completeResult)) {
          const earned = completeResult.payload.newAchievements;
          if (earned.length > 0) {
            dispatch(addNewlyEarned(earned));
            setTimeout(() => {
              dispatch(showAchievementToast(earned[0]));
            }, 1500);
          }
          // Push new review into state if one was queued
          if (completeResult.payload.newReview) {
            const { setPendingReview } = await import('../../../features/reviewSlice');
            dispatch(setPendingReview(completeResult.payload.newReview));
          }
        }
      }
    } else if (!isDuplicate) {
      dispatch(recordLocalFailedAttempt({ exerciseId: exercise._id, code: fullCode }));
    }
  }, [exercise, code, cssCode, dispatch, onTestsStart, reviewId]);

  return { testResults, isRunning, duplicateWarning, runTests, clearResults };
}
