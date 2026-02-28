import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchAssignments } from '../../features/assignmentsSlice';
import AssignmentProgress from './AssignmentProgress';
import Skeleton from '../shared/Skeleton';

interface AssignmentListProps {
  cohortId?: string;
}

export default function AssignmentList({ cohortId }: AssignmentListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { assignments, loading } = useAppSelector((s) => s.assignments);
  const user = useAppSelector((s) => s.auth.user);
  const progressItems = useAppSelector((s) => s.progress.items);

  useEffect(() => {
    dispatch(fetchAssignments(cohortId));
  }, [dispatch, cohortId]);

  if (loading && assignments.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton height="72px" />
        <Skeleton height="72px" />
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div
        className="rounded-lg p-5 text-center"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          No assignments yet.
        </p>
      </div>
    );
  }

  const isStudent = user?.role === 'student';

  return (
    <div className="flex flex-col gap-3">
      {assignments.map((assignment) => {
        const exerciseCount = assignment.exerciseIds.length;
        let completedCount = 0;
        if (isStudent) {
          completedCount = assignment.exerciseIds.filter(
            (eid) => progressItems[eid]?.status === 'completed',
          ).length;
        }

        const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date();
        const isDone = isStudent && completedCount === exerciseCount && exerciseCount > 0;

        return (
          <button
            key={assignment._id}
            onClick={() => navigate(`/assignments/${assignment._id}`)}
            className="w-full text-left rounded-lg p-4 transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-heading font-semibold text-sm truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {assignment.title}
                  </span>
                  {isDone && (
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--success)' }}
                    >
                      Complete
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}</span>
                  {assignment.dueDate && (
                    <span style={{ color: isOverdue && !isDone ? 'var(--error)' : undefined }}>
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              {isStudent && (
                <div style={{ width: 120 }}>
                  <AssignmentProgress completed={completedCount} total={exerciseCount} />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
