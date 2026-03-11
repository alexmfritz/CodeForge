import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { skipReview, selectPendingReview } from '../../features/reviewSlice';
import { TIER_META } from '@codeforge/shared/constants';
import type { Tier } from '@codeforge/shared';

export default function ReviewCard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const review = useAppSelector(selectPendingReview);
  const exercises = useAppSelector((s) => s.exercises.exercises);

  if (!review) return null;

  const exercise = exercises.find((ex) => ex._id === review.exerciseId);
  if (!exercise) return null;

  const tierMeta = TIER_META[exercise.tier as Tier];

  const handleStart = () => {
    navigate(`/exercises/${exercise._id}?review=${review._id}`);
  };

  const handleSkip = () => {
    void dispatch(skipReview(review._id));
  };

  return (
    <div
      className="rounded-xl p-5 flex items-center gap-4"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--accent)',
        borderLeft: '4px solid var(--accent)',
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{
          width: 44,
          height: 44,
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          color: 'var(--accent)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Review Time!
        </h3>
        <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>
          <span
            className="tier-badge inline-flex items-center justify-center font-bold rounded-full mr-1"
            style={{
              width: 18,
              height: 18,
              fontSize: 8,
              backgroundColor: tierMeta.bgColor,
              border: `1px solid ${tierMeta.borderColor}`,
              color: tierMeta.color,
              verticalAlign: 'middle',
            }}
          >
            {tierMeta.label}
          </span>
          {exercise.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {exercise.description}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleSkip}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
        <button
          onClick={handleStart}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-root)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Start Review
        </button>
      </div>
    </div>
  );
}
