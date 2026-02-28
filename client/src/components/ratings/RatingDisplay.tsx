import { useAppSelector } from '../../features/store';
import { selectExerciseRating } from '../../features/ratingsSlice';

interface RatingDisplayProps {
  exerciseId: string;
}

// Compact inline badge showing average stars and count for an exercise
export default function RatingDisplay({ exerciseId }: RatingDisplayProps) {
  const rating = useAppSelector(selectExerciseRating(exerciseId));

  // Hide when no ratings exist yet
  if (!rating || rating.totalRatings === 0) {
    return null;
  }

  return (
    <span
      className="inline-flex items-center gap-1 text-xs"
      style={{ color: 'var(--text-muted)' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#f59e0b"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      {/* Display average (1 decimal) and total count */}
      <span>{rating.averageStars.toFixed(1)}</span>
      <span>({rating.totalRatings})</span>
    </span>
  );
}
