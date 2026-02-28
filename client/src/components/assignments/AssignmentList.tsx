import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchAssignments, deleteAssignment, updateAssignment, fetchProgressSummaries } from '../../features/assignmentsSlice';
import type { Assignment, AssignmentStatus } from '@codeforge/shared';
import { getAssignmentStatus } from '@codeforge/shared';
import AssignmentProgress from './AssignmentProgress';
import Skeleton from '../shared/Skeleton';

interface AssignmentListProps {
  cohortId?: string;
  onEdit?: (assignment: Assignment) => void;
  onDuplicate?: (assignment: Assignment) => void;
}

type StatusFilter = 'all' | AssignmentStatus;

const STATUS_CONFIG: Record<AssignmentStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'var(--success)', bg: 'var(--bg-raised)' },
  'past-due': { label: 'Past Due', color: 'var(--warning, #e89a3c)', bg: 'var(--bg-raised)' },
  archived: { label: 'Archived', color: 'var(--text-muted)', bg: 'var(--bg-raised)' },
};

function StatusBadge({ status }: { status: AssignmentStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

export default function AssignmentList({ cohortId, onEdit, onDuplicate }: AssignmentListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { assignments, loading, progressSummaries } = useAppSelector((s) => s.assignments);
  const user = useAppSelector((s) => s.auth.user);
  const progressItems = useAppSelector((s) => s.progress.items);
  const isInstructor = user?.role === 'instructor' || user?.role === 'ta';

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [extendingId, setExtendingId] = useState<string | null>(null);
  const [extendDate, setExtendDate] = useState('');

  useEffect(() => {
    dispatch(fetchAssignments(
      isInstructor ? { cohortId, includeArchived: true } : cohortId,
    ));
  }, [dispatch, cohortId, isInstructor]);

  // Fetch progress summaries for instructors when assignments load
  useEffect(() => {
    if (isInstructor && assignments.length > 0) {
      const ids = assignments.map((a) => a._id);
      dispatch(fetchProgressSummaries(ids));
    }
  }, [dispatch, isInstructor, assignments]);

  const filteredAssignments = useMemo(() => {
    if (statusFilter === 'all') return assignments;
    return assignments.filter((a) => getAssignmentStatus(a) === statusFilter);
  }, [assignments, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts = { all: assignments.length, active: 0, 'past-due': 0, archived: 0 };
    for (const a of assignments) {
      counts[getAssignmentStatus(a)]++;
    }
    return counts;
  }, [assignments]);

  const handleArchive = async (e: React.MouseEvent, assignmentId: string) => {
    e.stopPropagation();
    await dispatch(deleteAssignment(assignmentId));
  };

  const handleExtendDeadline = async (e: React.FormEvent, assignmentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!extendDate) return;
    await dispatch(updateAssignment({
      id: assignmentId,
      dueDate: new Date(extendDate + 'T23:59:59.000Z').toISOString(),
    }));
    setExtendingId(null);
    setExtendDate('');
  };

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

  const FILTER_TABS: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: `All (${statusCounts.all})` },
    { id: 'active', label: `Active (${statusCounts.active})` },
    { id: 'past-due', label: `Past Due (${statusCounts['past-due']})` },
    { id: 'archived', label: `Archived (${statusCounts.archived})` },
  ];

  return (
    <div className="flex flex-col gap-3">
      {isInstructor && (
        <div className="flex items-center gap-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
              style={{
                backgroundColor: statusFilter === tab.id ? 'var(--bg-surface)' : 'transparent',
                color: statusFilter === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                border: statusFilter === tab.id ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {filteredAssignments.length === 0 ? (
        <div
          className="rounded-lg p-5 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No {statusFilter === 'all' ? '' : statusFilter + ' '}assignments.
          </p>
        </div>
      ) : (
        filteredAssignments.map((assignment) => {
          const exerciseCount = assignment.exerciseIds.length;
          let completedCount = 0;
          if (isStudent) {
            completedCount = assignment.exerciseIds.filter(
              (eid) => progressItems[eid]?.status === 'completed',
            ).length;
          }

          const status = getAssignmentStatus(assignment);
          const isDone = isStudent && completedCount === exerciseCount && exerciseCount > 0;
          const isPastDue = status === 'past-due';

          return (
            <div
              key={assignment._id}
              className="rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                opacity: status === 'archived' ? 0.6 : 1,
              }}
            >
              <button
                onClick={() => navigate(`/assignments/${assignment._id}`)}
                className="w-full text-left p-4"
                style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
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
                      {isInstructor && <StatusBadge status={status} />}
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
                        <span style={{ color: isPastDue && !isDone ? 'var(--error)' : undefined }}>
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
                  {isInstructor && progressSummaries[assignment._id] && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {progressSummaries[assignment._id].studentsCompleted}/{progressSummaries[assignment._id].totalStudents}
                      </span>
                      <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                        complete
                      </span>
                    </div>
                  )}
                </div>
              </button>

              {/* Instructor action bar */}
              {isInstructor && (
                <div
                  className="flex items-center gap-2 px-4 pb-3"
                >
                  {status !== 'archived' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit?.(assignment); }}
                      className="px-3 py-1 rounded text-xs font-medium transition-colors"
                      style={{
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); onDuplicate?.(assignment); }}
                    className="px-3 py-1 rounded text-xs font-medium transition-colors"
                    style={{
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Duplicate
                  </button>
                  {(status === 'active' || status === 'past-due') && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExtendingId(extendingId === assignment._id ? null : assignment._id);
                          setExtendDate('');
                        }}
                        className="px-3 py-1 rounded text-xs font-medium transition-colors"
                        style={{
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                        }}
                      >
                        {isPastDue ? 'Extend Deadline' : 'Change Due Date'}
                      </button>
                      <button
                        onClick={(e) => handleArchive(e, assignment._id)}
                        className="px-3 py-1 rounded text-xs font-medium transition-colors"
                        style={{
                          color: 'var(--error)',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                        }}
                      >
                        Archive
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Inline extend deadline form */}
              {extendingId === assignment._id && (
                <form
                  onSubmit={(e) => handleExtendDeadline(e, assignment._id)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 pb-3"
                >
                  <input
                    type="date"
                    value={extendDate}
                    onChange={(e) => setExtendDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--bg-root)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!extendDate}
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg-root)',
                      cursor: extendDate ? 'pointer' : 'not-allowed',
                      opacity: extendDate ? 1 : 0.5,
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => { setExtendingId(null); setExtendDate(''); }}
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
