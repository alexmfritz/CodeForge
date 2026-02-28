import { useState, useCallback, useRef } from 'react';
import { store, useAppDispatch } from '../../../features/store';
import {
  recordAttempt,
  markComplete,
  recordLocalFailedAttempt,
  selectIsDuplicateCode,
} from '../../../features/progressSlice';
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
): UseTestRunnerResult {
  const dispatch = useAppDispatch();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

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
        setTimeout(() => cleanup(), 2000);
      } else if (exercise.type === 'html-css') {
        const { results: r, cleanup } = await runHtmlCssTests(code, cssCode, exercise.testCases ?? []);
        results = r;
        cleanupRef.current = cleanup;
        setTimeout(() => cleanup(), 2000);
      }
    } catch (err) {
      results = [{ pass: false, description: `Test error: ${err instanceof Error ? err.message : String(err)}` }];
    }

    setTestResults(results);
    setIsRunning(false);

    const allPass = results.length > 0 && results.every((r) => r.pass);

    // Record attempt on server
    void dispatch(recordAttempt({ exerciseId: exercise._id, codeHash, passed: allPass }));

    if (allPass) {
      const wasAlreadyComplete = store.getState().progress.items[exercise._id]?.status === 'completed';
      const progress = store.getState().progress.items[exercise._id];
      void dispatch(markComplete({
        exerciseId: exercise._id,
        attempts: progress?.uniqueAttempts ?? 1,
        solutionViewed: progress?.solutionViewed ?? false,
      }));
      if (!wasAlreadyComplete) {
        dispatch(showToast({ message: getRandomCelebration(), type: 'celebration' }));
      }
    } else if (!isDuplicate) {
      dispatch(recordLocalFailedAttempt({ exerciseId: exercise._id, code: fullCode }));
    }
  }, [exercise, code, cssCode, dispatch, onTestsStart]);

  return { testResults, isRunning, duplicateWarning, runTests, clearResults };
}
