import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchCohorts } from '../../features/instructorSlice';
import OverviewPanel from './OverviewPanel';
import StudentList from './StudentList';
import CohortManager from './CohortManager';
import UserManager from './UserManager';

type Tab = 'overview' | 'students' | 'cohorts' | 'users';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'students', label: 'Students' },
  { id: 'cohorts', label: 'Cohorts' },
  { id: 'users', label: 'Users' },
];

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { cohorts } = useAppSelector((s) => s.instructor);

  // Cohorts are fetched once here so all child panels can read them from the store
  useEffect(() => {
    dispatch(fetchCohorts());
  }, [dispatch]);

  // Auto-select the first active cohort so the dashboard is never blank on first load
  useEffect(() => {
    if (!selectedCohortId && cohorts.length > 0) {
      const activeCohort = cohorts.find((c) => c.isActive);
      if (activeCohort) setSelectedCohortId(activeCohort._id);
    }
  }, [cohorts, selectedCohortId]);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
            Instructor Dashboard
          </h1>
          {/* Global cohort filter passed down as a prop to each tab panel */}
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
        {activeTab === 'users' && <UserManager cohortId={selectedCohortId} />}
      </div>
    </div>
  );
}
