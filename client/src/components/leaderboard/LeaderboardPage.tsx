import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { setFilterCohortId, setFilterPeriod } from '../../features/leaderboardSlice';
import { useLeaderboardPolling } from '../../hooks/useLeaderboardPolling';
import LeaderboardTable from './LeaderboardTable';
import HighlightsWidget from './HighlightsWidget';
import Skeleton from '../shared/Skeleton';
import type { LeaderboardPeriod } from '@codeforge/shared';

type FilterOption = 'cohort' | 'all';

const PERIOD_OPTIONS: { value: LeaderboardPeriod; label: string }[] = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'all', label: 'All Time' },
];

export default function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { entries, highlights, filterCohortId, filterPeriod, loading, highlightsLoading } =
    useAppSelector((s) => s.leaderboard);
  const user = useAppSelector((s) => s.auth.user);
  const isOptedIn = user?.preferences.leaderboardOptIn ?? false;

  useLeaderboardPolling();

  const activeFilter: FilterOption = filterCohortId === 'all' ? 'all' : 'cohort';

  const handleFilterChange = useCallback(
    (filter: FilterOption) => {
      dispatch(setFilterCohortId(filter === 'all' ? 'all' : null));
    },
    [dispatch],
  );

  const handlePeriodChange = useCallback(
    (period: LeaderboardPeriod) => {
      dispatch(setFilterPeriod(period));
    },
    [dispatch],
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Leaderboard</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFilterChange('cohort')}
              className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeFilter === 'cohort' ? 'var(--bg-surface)' : 'transparent',
                color: activeFilter === 'cohort' ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${activeFilter === 'cohort' ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              My Cohort
            </button>
            <button
              onClick={() => handleFilterChange('all')}
              className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeFilter === 'all' ? 'var(--bg-surface)' : 'transparent',
                color: activeFilter === 'all' ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${activeFilter === 'all' ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              All Cohorts
            </button>

            {/* Divider */}
            <span
              className="mx-1"
              style={{ color: 'var(--border)', userSelect: 'none' }}
              aria-hidden="true"
            >
              |
            </span>

            {/* Period filter */}
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handlePeriodChange(opt.value)}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor:
                    filterPeriod === opt.value ? 'var(--bg-surface)' : 'transparent',
                  color:
                    filterPeriod === opt.value ? 'var(--accent)' : 'var(--text-muted)',
                  border: `1px solid ${filterPeriod === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opt-in notice */}
        {!isOptedIn && (
          <div
            className="flex items-center justify-between mb-4 p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border)',
            }}
          >
            <p className="text-sm text-text-secondary">
              You are not currently visible on the leaderboard. Opt in from Settings to appear in
              the rankings.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'white',
              }}
            >
              Go to Settings
            </button>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading && entries.length === 0 ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} height="44px" borderRadius="8px" />
                ))}
              </div>
            ) : (
              <LeaderboardTable entries={entries} showCohort={activeFilter === 'all'} />
            )}
          </div>
          <div>
            <HighlightsWidget highlights={highlights} loading={highlightsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
