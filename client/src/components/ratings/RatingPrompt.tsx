import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { submitRating, fetchUserRating, selectUserRating } from '../../features/ratingsSlice';
import RatingStars from './RatingStars';

interface RatingPromptProps {
  exerciseId: string;
  onClose: () => void;
}

// Fixed-position prompt shown after exercise completion
export default function RatingPrompt({ exerciseId, onClose }: RatingPromptProps) {
  const dispatch = useAppDispatch();
  const userRating = useAppSelector(selectUserRating(exerciseId));

  // Load any existing user rating on mount
  useEffect(() => {
    dispatch(fetchUserRating(exerciseId));
  }, [dispatch, exerciseId]);

  // Dispatch upsert on star click
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
      {/* Show confirmation text after user has rated */}
      {userRating && (
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          You rated this {userRating} star{userRating !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
