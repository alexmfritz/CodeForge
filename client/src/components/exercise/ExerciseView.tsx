import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { saveSolution, resetExercise, selectSavedCode } from '../../features/progressSlice';
import { showToast, setSaveStatus } from '../../features/uiSlice';
import { debounce } from '../../utils/helpers';

// localStorage buffer for in-progress code (survives tab close / refresh)
const CODE_CACHE_PREFIX = 'codeforge_draft_';
function getCachedCode(exerciseId: string): string | null {
  try { return localStorage.getItem(CODE_CACHE_PREFIX + exerciseId); }
  catch { return null; }
}
function setCachedCode(exerciseId: string, code: string): void {
  try { localStorage.setItem(CODE_CACHE_PREFIX + exerciseId, code); }
  catch { /* quota exceeded — ignore */ }
}
function clearCachedCode(exerciseId: string): void {
  try { localStorage.removeItem(CODE_CACHE_PREFIX + exerciseId); }
  catch { /* ignore */ }
}
import Skeleton from '../shared/Skeleton';
import { useExerciseNavigation } from './hooks/useExerciseNavigation';
import { useTestRunner } from './hooks/useTestRunner';
import InstructionsPanel from './InstructionsPanel';
import TestResults from './TestResults';
import ExerciseToolbar from './ExerciseToolbar';
import ResetModal from './ResetModal';
import CompareModal from './CompareModal';
import EditorLayout from './EditorLayout';
import RatingPrompt from '../ratings/RatingPrompt';

