import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { setFilterCohortId } from '../../features/leaderboardSlice';
import { useLeaderboardPolling } from '../../hooks/useLeaderboardPolling';
import LeaderboardTable from './LeaderboardTable';
import HighlightsWidget from './HighlightsWidget';

type FilterOption = 'cohort' | 'all';

export default function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { entries, highlights, filterCohortId, loading, highlightsLoading } = useAppSelector(
    (s) => s.leaderboard,
  );
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
              <div className="bg-bg-surface border border-border rounded-lg p-8 text-center text-text-muted">
                Loading leaderboard...
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
