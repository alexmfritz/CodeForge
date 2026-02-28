import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchStudents } from '../../features/instructorSlice';
import StudentDetail from './StudentDetail';
import Skeleton from '../shared/Skeleton';

interface StudentListProps {
  cohortId?: string;
}

export default function StudentList({ cohortId }: StudentListProps) {
  const dispatch = useAppDispatch();
  const { students, studentsLoading } = useAppSelector((s) => s.instructor);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchStudents(cohortId));
  }, [dispatch, cohortId]);

  const filteredStudents = students
    .filter((s) => s.role === 'student')
    .filter(
      (s) =>
        s.displayName.toLowerCase().includes(search.toLowerCase()) ||
        s.username.toLowerCase().includes(search.toLowerCase()),
    );

  if (studentsLoading && students.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton height="40px" />
        <Skeleton height="300px" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }}
        />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
        </span>
      </div>

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
                <th className="text-right py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Last Login
                </th>
                <th className="text-center py-3 px-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="transition-colors"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-raised)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                  onClick={() => setSelectedStudentId(student._id)}
                >
                  <td className="py-3 px-4" style={{ color: 'var(--text-primary)' }}>
                    {student.displayName}
                  </td>
                  <td className="py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    {student.username}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--bg-raised)',
                        color: student.isActive ? 'var(--success)' : 'var(--text-muted)',
                      }}
                    >
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4" style={{ color: 'var(--text-muted)' }}>
                    {student.lastLogin
                      ? new Date(student.lastLogin).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td className="text-center py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudentId(student._id);
                      }}
                      className="text-xs px-3 py-1 rounded transition-colors"
                      style={{
                        color: 'var(--accent)',
                        border: '1px solid var(--accent)',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                      }}
                    >
                      View Progress
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center" style={{ color: 'var(--text-muted)' }}>
                    {search ? 'No students match your search.' : 'No students found in this cohort.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudentId && (
        <StudentDetail
          studentId={selectedStudentId}
          onClose={() => setSelectedStudentId(null)}
        />
      )}
    </div>
  );
}
