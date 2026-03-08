import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchAllUsers, createUser, updateUser, resetUserPassword } from '../../features/instructorSlice';
import BulkUserImport from './BulkUserImport';
import Skeleton from '../shared/Skeleton';

interface UserManagerProps {
  cohortId?: string;
}

export default function UserManager({ cohortId }: UserManagerProps) {
  const dispatch = useAppDispatch();
  const { students: users, studentsLoading, cohorts } = useAppSelector((s) => s.instructor);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    docNumber: '',
    role: 'student',
    cohortId: cohortId || '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.docNumber.trim()) {
      setError('First name, last name, and DOC number are required.');
      return;
    }

    try {
      await dispatch(
        createUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          docNumber: formData.docNumber,
          role: formData.role,
          cohortId: formData.cohortId || undefined,
        }),
      ).unwrap();
      setFormData({ firstName: '', lastName: '', docNumber: '', role: 'student', cohortId: cohortId || '' });
      setShowCreateForm(false);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to create user.');
    }
  };

  const handleToggleActive = async (user: (typeof users)[0]) => {
    await dispatch(updateUser({ id: user._id, isActive: !user.isActive }));
  };

  const handleResetPassword = async (user: (typeof users)[0]) => {
    if (!window.confirm(`Reset password for ${user.displayName} to their DOC number?`)) return;
    await dispatch(resetUserPassword(user._id));
  };

  if (studentsLoading && users.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton height="40px" />
        <Skeleton height="300px" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search users..."
          aria-label="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          aria-label="Filter by role"
          className="px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }}
        >
          <option value="all">All Roles</option>
          <option value="instructor">Instructor</option>
          <option value="ta">TA</option>
          <option value="student">Student</option>
        </select>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => { setShowBulkImport(true); setShowCreateForm(false); }}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            Bulk Import
          </button>
          <button
            onClick={() => { setShowCreateForm(true); setShowBulkImport(false); }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
            }}
          >
            New User
          </button>
        </div>
      </div>

      {showCreateForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-lg p-5"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
            Create User
          </h3>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                DOC Number
              </label>
              <input
                type="text"
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
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
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  backgroundColor: 'var(--bg-root)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                <option value="student">Student</option>
                <option value="ta">TA</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                Cohort (optional)
              </label>
              <select
                value={formData.cohortId}
                onChange={(e) => setFormData({ ...formData, cohortId: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  backgroundColor: 'var(--bg-root)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                <option value="">No Cohort</option>
                {cohorts.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Username: {formData.firstName && formData.lastName
              ? `${formData.firstName.charAt(0).toLowerCase()}${formData.lastName.toLowerCase().replace(/\s+/g, '')}`
              : '(auto-generated)'
            }
            {' | '}Password: DOC number
          </p>
          {error && (
            <p className="text-xs mt-2" style={{ color: 'var(--error)' }}>
              {error}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-root)',
                cursor: 'pointer',
              }}
            >
              Create User
            </button>
            <button
              type="button"
              onClick={() => { setShowCreateForm(false); setError(''); }}
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
        </form>
      )}

      {showBulkImport && (
        <BulkUserImport onClose={() => setShowBulkImport(false)} />
      )}

      <div
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Username
                </th>
                <th className="text-center py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Role
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
              {filteredUsers.map((user) => {
                const cohort = cohorts.find((c) => c._id === user.cohortId);
                return (
                  <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 px-4">
                      <div style={{ color: 'var(--text-primary)' }}>{user.displayName}</div>
                      {cohort && (
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {cohort.name}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {user.username}
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium capitalize"
                        style={{
                          backgroundColor: 'var(--bg-raised)',
                          color: user.role === 'instructor' ? 'var(--accent)' : 'var(--text-secondary)',
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--bg-raised)',
                          color: user.isActive ? 'var(--success)' : 'var(--text-muted)',
                        }}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="text-xs px-2 py-1 rounded transition-colors"
                          style={{
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                          }}
                        >
                          Reset PW
                        </button>
                        <button
                          onClick={() => handleToggleActive(user)}
                          className="text-xs px-2 py-1 rounded transition-colors"
                          style={{
                            color: user.isActive ? 'var(--warning)' : 'var(--success)',
                            border: `1px solid ${user.isActive ? 'var(--warning)' : 'var(--success)'}`,
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center" style={{ color: 'var(--text-muted)' }}>
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
