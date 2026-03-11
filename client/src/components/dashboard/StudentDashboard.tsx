import { useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchDashboardStats } from '../../features/dashboardSlice';
import {
  clearFilters,
  setTierFilter,
  setTypeFilter,
  setCollectionFilter,
  setStatusSort,
} from '../../features/uiSlice';
import type { Tier, ExerciseType } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { calcPercent } from '../../utils/helpers';
import ScoreCard from './ScoreCard';
import StatsRow from './StatsRow';
import TierBreakdown from './TierBreakdown';
import TypeBreakdown from './TypeBreakdown';
import CollectionProgress from './CollectionProgress';
import RecentActivity from './RecentActivity';
import ActivityHeatmap from './ActivityHeatmap';
import AssignmentList from '../assignments/AssignmentList';
import AchievementGrid from '../achievements/AchievementGrid';
import ChatLogViewer from '../chat/ChatLogViewer';
import Skeleton from '../shared/Skeleton';

type Tab = 'progress' | 'achievements' | 'cohort';

const TABS: { id: Tab; label: string }[] = [
  { id: 'progress', label: 'Progress' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'cohort', label: 'Cohort' },
];

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { stats, loading } = useAppSelector((s) => s.dashboard);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const collections = useAppSelector((s) => s.exercises.collections);
  const progressItems = useAppSelector((s) => s.progress.items);

  const user = useAppSelector((s) => s.auth.user);
  const [activeTab, setActiveTab] = useState<Tab>('progress');
  const [filterTier, setFilterTierLocal] = useState<Tier | null>(null);
  const [filterCollection, setFilterCollectionLocal] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const { filteredPct, filteredCompleted, filteredCount, filterLabel } = useMemo(() => {
    let filtered = exercises;

    if (filterTier) {
      filtered = filtered.filter((ex) => ex.tier === filterTier);
    }
    if (filterCollection) {
      const col = collections.find((c) => c._id === filterCollection);
      if (col) {
        const ids = new Set(col.exerciseIds);
        filtered = filtered.filter((ex) => ids.has(ex._id));
      }
    }

    const done = filtered.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
    const label = filterTier
      ? `Tier ${TIER_META[filterTier].label} (${TIER_META[filterTier].name})`
      : filterCollection
      ? collections.find((c) => c._id === filterCollection)?.name ?? 'Collection'
      : 'Overall';

    return {
      filteredCount: filtered.length,
      filteredCompleted: done,
      filteredPct: calcPercent(done, filtered.length),
      filterLabel: label,
    };
  }, [exercises, collections, progressItems, filterTier, filterCollection]);

  const handleTierClick = useCallback((tier: Tier) => {
    dispatch(clearFilters());
    dispatch(setTierFilter(tier));
    navigate('/exercises');
  }, [dispatch, navigate]);

  const handleTypeClick = useCallback((type: ExerciseType) => {
    dispatch(clearFilters());
    dispatch(setTypeFilter(type));
    navigate('/exercises');
  }, [dispatch, navigate]);

  const handleCollectionClick = useCallback((collectionId: string) => {
    dispatch(clearFilters());
    dispatch(setCollectionFilter(collectionId));
    navigate('/exercises');
  }, [dispatch, navigate]);

  const handleStatClick = useCallback((stat: string) => {
    dispatch(clearFilters());
    if (stat === 'in-progress') {
      dispatch(setCollectionFilter('__in-progress__'));
    } else if (stat === 'completed') {
      dispatch(setStatusSort('completed-first'));
    }
    navigate('/exercises');
  }, [dispatch, navigate]);

  if (loading && !stats) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <Skeleton height="120px" />
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

  const visibleCollections = collections.filter((c) => !c.hidden);

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

        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                border: activeTab === tab.id ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'progress' && (
          <>
            {/* Progress filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {([1, 2, 3, 4, 5] as Tier[]).map((t) => {
                  const meta = TIER_META[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setFilterTierLocal(filterTier === t ? null : t)}
                      className="tier-badge"
                      style={{
                        width: 22,
                        height: 22,
                        fontSize: 9,
                        backgroundColor: filterTier === t ? meta.bgColor : 'var(--bg-raised)',
                        border: `1px solid ${filterTier === t ? meta.color : 'var(--border)'}`,
                        color: filterTier === t ? meta.color : 'var(--text-faint)',
                        cursor: 'pointer',
                      }}
                    >
                      {meta.label}
                    </button>
                  );
                })}
              </div>

              <select
                value={filterCollection ?? ''}
                onChange={(e) => setFilterCollectionLocal(e.target.value || null)}
                className="text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor: 'var(--bg-raised)',
                  border: `1px solid ${filterCollection ? 'var(--accent)' : 'var(--border)'}`,
                  color: filterCollection ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'Lexend, sans-serif',
                }}
              >
                <option value="">All Collections</option>
                {visibleCollections.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.name}
                  </option>
                ))}
              </select>

              {(filterTier || filterCollection) && (
                <button
                  onClick={() => { setFilterTierLocal(null); setFilterCollectionLocal(null); }}
                  className="text-xs px-2 py-1 rounded"
                  style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', cursor: 'pointer', backgroundColor: 'transparent' }}
                >
                  Clear
                </button>
              )}
            </div>

            <ScoreCard
              filteredPct={filteredPct}
              filteredCompleted={filteredCompleted}
              filteredCount={filteredCount}
              filterLabel={filterLabel}
              totalScore={stats.totalScore}
            />

            <StatsRow
              completedCount={stats.completedCount}
              inProgressCount={stats.inProgressCount}
              totalAttempts={stats.totalAttempts}
              totalScore={stats.totalScore}
              onStatClick={handleStatClick}
            />

            <ActivityHeatmap progressItems={progressItems} />

            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <TierBreakdown tierBreakdown={stats.tierBreakdown} onTierClick={handleTierClick} />
              <TypeBreakdown typeBreakdown={stats.typeBreakdown} onTypeClick={handleTypeClick} />
            </div>

            <CollectionProgress onCollectionClick={handleCollectionClick} filterTier={filterTier} filterCollection={filterCollection} />

            <RecentActivity items={stats.recentActivity} />
          </>
        )}

        {activeTab === 'achievements' && <AchievementGrid />}

        {activeTab === 'cohort' && (
          <>
            {user?.cohortId ? (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                    Assignments
                  </h3>
                  <AssignmentList cohortId={user.cohortId} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                    Chat History
                  </h3>
                  <ChatLogViewer cohortId={user.cohortId} />
                </div>
              </div>
            ) : (
              <div
                className="rounded-lg p-8 text-center"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  You're not currently assigned to a cohort. Please contact your TA or instructor to be assigned.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
