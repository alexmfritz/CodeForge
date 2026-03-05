import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchHeatmap } from '../../features/instructorSlice';
import type { Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';

interface Props {
  cohortId?: string;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'var(--success)',
  in_progress: 'var(--warning)',
  not_started: 'var(--bg-raised)',
};

export default function CohortHeatmap({ cohortId }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { heatmap, heatmapLoading } = useAppSelector((s) => s.instructor);

  const [tierFilter, setTierFilter] = useState<number | ''>('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [cohortId, tierFilter, typeFilter]);

  useEffect(() => {
    if (!cohortId) return;
    dispatch(fetchHeatmap({
      cohortId,
      tier: tierFilter || undefined,
      type: typeFilter || undefined,
      page,
      pageSize: 50,
    }));
  }, [dispatch, cohortId, tierFilter, typeFilter, page]);

  if (!cohortId) {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Select a specific cohort to view the heatmap.
        </p>
      </div>
    );
  }

  if (heatmapLoading && !heatmap) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded animate-pulse" style={{ backgroundColor: 'var(--bg-raised)' }} />
        ))}
      </div>
    );
  }

  const exercises = heatmap?.exercises || [];
  const students = heatmap?.students || [];
  const pagination = heatmap?.pagination;

  // Compute per-exercise completion rates for summary row
  const exerciseCompletionRates = exercises.map((_, colIdx) => {
    if (students.length === 0) return 0;
    const completed = students.filter((s) => s.cells[colIdx]?.status === 'completed').length;
    return Math.round((completed / students.length) * 100);
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filters + Legend */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
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
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--success)' }} /> Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--warning)' }} /> In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--bg-raised)' }} /> Not Started
          </span>
        </div>
      </div>

      {exercises.length === 0 ? (
        <div
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No exercise data for the selected filters.
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="overflow-x-auto">
            <table className="border-collapse" style={{ minWidth: 'max-content' }}>
              {/* Column headers */}
              <thead>
                <tr>
                  <th
                    className="px-3 py-2 text-left text-xs font-medium"
                    style={{
                      color: 'var(--text-muted)',
                      position: 'sticky',
                      left: 0,
                      zIndex: 2,
                      backgroundColor: 'var(--bg-surface)',
                      minWidth: 120,
                    }}
                  >
                    Student
                  </th>
                  {exercises.map((ex) => (
                    <th
                      key={ex._id}
                      className="px-0.5 py-1 text-center"
                      style={{ minWidth: 22, maxWidth: 22, cursor: 'pointer' }}
                      title={`${ex.title} (T${ex.tier}) — click to view`}
                      onClick={() => navigate(`/exercises/${ex._id}`)}
                    >
                      <span
                        className="block text-center font-normal"
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: 8,
                          lineHeight: '10px',
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          height: 48,
                          overflow: 'hidden',
                        }}
                      >
                        {ex.title.length > 12 ? ex.title.slice(0, 12) + '…' : ex.title}
                      </span>
                    </th>
                  ))}
                  <th
                    className="px-3 py-2 text-right text-xs font-medium"
                    style={{
                      color: 'var(--text-muted)',
                      position: 'sticky',
                      right: 0,
                      zIndex: 2,
                      backgroundColor: 'var(--bg-surface)',
                      minWidth: 50,
                    }}
                  >
                    Done
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const completedCount = student.cells.filter((c) => c.status === 'completed').length;
                  return (
                    <tr
                      key={student.studentId}
                      style={{ borderTop: '1px solid var(--border)' }}
                    >
                      <td
                        className="px-3 py-1 text-xs font-medium truncate"
                        style={{
                          color: 'var(--text-primary)',
                          position: 'sticky',
                          left: 0,
                          zIndex: 1,
                          backgroundColor: 'var(--bg-surface)',
                          maxWidth: 120,
                        }}
                      >
                        {student.displayName}
                      </td>
                      {student.cells.map((cell) => (
                        <td
                          key={cell.exerciseId}
                          className="px-0.5 py-0.5"
                          title={`${student.displayName} — ${exercises.find((e) => e._id === cell.exerciseId)?.title || ''} — ${cell.status.replace('_', ' ')}`}
                        >
                          <div
                            className="w-4 h-4 rounded-sm mx-auto"
                            style={{ backgroundColor: STATUS_COLORS[cell.status] || STATUS_COLORS.not_started }}
                          />
                        </td>
                      ))}
                      <td
                        className="px-3 py-1 text-xs text-right font-medium"
                        style={{
                          color: 'var(--text-muted)',
                          position: 'sticky',
                          right: 0,
                          zIndex: 1,
                          backgroundColor: 'var(--bg-surface)',
                        }}
                      >
                        {completedCount}/{exercises.length}
                      </td>
                    </tr>
                  );
                })}
                {/* Summary row */}
                <tr style={{ borderTop: '2px solid var(--border)' }}>
                  <td
                    className="px-3 py-1.5 text-xs font-medium"
                    style={{
                      color: 'var(--text-muted)',
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'var(--bg-surface)',
                    }}
                  >
                    Completion %
                  </td>
                  {exerciseCompletionRates.map((rate, i) => (
                    <td key={i} className="px-0.5 py-1 text-center">
                      <span
                        className="text-center block font-medium"
                        style={{
                          fontSize: 7,
                          color: rate >= 70 ? 'var(--success)' : rate >= 40 ? 'var(--warning)' : 'var(--error)',
                        }}
                      >
                        {rate}
                      </span>
                    </td>
                  ))}
                  <td
                    className="px-3 py-1.5"
                    style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: 'var(--bg-surface)' }}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 rounded text-xs font-medium transition-colors"
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: page <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: page <= 1 ? 'default' : 'pointer',
              border: '1px solid var(--border)',
            }}
          >
            ← Prev
          </button>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Page {pagination.page} of {pagination.totalPages}
            <span className="ml-2">({pagination.totalExercises} exercises)</span>
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="px-3 py-1 rounded text-xs font-medium transition-colors"
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: page >= pagination.totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: page >= pagination.totalPages ? 'default' : 'pointer',
              border: '1px solid var(--border)',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
