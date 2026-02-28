import { useNavigate } from 'react-router-dom';
import type { Exercise } from '@codeforge/shared';
import SaveIndicator from './SaveIndicator';

interface ExerciseToolbarProps {
  exercise: Exercise;
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  currentIndex: number;
  totalCount: number;
  navContext: string | null;
  isRunning: boolean;
  duplicateWarning: boolean;
  canReset: boolean;
  isComplete?: boolean;
  onReset: () => void;
  onRunTests: () => void;
  onCompare?: () => void;
}

export default function ExerciseToolbar({
  exercise,
  prevExercise,
  nextExercise,
  currentIndex,
  totalCount,
  navContext,
  isRunning,
  duplicateWarning,
  canReset,
  isComplete,
  onReset,
  onRunTests,
  onCompare,
}: ExerciseToolbarProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-4 py-2"
      style={{ backgroundColor: 'var(--bg-raised)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/exercises')}
          className="text-xs px-2 py-1 rounded"
          style={{ color: 'var(--text-muted)', backgroundColor: 'transparent', border: '1px solid var(--border)', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <button
          onClick={() => prevExercise && navigate(`/exercises/${prevExercise._id}`)}
          disabled={!prevExercise}
          className="text-xs px-2 py-1 rounded"
          style={{
            color: prevExercise ? 'var(--text-muted)' : 'var(--text-faint)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            cursor: prevExercise ? 'pointer' : 'default',
            opacity: prevExercise ? 1 : 0.4,
          }}
          title={prevExercise ? `Previous: ${prevExercise.title}` : 'No previous exercise'}
        >
          ‹ Prev
        </button>
        {currentIndex >= 0 && (
          <span className="text-xs" style={{ color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums' }}>
            {currentIndex + 1}/{totalCount}
          </span>
        )}
        <button
          onClick={() => nextExercise && navigate(`/exercises/${nextExercise._id}`)}
          disabled={!nextExercise}
          className="text-xs px-2 py-1 rounded"
          style={{
            color: nextExercise ? 'var(--text-muted)' : 'var(--text-faint)',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            cursor: nextExercise ? 'pointer' : 'default',
            opacity: nextExercise ? 1 : 0.4,
          }}
          title={nextExercise ? `Next: ${nextExercise.title}` : 'No next exercise'}
        >
          Next ›
        </button>
        <span className="font-heading text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {exercise.title}
        </span>
        {navContext && (
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ color: 'var(--text-faint)', backgroundColor: 'var(--bg-surface)', fontFamily: 'Lexend, sans-serif' }}
          >
            {navContext}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {duplicateWarning && (
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ color: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', fontFamily: 'Lexend, sans-serif' }}
          >
            Same code — try a different approach
          </span>
        )}
        {canReset && (
          <button
            onClick={onReset}
            className="text-xs px-2 py-1 rounded flex items-center gap-1"
            style={{ color: 'var(--text-muted)', backgroundColor: 'transparent', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Lexend, sans-serif' }}
            title="Reset to starter code"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset
          </button>
        )}
        {isComplete && onCompare && (
          <button
            onClick={onCompare}
            className="text-xs px-2 py-1 rounded flex items-center gap-1"
            style={{ color: 'var(--accent)', backgroundColor: 'transparent', border: '1px solid var(--accent)', cursor: 'pointer', fontFamily: 'Lexend, sans-serif' }}
            title="Compare your solution with the reference"
          >
            Compare
          </button>
        )}
        <SaveIndicator />
        <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Ctrl+Enter to run</span>
        <button
          onClick={onRunTests}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-medium font-heading"
          style={{
            backgroundColor: isRunning ? 'var(--bg-raised)' : 'var(--accent)',
            color: isRunning ? 'var(--text-muted)' : '#fff',
            border: 'none',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          {isRunning ? 'Running…' : '▶ Run Tests'}
        </button>
      </div>
    </div>
  );
}
