import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchDashboardStats } from '../../features/dashboardSlice';
import ScoreCard from './ScoreCard';
import StatsRow from './StatsRow';
import TierBreakdown from './TierBreakdown';
import TypeBreakdown from './TypeBreakdown';
import CollectionProgress from './CollectionProgress';
import RecentActivity from './RecentActivity';
import Skeleton from '../shared/Skeleton';

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stats, loading } = useAppSelector((s) => s.dashboard);
  const exerciseCount = useAppSelector((s) => s.exercises.exercises.length); // sourced from exercises slice, not stats, so it stays fresh

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]); // refetch on mount to pick up any progress changes since last visit

  // show skeletons only on first load; subsequent refreshes keep stale data visible
  if (loading && !stats) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <Skeleton height="160px" />
          <Skeleton height="80px" />
          <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Skeleton height="240px" />
            <Skeleton height="240px" />
          </div>
        </div>
      </div>
    );
  }

  // stats will be null before the first fetch resolves; avoids a flash of empty UI
  if (!stats) return null;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <button
            onClick={() => navigate('/exercises')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
            }}
          >
            Browse Exercises
          </button>
        </div>

        <ScoreCard
          totalScore={stats.totalScore}
          completedCount={stats.completedCount}
          totalExercises={exerciseCount} // live count from store, not cached in stats
        />

        <StatsRow
          completedCount={stats.completedCount}
          inProgressCount={stats.inProgressCount}
          totalAttempts={stats.totalAttempts}
          totalScore={stats.totalScore}
        />

        {/* auto-fit so the two panels stack on narrow screens */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <TierBreakdown tierBreakdown={stats.tierBreakdown} />
          <TypeBreakdown typeBreakdown={stats.typeBreakdown} />
        </div>

        {/* CollectionProgress reads directly from store to avoid duplicating collection data in stats */}
        <CollectionProgress />

        <RecentActivity items={stats.recentActivity} />

        {/* placeholder panels — dashed border signals unimplemented features to reviewers */}
        <div
          className="rounded-lg p-5"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px dashed var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
            Assignments
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Assignments from your instructor will appear here.
          </p>
        </div>

        <div
          className="rounded-lg p-5 mb-8"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px dashed var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
            Achievements
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Earn achievements by completing exercises and reaching milestones.
          </p>
        </div>
      </div>
    </div>
  );
}