export default function ExerciseView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const exercisesLoading = useAppSelector((s) => s.exercises.loading);
  const exercise = useAppSelector((s) =>
    s.exercises.exercises.find((ex) => ex._id === id),
  );
  const savedCode = useAppSelector(selectSavedCode(id ?? ''));
  const isComplete = useAppSelector(
    (s) => s.progress.items[id ?? '']?.status === 'completed',
  );

  const [code, setCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [activeTab, setActiveTab] = useState<'instructions' | 'results' | 'preview' | 'dataset'>('instructions');
  const [previewHtml, setPreviewHtml] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const prevIsCompleteRef = useRef(isComplete);

  useEffect(() => {
    if (isComplete && !prevIsCompleteRef.current) {
      const timer = setTimeout(() => setShowRatingPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
    prevIsCompleteRef.current = isComplete;
  }, [isComplete]);

  const { sortedExercises, currentIndex, prevExercise, nextExercise, navContext } =
    useExerciseNavigation(id ?? '');

  const { testResults, isRunning, duplicateWarning, runTests, clearResults } =
    useTestRunner(exercise, code, cssCode, () => setActiveTab('results'));

  useEffect(() => {
    if (!exercise) return;
    // Priority: server-saved code > localStorage draft > starter code
    const cached = getCachedCode(exercise._id);
    const initialCode = savedCode ?? cached ?? exercise.starterCode;
    if (exercise.type === 'html-css') {
      setCode(initialCode);
      setCssCode('');
    } else {
      setCode(initialCode);
    }
    clearResults();
    setActiveTab('instructions');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise?._id]);

  useEffect(() => {
    if (!exercise) return;
    if (exercise.type === 'js') return;
    if (exercise.type === 'css') {
      setPreviewHtml(`<style>${cssCode || code}</style>${exercise.providedHtml ?? ''}`);
    } else if (exercise.type === 'html') {
      setPreviewHtml(code);
    } else if (exercise.type === 'html-css') {
      setPreviewHtml(`<style>${cssCode}</style>${code}`);
    }
  }, [code, cssCode, exercise]);

  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const debouncedSave = useRef(
    debounce((exerciseId: string, codeToSave: string) => {
      dispatchRef.current(setSaveStatus('saving'));
      dispatchRef.current(saveSolution({ exerciseId, code: codeToSave }))
        .then(() => {
          clearCachedCode(exerciseId); // server has it — clear local draft
          dispatchRef.current(setSaveStatus('saved'));
          clearTimeout(saveTimerRef.current);
          saveTimerRef.current = setTimeout(() => dispatchRef.current(setSaveStatus('idle')), 2000);
        })
        .catch(() => {
          dispatchRef.current(setSaveStatus('idle'));
          // localStorage draft remains as fallback
        });
    }, 1000),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSave.flush(); // fire any pending server save on unmount
      clearTimeout(saveTimerRef.current);
    };
  }, [debouncedSave]);

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      if (exercise && newCode !== exercise.starterCode) {
        setCachedCode(exercise._id, newCode);
        debouncedSave(exercise._id, newCode);
      }
    },
    [exercise, debouncedSave],
  );

  const handleCssChange = useCallback(
    (newCss: string) => {
      setCssCode(newCss);
      if (exercise && (code !== exercise.starterCode || newCss !== '')) {
        const combined = code + '\n/*CSS*/\n' + newCss;
        setCachedCode(exercise._id, combined);
        debouncedSave(exercise._id, combined);
      }
    },
    [exercise, code, debouncedSave],
  );

  const handleReset = async () => {
    if (!exercise) return;
    try {
      await dispatch(resetExercise(exercise._id)).unwrap();
      clearCachedCode(exercise._id);
      setCode(exercise.starterCode);
      setCssCode('');
      clearResults();
      setShowResetModal(false);
      setActiveTab('instructions');
    } catch {
      dispatch(showToast({ message: 'Reset failed — server may be offline', type: 'error' }));
      setShowResetModal(false);
    }
  };

  const canReset = !!savedCode || isComplete;

  if (!exercise && exercisesLoading) {
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-shrink-0 overflow-hidden flex flex-col" style={{ width: '40%', minWidth: '320px', backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton width="32px" height="20px" borderRadius="10px" />
              <Skeleton width="40px" height="20px" borderRadius="4px" />
            </div>
            <Skeleton width="60%" height="20px" />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <Skeleton height="14px" width="90%" />
            <Skeleton height="14px" width="75%" />
            <Skeleton height="14px" width="85%" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-2" style={{ backgroundColor: 'var(--bg-raised)', borderBottom: '1px solid var(--border)' }}>
            <Skeleton width="200px" height="24px" />
            <Skeleton width="100px" height="30px" borderRadius="6px" />
          </div>
          <div className="flex-1" style={{ backgroundColor: 'var(--bg-editor)' }} />
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: 'var(--text-muted)' }}>
        <p className="text-sm">Exercise not found.</p>
        <button
          onClick={() => navigate('/exercises')}
          className="text-sm px-4 py-2 rounded"
          style={{ backgroundColor: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  const passCount = testResults.filter((r) => r.pass).length;

  const previewPanel = (
    <div className="h-full p-3">
      <iframe
        title="Live preview"
        className="w-full rounded"
        style={{ height: '100%', backgroundColor: '#fff', border: '1px solid var(--border)' }}
        srcDoc={previewHtml}
        sandbox="allow-scripts"
      />
    </div>
  );

  return (
    <div className="flex h-full overflow-hidden">
      {!panelCollapsed && (
        <div className="flex-shrink-0 overflow-hidden" style={{ width: '40%', minWidth: '320px' }}>
          <InstructionsPanel
            exercise={exercise}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            testResultCount={testResults.length}
            testPassCount={passCount}
          >
            {activeTab === 'results' ? (
              <TestResults results={testResults} isRunning={isRunning} />
            ) : (
              previewPanel
            )}
          </InstructionsPanel>
        </div>
      )}
      <button
        onClick={() => setPanelCollapsed((v) => !v)}
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: '20px',
          backgroundColor: 'var(--bg-raised)',
          border: 'none',
          borderLeft: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          cursor: 'pointer',
          color: 'var(--text-muted)',
        }}
        aria-label={panelCollapsed ? 'Show instructions panel' : 'Hide instructions panel'}
      >
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: panelCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ExerciseToolbar
          exercise={exercise}
          prevExercise={prevExercise}
          nextExercise={nextExercise}
          currentIndex={currentIndex}
          totalCount={sortedExercises.length}
          navContext={navContext}
          isRunning={isRunning}
          duplicateWarning={duplicateWarning}
          canReset={canReset}
          isComplete={isComplete}
          onReset={() => setShowResetModal(true)}
          onRunTests={runTests}
          onCompare={() => setShowCompare(true)}
        />
        <ResetModal isOpen={showResetModal} isComplete={isComplete} onConfirm={handleReset} onCancel={() => setShowResetModal(false)} />
        <CompareModal isOpen={showCompare} studentCode={code} referenceCode={exercise.solution} language={exercise.type} onClose={() => setShowCompare(false)} />
        <EditorLayout exerciseType={exercise.type} code={code} cssCode={cssCode} onCodeChange={handleCodeChange} onCssChange={handleCssChange} onRun={runTests} />
      </div>
      {showRatingPrompt && (
        <RatingPrompt exerciseId={exercise._id} onClose={() => setShowRatingPrompt(false)} />
      )}
    </div>
  );
}
