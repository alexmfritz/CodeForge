import { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import RatingStars from './RatingStars';

interface RatingOverviewProps {
  cohortId?: string;
}

interface ExerciseRatingRow {
  exerciseId: string;
  title: string;
  averageStars: number;
  totalRatings: number;
}

interface OverviewData {
  averageStars: number;
  totalRatings: number;
  topRated: ExerciseRatingRow[];
  lowestRated: ExerciseRatingRow[];
}

export default function RatingOverview({ cohortId }: RatingOverviewProps) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = cohortId ? `?cohortId=${cohortId}` : '';
    apiFetch<OverviewData>(`/api/ratings/overview${query}`)
      .then((result) => {
        if (result.success && result.data) {
          setData(result.data);
        }
      })
      .finally(() => setLoading(false));
  }, [cohortId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading ratings...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Failed to load ratings overview.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Total Ratings</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{data.totalRatings}</div>
        </div>
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Average Rating</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {data.averageStars.toFixed(1)}
            </span>
            <RatingStars rating={data.averageStars} size="sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Top Rated Exercises
          </h3>
          {data.topRated.length === 0 ? (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>No ratings yet.</span>
          ) : (
            <div className="flex flex-col gap-2">
              {data.topRated.map((row) => (
                <div key={row.exerciseId} className="flex items-center justify-between gap-2">
                  <span className="text-xs truncate flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {row.title}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <RatingStars rating={row.averageStars} size="sm" />
                    <span className="text-xs" style={{ color: 'var(--text-muted)', minWidth: '28px', textAlign: 'right' }}>
                      ({row.totalRatings})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Lowest Rated Exercises
          </h3>
          {data.lowestRated.length === 0 ? (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>No ratings yet.</span>
          ) : (
            <div className="flex flex-col gap-2">
              {data.lowestRated.map((row) => (
                <div key={row.exerciseId} className="flex items-center justify-between gap-2">
                  <span className="text-xs truncate flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {row.title}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <RatingStars rating={row.averageStars} size="sm" />
                    <span className="text-xs" style={{ color: 'var(--text-muted)', minWidth: '28px', textAlign: 'right' }}>
                      ({row.totalRatings})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
