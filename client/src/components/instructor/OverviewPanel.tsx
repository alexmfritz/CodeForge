import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchOverview } from '../../features/instructorSlice';
import Skeleton from '../shared/Skeleton';

interface OverviewPanelProps {
  cohortId?: string;
}

export default function OverviewPanel({ cohortId }: OverviewPanelProps) {
  const dispatch = useAppDispatch();
  const { overview, overviewLoading } = useAppSelector((s) => s.instructor);

  // Re-fetch whenever the cohort filter changes so stats stay in sync
  useEffect(() => {
    dispatch(fetchOverview(cohortId));
  }, [dispatch, cohortId]);

  // Show skeleton only on initial load; stale data stays visible during refetches
  if (overviewLoading && !overview) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </div>
        <Skeleton height="200px" />
      </div>
    );
  }

  if (!overview) return null;

  // Declared as an array so the cards render in a consistent, defined order
  const statCards = [
    { label: 'Total Students', value: overview.totalStudents },
    { label: 'Exercises Completed', value: overview.totalCompleted },
    { label: 'Avg Score', value: overview.avgScore },
    { label: 'Total Score', value: overview.totalScore.toLocaleString() },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg p-5"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              {card.label}
            </p>
            <p className="text-2xl font-heading font-bold" style={{ color: 'var(--accent)' }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {overview.cohortSummary.length > 0 && (
        <div
          className="rounded-lg p-5"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
            Cohort Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Cohort
                  </th>
                  <th className="text-right py-2 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Students
                  </th>
                  <th className="text-right py-2 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Completed
                  </th>
                  <th className="text-right py-2 pl-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {overview.cohortSummary.map((cohort) => (
                  <tr key={cohort._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4" style={{ color: 'var(--text-primary)' }}>
                      {cohort.name}
                    </td>
                    <td className="text-right py-2 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {cohort.studentCount}
                    </td>
                    <td className="text-right py-2 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {cohort.completedExercises}
                    </td>
                    <td className="text-right py-2 pl-4">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--bg-raised)',
                          color: cohort.isActive ? 'var(--success)' : 'var(--text-muted)',
                        }}
                      >
                        {cohort.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
