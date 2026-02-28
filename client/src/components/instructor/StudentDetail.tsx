import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchStudentProgress, clearStudentProgress } from '../../features/instructorSlice';
import { TIER_META } from '@codeforge/shared/constants';
import Skeleton from '../shared/Skeleton';

interface StudentDetailProps {
  studentId: string;
  onClose: () => void;
}

export default function StudentDetail({ studentId, onClose }: StudentDetailProps) {
  const dispatch = useAppDispatch();
  const { selectedStudentProgress, studentProgressLoading } = useAppSelector((s) => s.instructor);

  useEffect(() => {
    dispatch(fetchStudentProgress(studentId));
    // Clear stale data on unmount so the next student opened doesn't flash the previous student's info
    return () => {
      dispatch(clearStudentProgress());
    };
  }, [dispatch, studentId]);

  return (
    <div
      // Backdrop click closes the panel; inner click is stopped below to prevent bubbling
      className="fixed inset-0 flex justify-end"
      style={{ zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full overflow-y-auto p-6"
        style={{ backgroundColor: 'var(--bg-root)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
            Student Progress
          </h2>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1.5 rounded-lg transition-colors"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            Close
          </button>
        </div>

        {studentProgressLoading && !selectedStudentProgress && (
          <div className="flex flex-col gap-4">
            <Skeleton height="80px" />
            <Skeleton height="120px" />
            <Skeleton height="300px" />
          </div>
        )}

        {selectedStudentProgress && (
          <div className="flex flex-col gap-5">
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <h3 className="font-heading font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {selectedStudentProgress.student.displayName}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                @{selectedStudentProgress.student.username}
              </p>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <StatCard
                label="Completed"
                value={selectedStudentProgress.summary.completedCount}
                subtext={`of ${selectedStudentProgress.summary.totalExercises} started`}
              />
              <StatCard
                label="Total Score"
                value={selectedStudentProgress.summary.totalScore}
                subtext=""
              />
              <StatCard
                label="Total Attempts"
                value={selectedStudentProgress.summary.totalAttempts}
                subtext={`${selectedStudentProgress.summary.inProgressCount} in progress`}
              />
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <h4 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                Tier Breakdown
              </h4>
              <div className="flex flex-col gap-2">
                {Object.entries(selectedStudentProgress.summary.tierBreakdown).map(([tier, data]) => {
                  const tierNum = Number(tier);
                  const meta = TIER_META[tierNum as keyof typeof TIER_META];
                  // Clamp to 0 when no exercises have been attempted to avoid a NaN width
                  const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
                  return (
                    <div key={tier} className="flex items-center gap-3">
                      <span className="text-xs w-24 font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {meta?.name ?? `Tier ${tier}`}
                      </span>
                      <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--bg-raised)' }}>
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: 'var(--accent)',
                          }}
                        />
                      </div>
                      <span className="text-xs w-16 text-right" style={{ color: 'var(--text-muted)' }}>
                        {data.completed}/{data.total}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <h4 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                Type Breakdown
              </h4>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {Object.entries(selectedStudentProgress.summary.typeBreakdown).map(([type, data]) => (
                  <div
                    key={type}
                    className="rounded p-3 text-center"
                    style={{ backgroundColor: 'var(--bg-raised)' }}
                  >
                    <p className="text-xs font-medium uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                      {type}
                    </p>
                    <p className="text-lg font-heading font-bold" style={{ color: 'var(--accent)' }}>
                      {data.completed}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      of {data.total} | {data.score} pts
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <h4 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                Exercise Progress
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th className="text-left py-2 pr-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                        Exercise
                      </th>
                      <th className="text-center py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                        Tier
                      </th>
                      <th className="text-center py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                        Status
                      </th>
                      <th className="text-right py-2 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                        Score
                      </th>
                      <th className="text-right py-2 pl-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                        Attempts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudentProgress.progress
                      .filter((p) => p.exercise) // drop orphaned progress whose exercise was deleted
                      .sort((a, b) => {
                        // Primary sort by tier so difficulty progression is visually grouped
                        const tierA = a.exercise?.tier ?? 0;
                        const tierB = b.exercise?.tier ?? 0;
                        if (tierA !== tierB) return tierA - tierB;
                        return (a.exercise?.title ?? '').localeCompare(b.exercise?.title ?? '');
                      })
                      .map((p) => (
                        <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="py-2 pr-3" style={{ color: 'var(--text-primary)' }}>
                            {p.exercise?.title}
                          </td>
                          <td className="text-center py-2 px-3" style={{ color: 'var(--text-secondary)' }}>
                            {p.exercise?.tier}
                          </td>
                          <td className="text-center py-2 px-3">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="text-right py-2 px-3" style={{ color: 'var(--text-secondary)' }}>
                            {p.score}
                          </td>
                          <td className="text-right py-2 pl-3" style={{ color: 'var(--text-muted)' }}>
                            {p.attempts}
                            {/* Asterisk flags that the student peeked at the solution */}
                            {p.solutionViewed && (
                              <span
                                className="ml-1 text-xs"
                                title="Solution viewed"
                                style={{ color: 'var(--warning)' }}
                              >
                                *
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, subtext }: { label: string; value: number; subtext: string }) {
  return (
    <div
      className="rounded-lg p-4 text-center"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="text-xl font-heading font-bold" style={{ color: 'var(--accent)' }}>
        {value}
      </p>
      {subtext && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {subtext}
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  // Fallback to not_started styles for any unrecognised status string
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    completed: { bg: 'var(--bg-raised)', color: 'var(--success)', label: 'Completed' },
    in_progress: { bg: 'var(--bg-raised)', color: 'var(--warning)', label: 'In Progress' },
    not_started: { bg: 'var(--bg-raised)', color: 'var(--text-muted)', label: 'Not Started' },
  };

  const style = styles[status] || styles.not_started;

  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  );
}
