import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchCohorts, fetchStudents } from '../../features/instructorSlice';
import type { Assignment } from '@codeforge/shared';
import OverviewPanel from './OverviewPanel';
import StudentList from './StudentList';
import CohortManager from './CohortManager';
import UserManager from './UserManager';
import AssignmentList from '../assignments/AssignmentList';
import AssignmentBuilder from '../assignments/AssignmentBuilder';
import RatingOverview from '../ratings/RatingOverview';
import ExerciseManager from './ExerciseManager';

type Tab = 'overview' | 'students' | 'cohorts' | 'users' | 'assignments' | 'exercises' | 'ratings';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'students', label: 'Students' },
  { id: 'cohorts', label: 'Cohorts' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'exercises', label: 'Exercises' },
  { id: 'ratings', label: 'Ratings' },
  { id: 'users', label: 'Users' },
];

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);
  const [builderMode, setBuilderMode] = useState<'hidden' | 'create' | 'edit' | 'duplicate'>('hidden');
  const [builderAssignment, setBuilderAssignment] = useState<Assignment | null>(null);
  const dispatch = useAppDispatch();
  const { cohorts } = useAppSelector((s) => s.instructor);

  useEffect(() => {
    dispatch(fetchCohorts());
  }, [dispatch]);

  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current && cohorts.length > 0) {
      initializedRef.current = true;
      const activeCohort = cohorts.find((c) => c.isActive);
      if (activeCohort) setSelectedCohortId(activeCohort._id);
    }
  }, [cohorts]);

  useEffect(() => {
    if (activeTab === 'assignments' && selectedCohortId) {
      dispatch(fetchStudents(selectedCohortId));
    }
  }, [activeTab, selectedCohortId, dispatch]);

  const closeBuilder = useCallback(() => {
    setBuilderMode('hidden');
    setBuilderAssignment(null);
  }, []);

  const handleEdit = useCallback((assignment: Assignment) => {
    setBuilderAssignment(assignment);
    setBuilderMode('edit');
  }, []);

  const handleDuplicate = useCallback((assignment: Assignment) => {
    // Strip _id so it creates a new assignment, prefix title
    setBuilderAssignment({
      ...assignment,
      _id: '',
      title: `${assignment.title} (Copy)`,
    });
    setBuilderMode('duplicate');
  }, []);

  const showBuilder = builderMode !== 'hidden';

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
            Instructor Dashboard
          </h1>
          <select
            value={selectedCohortId || ''}
            onChange={(e) => setSelectedCohortId(e.target.value || undefined)}
            className="bg-bg-surface text-text-primary border border-border-strong rounded px-3 py-1.5 text-sm"
          >
            <option value="">All Cohorts</option>
            {cohorts.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.studentCount})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                border: activeTab === tab.id ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && <OverviewPanel cohortId={selectedCohortId} />}
        {activeTab === 'students' && <StudentList cohortId={selectedCohortId} />}
        {activeTab === 'cohorts' && <CohortManager />}
        {activeTab === 'assignments' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Assignments for {selectedCohortId ? cohorts.find((c) => c._id === selectedCohortId)?.name || 'selected cohort' : 'all cohorts'}
              </span>
              {!showBuilder && (
                <button
                  onClick={() => setBuilderMode('create')}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-root)',
                    cursor: 'pointer',
                  }}
                >
                  Create Assignment
                </button>
              )}
            </div>
            {showBuilder && (
              <AssignmentBuilder
                key={builderMode + (builderAssignment?._id || 'new')}
                onClose={closeBuilder}
                editingAssignment={builderMode === 'edit' ? builderAssignment : undefined}
                duplicatingFrom={builderMode === 'duplicate' ? builderAssignment : undefined}
              />
            )}
            <AssignmentList
              cohortId={selectedCohortId}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
            />
          </div>
        )}
        {activeTab === 'exercises' && <ExerciseManager cohortId={selectedCohortId} />}
        {activeTab === 'ratings' && <RatingOverview cohortId={selectedCohortId} />}
        {activeTab === 'users' && <UserManager cohortId={selectedCohortId} />}
      </div>
    </div>
  );
}
