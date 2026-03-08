import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { createCohort, updateCohort } from '../../features/instructorSlice';
import { showToast } from '../../features/uiSlice';
import Skeleton from '../shared/Skeleton';

export default function CohortManager() {
  const dispatch = useAppDispatch();
  const { cohorts, cohortsLoading } = useAppSelector((s) => s.instructor);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', startDate: '', endDate: '' });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ name: '', startDate: '', endDate: '' });
    setShowForm(false);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.startDate) {
      setError('Name and start date are required.');
      return;
    }

    try {
      if (editingId) {
        await dispatch(
          updateCohort({
            id: editingId,
            name: formData.name,
            startDate: formData.startDate,
            endDate: formData.endDate || undefined,
          }),
        ).unwrap();
      } else {
        await dispatch(
          createCohort({
            name: formData.name,
            startDate: formData.startDate,
            endDate: formData.endDate || undefined,
          }),
        ).unwrap();
      }
      resetForm();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Operation failed.');
    }
  };

  const startEdit = (cohort: (typeof cohorts)[0]) => {
    setFormData({
      name: cohort.name,
      startDate: cohort.startDate.split('T')[0],
      endDate: cohort.endDate ? cohort.endDate.split('T')[0] : '',
    });
    setEditingId(cohort._id);
    setShowForm(true);
  };

  const toggleActive = async (cohort: (typeof cohorts)[0]) => {
    try {
      await dispatch(updateCohort({ id: cohort._id, isActive: !cohort.isActive })).unwrap();
    } catch {
      dispatch(showToast({ type: 'error', message: `Failed to ${cohort.isActive ? 'deactivate' : 'activate'} cohort.` }));
    }
  };

  if (cohortsLoading && cohorts.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton height="40px" />
        <Skeleton height="300px" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {cohorts.length} cohort{cohorts.length !== 1 ? 's' : ''}
        </span>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
            }}
          >
            New Cohort
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg p-5"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
            {editingId ? 'Edit Cohort' : 'Create Cohort'}
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  backgroundColor: 'var(--bg-root)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
                placeholder="e.g. Cohort 2026-A"
              />
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-root)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                  End Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: 'var(--bg-root)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                  }}
                />
              </div>
            </div>
            {error && (
              <p className="text-xs" style={{ color: 'var(--error)' }}>
                {error}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-root)',
                  cursor: 'pointer',
                }}
              >
                {editingId ? 'Save Changes' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
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
      )}

      <div
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                Start Date
              </th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                End Date
              </th>
              <th className="text-right py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                Students
              </th>
              <th className="text-center py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                Status
              </th>
              <th className="text-center py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort) => (
              <tr key={cohort._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                  {cohort.name}
                </td>
                <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(cohort.startDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                  {cohort.endDate ? new Date(cohort.endDate).toLocaleDateString() : '--'}
                </td>
                <td className="text-right py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                  {cohort.studentCount}
                </td>
                <td className="text-center py-3 px-4">
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
                <td className="text-center py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => startEdit(cohort)}
                      className="text-xs px-2 py-1 rounded transition-colors"
                      style={{
                        color: 'var(--accent)',
                        border: '1px solid var(--accent)',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(cohort)}
                      className="text-xs px-2 py-1 rounded transition-colors"
                      style={{
                        color: cohort.isActive ? 'var(--warning)' : 'var(--success)',
                        border: `1px solid ${cohort.isActive ? 'var(--warning)' : 'var(--success)'}`,
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                      }}
                    >
                      {cohort.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cohorts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center" style={{ color: 'var(--text-muted)' }}>
                  No cohorts yet. Create your first cohort to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
