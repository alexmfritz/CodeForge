import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { submitRating, fetchUserRating, selectUserRating } from '../../features/ratingsSlice';
import RatingStars from './RatingStars';

const TIER_COLORS: Record<number, string> = { 1: '#22c55e', 2: '#3b82f6', 3: '#a855f7', 4: '#f59e0b', 5: '#ef4444' };

interface RecommendationData {
  exercise: { _id: string; title: string; tier: number; type: string };
  reason: string;
}

interface RatingPromptProps {
  exerciseId: string;
  onClose: () => void;
  recommendation?: RecommendationData;
  onNavigate?: (exerciseId: string) => void;
}

export default function RatingPrompt({ exerciseId, onClose, recommendation, onNavigate }: RatingPromptProps) {
  const dispatch = useAppDispatch();
  const userRating = useAppSelector(selectUserRating(exerciseId));

  useEffect(() => {
    dispatch(fetchUserRating(exerciseId));
  }, [dispatch, exerciseId]);

  const handleRate = (stars: number) => {
    dispatch(submitRating({ exerciseId, stars }));
  };

  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-lg"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        minWidth: '220px',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          Rate this exercise
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: '2px',
            display: 'flex',
          }}
          aria-label="Close rating prompt"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <RatingStars rating={userRating || 0} interactive onRate={handleRate} />
      {userRating && (
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          You rated this {userRating} star{userRating !== 1 ? 's' : ''}
        </span>
      )}
      {recommendation && (
        <div className="mt-1 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Up Next</span>
          <button
            onClick={() => onNavigate?.(recommendation.exercise._id)}
            className="w-full mt-1.5 flex items-center gap-2 px-3 py-2 rounded text-left text-sm transition-colors"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span
              className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: TIER_COLORS[recommendation.exercise.tier] || '#6b7280' }}
            >
              T{recommendation.exercise.tier}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium" style={{ color: 'var(--text-primary)' }}>
                {recommendation.exercise.title}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {recommendation.reason}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', flexShrink: 0 }}><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
