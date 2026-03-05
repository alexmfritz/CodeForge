import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchEngagementTimeline } from '../../features/instructorSlice';
import ActivityChart from './ActivityChart';

interface Props {
  cohortId?: string;
}

const TIME_RANGES = [7, 14, 30, 60] as const;

function formatRelativeDay(days: number | null): string {
  if (days === null) return 'Never';
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

function getStatusColor(daysSince: number | null): string {
  if (daysSince === null || daysSince >= 7) return 'var(--error)';
  if (daysSince >= 3) return 'var(--orange)';
  return 'var(--warning)';
}

export default function EngagementTimeline({ cohortId }: Props) {
  const dispatch = useAppDispatch();
  const { engagement, engagementLoading } = useAppSelector((s) => s.instructor);
  const [days, setDays] = useState<number>(30);

  useEffect(() => {
    dispatch(fetchEngagementTimeline({ cohortId, days }));
  }, [dispatch, cohortId, days]);

  if (engagementLoading && !engagement) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-raised)' }} />
        ))}
      </div>
    );
  }

  const summary = engagement?.summary;
  const dailyActivity = engagement?.dailyActivity || [];
  const atRiskStudents = engagement?.atRiskStudents || [];
  const totalStudents = engagement?.totalStudents || 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Active Today</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{summary?.activeToday ?? 0}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>of {totalStudents} students</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Avg Daily Active</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{summary?.avgDailyActive ?? 0}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>students per day</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Completions</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{summary?.totalCompletionsThisPeriod ?? 0}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>in {days} days</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs mr-1" style={{ color: 'var(--text-muted)' }}>Time range:</span>
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => setDays(range)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: days === range ? 'var(--accent)' : 'var(--bg-raised)',
              color: days === range ? 'white' : 'var(--text-muted)',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {range}d
          </button>
        ))}
      </div>

      {/* Activity Chart */}
      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Daily Activity</h3>
        <ActivityChart data={dailyActivity} height={200} />
      </div>

      {/* At-Risk Alert */}
      {atRiskStudents.length > 0 && (
        <>
          <div
            className="rounded-lg p-4 flex items-start gap-3"
            style={{
              border: '1px solid var(--error)',
              backgroundColor: 'transparent',
            }}
          >
            <span className="text-lg flex-shrink-0" style={{ color: 'var(--error)' }}>!</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--error)' }}>
                {atRiskStudents.length} student{atRiskStudents.length !== 1 ? 's' : ''} need{atRiskStudents.length === 1 ? 's' : ''} attention
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                No activity in the past 3+ days or have never started an exercise
              </p>
            </div>
          </div>

          {/* At-Risk Table */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="px-4 py-2.5 text-left font-medium" style={{ color: 'var(--text-muted)' }}>Student</th>
                  <th className="px-4 py-2.5 text-left font-medium" style={{ color: 'var(--text-muted)' }}>Last Activity</th>
                  <th className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--text-muted)' }}>Progress</th>
                  <th className="px-4 py-2.5 text-right font-medium" style={{ color: 'var(--text-muted)' }}>Rate</th>
                  <th className="px-4 py-2.5 text-center font-medium" style={{ color: 'var(--text-muted)' }} />
                </tr>
              </thead>
              <tbody>
                {atRiskStudents.map((student) => (
                  <tr
                    key={student.studentId}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-raised)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td className="px-4 py-2.5" style={{ color: 'var(--text-primary)' }}>
                      {student.displayName}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                      {formatRelativeDay(student.daysSinceActivity)}
                    </td>
                    <td className="px-4 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                      {student.totalCompleted}/{student.totalAttempted} attempted
                    </td>
                    <td className="px-4 py-2.5 text-right" style={{ color: 'var(--text-secondary)' }}>
                      {student.totalAttempted > 0 ? `${Math.round(student.completionRate * 100)}%` : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full mx-auto"
                        style={{ backgroundColor: getStatusColor(student.daysSinceActivity) }}
                        title={student.daysSinceActivity !== null ? `${student.daysSinceActivity} days inactive` : 'Never active'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {atRiskStudents.length === 0 && engagement && (
        <div
          className="rounded-lg p-4 flex items-center gap-3"
          style={{ border: '1px solid var(--success)', backgroundColor: 'transparent' }}
        >
          <span className="text-lg flex-shrink-0" style={{ color: 'var(--success)' }}>✓</span>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            All students have been active within the past 3 days.
          </p>
        </div>
      )}
    </div>
  );
}
