import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md';
  interactive?: boolean;
  onRate?: (stars: number) => void;
}

function StarIcon({ filled, half, color, size }: { filled: boolean; half: boolean; color: string; size: number }) {
  if (half) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id={`half-${size}`}>
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#half-${size})`}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden="true">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? color : 'none'}
        stroke={filled ? color : 'var(--text-muted)'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RatingStars({ rating, size = 'md', interactive = false, onRate }: RatingStarsProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const starSize = size === 'sm' ? 14 : 20;
  const displayRating = hoverValue || rating;
  const filledColor = '#f59e0b';

  return (
    <div
      className="flex items-center"
      role={interactive ? 'group' : undefined}
      aria-label={interactive ? 'Rate this exercise' : `Rating: ${rating} out of 5 stars`}
      style={{ gap: size === 'sm' ? '1px' : '2px' }}
      onMouseLeave={interactive ? () => setHoverValue(0) : undefined}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = displayRating >= star;
        const isHalf = !isFilled && displayRating >= star - 0.5;

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star !== 1 ? 's' : ''}`}
              style={{ cursor: 'pointer', display: 'flex', background: 'none', border: 'none', padding: 0 }}
              onMouseEnter={() => setHoverValue(star)}
              onClick={onRate ? () => onRate(star) : undefined}
            >
              <StarIcon filled={isFilled} half={isHalf} color={filledColor} size={starSize} />
            </button>
          );
        }

        return (
          <span key={star} style={{ display: 'flex' }}>
            <StarIcon filled={isFilled} half={isHalf} color={filledColor} size={starSize} />
          </span>
        );
      })}
    </div>
  );
}
