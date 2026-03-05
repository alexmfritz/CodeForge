import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchDifficultyReport } from '../../features/instructorSlice';
import type { ExerciseDifficultyRow, Tier, ExerciseType } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import TierBadge from '../shared/TierBadge';
import TypeBadge from '../shared/TypeBadge';
import { formatTime } from '../../utils/formatTime';

type SortKey = 'title' | 'tier' | 'completionRate' | 'avgAttempts' | 'avgTimeMs' | 'hintUsageRate' | 'solutionViewRate' | 'abandonRate';
type SortDir = 'asc' | 'desc';

interface Props {
  cohortId?: string;
}

function getDifficultyColor(score: number): string {
  if (score < 0.25) return 'var(--success)';
  if (score < 0.5) return 'var(--warning)';
  if (score < 0.75) return 'var(--orange)';
  return 'var(--error)';
}

function getCompletionColor(rate: number): string {
  if (rate >= 0.7) return 'var(--success)';
  if (rate >= 0.4) return 'var(--warning)';
  return 'var(--error)';
}

function difficultyScore(row: ExerciseDifficultyRow): number {
  return (1 - row.completionRate) * 0.4 + row.abandonRate * 0.3 + row.solutionViewRate * 0.3;
}

export default function DifficultyReport({ cohortId }: Props) {
  const dispatch = useAppDispatch();
  const { difficultyReport: data, difficultyReportLoading: loading } = useAppSelector((s) => s.instructor);

  const [tierFilter, setTierFilter] = useState<number | ''>('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('completionRate');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  useEffect(() => {
    dispatch(fetchDifficultyReport({
      cohortId,
      tier: tierFilter || undefined,
      type: typeFilter || undefined,
    }));
  }, [dispatch, cohortId, tierFilter, typeFilter]);

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      let av = a[sortKey] as string | number;
      let bv = b[sortKey] as string | number;
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'title' || key === 'tier' ? 'asc' : 'desc');
    }
  };

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  // Summary cards
  const withMinStarts = data.filter((r) => r.totalStarted >= 3);
  const hardest = withMinStarts.length > 0
    ? withMinStarts.reduce((a, b) => (a.completionRate < b.completionRate ? a : b))
    : null;
  const mostAbandoned = withMinStarts.length > 0
    ? withMinStarts.reduce((a, b) => (a.abandonRate > b.abandonRate ? a : b))
    : null;
  const mostSolutionViewed = withMinStarts.length > 0
    ? withMinStarts.reduce((a, b) => (a.solutionViewRate > b.solutionViewRate ? a : b))
    : null;
  const avgCompletionRate = data.length > 0
    ? data.reduce((sum, r) => sum + r.completionRate, 0) / data.length
    : 0;

  if (loading && data.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-raised)' }} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard
          label="Hardest Exercise"
          value={hardest ? hardest.title : '—'}
          sub={hardest ? `${Math.round(hardest.completionRate * 100)}% completion` : ''}
          color="var(--error)"
        />
        <SummaryCard
          label="Most Abandoned"
          value={mostAbandoned ? mostAbandoned.title : '—'}
          sub={mostAbandoned ? `${Math.round(mostAbandoned.abandonRate * 100)}% abandon rate` : ''}
          color="var(--orange)"
        />
        <SummaryCard
          label="Most Solution Viewed"
          value={mostSolutionViewed ? mostSolutionViewed.title : '—'}
          sub={mostSolutionViewed ? `${Math.round(mostSolutionViewed.solutionViewRate * 100)}% viewed solution` : ''}
          color="var(--warning)"
        />
        <SummaryCard
          label="Avg Completion Rate"
          value={`${Math.round(avgCompletionRate * 100)}%`}
          sub={`across ${data.length} exercises`}
          color="var(--accent)"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value ? Number(e.target.value) : '')}
          className="px-3 py-1.5 rounded text-sm"
          style={{ backgroundColor: 'var(--bg-root)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <option value="">All Tiers</option>
          {[1, 2, 3, 4, 5].map((t) => (
            <option key={t} value={t}>T{t} — {TIER_META[t as Tier].name}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 rounded text-sm"
          style={{ backgroundColor: 'var(--bg-root)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <option value="">All Types</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="html-css">HTML-CSS</option>
        </select>
        <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
          {sorted.length} exercise{sorted.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No exercise progress data available yet.
          </p>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <Th onClick={() => handleSort('title')} align="left">Exercise{sortArrow('title')}</Th>
                  <Th onClick={() => handleSort('tier')} align="center">Tier{sortArrow('tier')}</Th>
                  <Th align="center">Type</Th>
                  <Th onClick={() => handleSort('completionRate')} align="left" width="160px">Completion{sortArrow('completionRate')}</Th>
                  <Th onClick={() => handleSort('avgAttempts')} align="right">Avg Att.{sortArrow('avgAttempts')}</Th>
                  <Th onClick={() => handleSort('avgTimeMs')} align="right">Avg Time{sortArrow('avgTimeMs')}</Th>
                  <Th onClick={() => handleSort('hintUsageRate')} align="right">Hints{sortArrow('hintUsageRate')}</Th>
                  <Th onClick={() => handleSort('solutionViewRate')} align="right">Solution{sortArrow('solutionViewRate')}</Th>
                  <Th onClick={() => handleSort('abandonRate')} align="right">Abandon{sortArrow('abandonRate')}</Th>
                  <Th align="center" width="32px">{''}</Th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row) => {
                  const ds = difficultyScore(row);
                  return (
                    <tr
                      key={row.exerciseId}
                      className="transition-colors"
                      style={{ borderBottom: '1px solid var(--border)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-raised)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td className="px-3 py-2.5 max-w-[200px] truncate" style={{ color: 'var(--text-primary)' }}>
                        {row.title}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <TierBadge tier={row.tier as Tier} />
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <TypeBadge type={row.type as ExerciseType} />
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--bg-raised)' }}>
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.round(row.completionRate * 100)}%`,
                                backgroundColor: getCompletionColor(row.completionRate),
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8 text-right" style={{ color: 'var(--text-muted)' }}>
                            {Math.round(row.completionRate * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                        {row.avgAttempts}
                      </td>
                      <td className="px-3 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                        {formatTime(row.avgTimeMs)}
                      </td>
                      <td className="px-3 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                        {row.hintUsageRate.toFixed(1)}
                      </td>
                      <td className="px-3 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                        {Math.round(row.solutionViewRate * 100)}%
                      </td>
                      <td className="px-3 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                        {Math.round(row.abandonRate * 100)}%
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <div
                          className="w-3 h-3 rounded-full mx-auto"
                          style={{ backgroundColor: getDifficultyColor(ds) }}
                          title={`Difficulty: ${Math.round(ds * 100)}%`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-sm font-semibold truncate" style={{ color }}>{value}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}

function Th({ children, onClick, align, width }: { children: React.ReactNode; onClick?: () => void; align: string; width?: string }) {
  return (
    <th
      className={`px-3 py-2.5 font-medium text-${align}`}
      style={{
        color: 'var(--text-muted)',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        width,
        whiteSpace: 'nowrap',
      }}
      onClick={onClick}
    >
      {children}
    </th>
  );
}
