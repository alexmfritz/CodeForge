import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { createAssignment, updateAssignment } from '../../features/assignmentsSlice';
import type { Assignment } from '@codeforge/shared';

interface AssignmentBuilderProps {
  onClose: () => void;
  editingAssignment?: Assignment | null;
}

export default function AssignmentBuilder({ onClose, editingAssignment }: AssignmentBuilderProps) {
  const dispatch = useAppDispatch();
  const { cohorts } = useAppSelector((s) => s.instructor);
  const { exercises } = useAppSelector((s) => s.exercises);
  const { students } = useAppSelector((s) => s.instructor);

  const [title, setTitle] = useState(editingAssignment?.title || '');
  const [description, setDescription] = useState(editingAssignment?.description || '');
  const [cohortId, setCohortId] = useState(editingAssignment?.cohortId || '');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>(
    editingAssignment?.exerciseIds || [],
  );
  const [targetStudentIds, setTargetStudentIds] = useState<string[]>(
    editingAssignment?.targetStudentIds || [],
  );
  const [dueDate, setDueDate] = useState(
    editingAssignment?.dueDate ? editingAssignment.dueDate.split('T')[0] : '',
  );
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Search across title, category, and type with limit to prevent UI overflow
  const filteredExercises = useMemo(() => {
    if (!exerciseSearch.trim()) return exercises.slice(0, 50);
    const q = exerciseSearch.toLowerCase();
    return exercises
      .filter(
        (ex) =>
          ex.title.toLowerCase().includes(q) ||
          ex.category.some((c) => c.toLowerCase().includes(q)) ||
          ex.type.toLowerCase().includes(q),
      )
      .slice(0, 50);
  }, [exercises, exerciseSearch]);

  // Filter to active students in selected cohort for optional targeting
  const cohortStudents = useMemo(() => {
    if (!cohortId) return [];
    return students.filter((s) => s.cohortId === cohortId && s.role === 'student' && s.isActive);
  }, [students, cohortId]);

  const toggleExercise = (exerciseId: string) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId],
    );
  };

  const toggleStudent = (studentId: string) => {
    setTargetStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    );
  };

  // Validate required fields and dispatch create/update with proper date formatting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!cohortId) {
      setError('Please select a cohort.');
      return;
    }
    if (selectedExerciseIds.length === 0) {
      setError('Select at least one exercise.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || undefined,
        cohortId,
        exerciseIds: selectedExerciseIds,
        targetStudentIds: targetStudentIds.length > 0 ? targetStudentIds : undefined,
        dueDate: dueDate ? new Date(dueDate + 'T23:59:59.000Z').toISOString() : undefined,
      };

      if (editingAssignment) {
        await dispatch(updateAssignment({ id: editingAssignment._id, ...payload })).unwrap();
      } else {
        await dispatch(createAssignment(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        {editingAssignment ? 'Edit Assignment' : 'Create Assignment'}
      </h3>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
            placeholder="e.g. Week 3 - Array Methods"
          />
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded text-sm resize-none"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
            placeholder="Assignment instructions or notes..."
          />
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Cohort
            </label>
            <select
              value={cohortId}
              onChange={(e) => {
                setCohortId(e.target.value);
                setTargetStudentIds([]);
              }}
              className="w-full px-3 py-2 rounded text-sm"
              style={{
                backgroundColor: 'var(--bg-root)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              <option value="">Select cohort...</option>
              {cohorts.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Due Date (optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm"
              style={{
                backgroundColor: 'var(--bg-root)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            Exercises ({selectedExerciseIds.length} selected)
          </label>
          <input
            type="text"
            value={exerciseSearch}
            onChange={(e) => setExerciseSearch(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm mb-2"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
            placeholder="Search exercises..."
          />
          <div
            className="rounded overflow-y-auto"
            style={{
              maxHeight: 200,
              backgroundColor: 'var(--bg-root)',
              border: '1px solid var(--border)',
            }}
          >
            {filteredExercises.length === 0 ? (
              <div className="p-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                No exercises found.
              </div>
            ) : (
              // Toggle exercise selection for inclusion in assignment
              filteredExercises.map((ex) => {
                const isSelected = selectedExerciseIds.includes(ex._id);
                return (
                  <button
                    key={ex._id}
                    type="button"
                    onClick={() => toggleExercise(ex._id)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--bg-surface)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center"
                      style={{
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <span className="text-xs" style={{ color: 'var(--bg-root)' }}>
                          {'\u2713'}
                        </span>
                      )}
                    </div>
                    <span className="flex-1 truncate" style={{ color: 'var(--text-primary)' }}>
                      {ex.title}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      T{ex.tier} {ex.type.toUpperCase()}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {cohortId && cohortStudents.length > 0 && (
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              Target Students (optional - leave empty for entire cohort)
            </label>
            <div
              className="rounded overflow-y-auto"
              style={{
                maxHeight: 160,
                backgroundColor: 'var(--bg-root)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Only show if targeting specific students, not assigning to all */}
              {cohortStudents.map((student) => {
                const isSelected = targetStudentIds.includes(student._id);
                return (
                  <button
                    key={student._id}
                    type="button"
                    onClick={() => toggleStudent(student._id)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--bg-surface)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center"
                      style={{
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <span className="text-xs" style={{ color: 'var(--bg-root)' }}>
                          {'\u2713'}
                        </span>
                      )}
                    </div>
                    <span className="flex-1 truncate" style={{ color: 'var(--text-primary)' }}>
                      {student.displayName}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {student.username}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs" style={{ color: 'var(--error)' }}>
            {error}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting
              ? 'Saving...'
              : editingAssignment
                ? 'Save Changes'
                : 'Create Assignment'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
