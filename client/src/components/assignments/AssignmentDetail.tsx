import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  fetchAssignmentDetail,
  fetchAssignmentProgress,
  clearAssignmentDetail,
} from '../../features/assignmentsSlice';
import AssignmentProgress from './AssignmentProgress';
import Skeleton from '../shared/Skeleton';

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedDetail, detailLoading, progress, progressLoading } = useAppSelector(
    (s) => s.assignments,
  );
  const user = useAppSelector((s) => s.auth.user);
  const progressItems = useAppSelector((s) => s.progress.items);
  const isInstructor = user?.role === 'instructor' || user?.role === 'ta';

  useEffect(() => {
    if (id) {
      dispatch(fetchAssignmentDetail(id));
      if (isInstructor) {
        dispatch(fetchAssignmentProgress(id));
      }
    }
    return () => {
      dispatch(clearAssignmentDetail());
    };
  }, [dispatch, id, isInstructor]);

  if (detailLoading || !selectedDetail) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <Skeleton height="32px" width="200px" />
          <Skeleton height="200px" />
        </div>
      </div>
    );
  }

  const assignment = selectedDetail;
  const exercises = assignment.exercises || [];
  const totalExercises = exercises.length;
  const studentCompletedCount = exercises.filter(
    (ex) => progressItems[ex._id]?.status === 'completed',
  ).length;

  const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date();

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 rounded text-sm transition-colors"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            Back
          </button>
          <h1 className="text-xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
            {assignment.title}
          </h1>
        </div>

        <div
          className="rounded-lg p-5"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col gap-3">
            {assignment.description && (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {assignment.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{totalExercises} exercise{totalExercises !== 1 ? 's' : ''}</span>
              {assignment.dueDate && (
                <span style={{ color: isOverdue ? 'var(--error)' : undefined }}>
                  Due {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            {!isInstructor && (
              <AssignmentProgress completed={studentCompletedCount} total={totalExercises} />
            )}
          </div>
        </div>

        <div
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              Exercises
            </h2>
          </div>
          {exercises.length === 0 ? (
            <div className="p-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              No exercises in this assignment.
            </div>
          ) : (
            <div>
              {exercises.map((ex) => {
                const prog = progressItems[ex._id];
                const isComplete = prog?.status === 'completed';
                return (
                  <button
                    key={ex._id}
                    onClick={() => navigate(`/exercises/${ex._id}`)}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: isComplete ? 'var(--success)' : 'var(--bg-raised)',
                        color: isComplete ? 'var(--bg-root)' : 'var(--text-muted)',
                      }}
                    >
                      {isComplete ? '\u2713' : ''}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-sm truncate block"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {ex.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="uppercase">{ex.type}</span>
                      <span
                        className="inline-block px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'var(--bg-raised)' }}
                      >
                        T{ex.tier}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {isInstructor && (
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Student Progress
              </h2>
            </div>
            {progressLoading ? (
              <div className="p-4">
                <Skeleton height="80px" />
              </div>
            ) : !progress || progress.students.length === 0 ? (
              <div className="p-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                No student progress data available.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th className="text-left py-2 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                      Student
                    </th>
                    <th className="text-right py-2 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                      Completed
                    </th>
                    <th className="py-2 px-4 font-medium" style={{ color: 'var(--text-muted)', width: 140 }}>
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progress.students.map((s) => (
                    <tr key={s.studentId} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-2 px-4" style={{ color: 'var(--text-primary)' }}>
                        {s.displayName}
                      </td>
                      <td className="text-right py-2 px-4" style={{ color: 'var(--text-secondary)' }}>
                        {s.completed}/{s.total}
                      </td>
                      <td className="py-2 px-4">
                        <AssignmentProgress completed={s.completed} total={s.total} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
