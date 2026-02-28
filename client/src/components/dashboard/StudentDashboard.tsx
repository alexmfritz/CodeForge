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
import AssignmentList from '../assignments/AssignmentList';
import Skeleton from '../shared/Skeleton';

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stats, loading } = useAppSelector((s) => s.dashboard);
  const exerciseCount = useAppSelector((s) => s.exercises.exercises.length);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

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
          totalExercises={exerciseCount}
        />

        <StatsRow
          completedCount={stats.completedCount}
          inProgressCount={stats.inProgressCount}
          totalAttempts={stats.totalAttempts}
          totalScore={stats.totalScore}
        />

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <TierBreakdown tierBreakdown={stats.tierBreakdown} />
          <TypeBreakdown typeBreakdown={stats.typeBreakdown} />
        </div>

        <CollectionProgress />

        <RecentActivity items={stats.recentActivity} />

        <div>
          <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            Assignments
          </h3>
          <AssignmentList />
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
