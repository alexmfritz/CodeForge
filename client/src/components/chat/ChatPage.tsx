import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/store';
import { fetchCohorts } from '../../features/instructorSlice';
import { leaveChat } from '../../features/chatSlice';
import ChatLobby from './ChatLobby';
import ChatRoom from './ChatRoom';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const hasEnteredLobby = useAppSelector((s) => s.chat.hasEnteredLobby);
  const cohorts = useAppSelector((s) => s.instructor.cohorts);

  const isInstructor = user?.role === 'instructor' || user?.role === 'ta';
  const [selectedCohortId, setSelectedCohortId] = useState<string | undefined>(undefined);

  // Fetch cohorts for instructor cohort selector
  useEffect(() => {
    if (isInstructor && cohorts.length === 0) {
      dispatch(fetchCohorts());
    }
  }, [isInstructor, cohorts.length, dispatch]);

  // Auto-select first active cohort for instructors
  useEffect(() => {
    if (isInstructor && !selectedCohortId && cohorts.length > 0) {
      const active = cohorts.find((c) => c.isActive);
      if (active) setSelectedCohortId(active._id);
    }
  }, [isInstructor, selectedCohortId, cohorts]);

  // Reset chat state when leaving the page
  useEffect(() => {
    return () => {
      dispatch(leaveChat());
    };
  }, [dispatch]);

  const cohortId = isInstructor ? selectedCohortId : user?.cohortId;

  // No cohort assigned
  if (!cohortId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-heading font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Chat
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {isInstructor
              ? 'No cohorts available. Create a cohort first.'
              : 'You\'re not currently assigned to a cohort. Please contact your TA or instructor.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Instructor cohort selector */}
      {isInstructor && (
        <div
          className="flex-shrink-0 flex items-center gap-3 px-6 py-2"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Cohort:
          </label>
          <select
            value={selectedCohortId || ''}
            onChange={(e) => {
              setSelectedCohortId(e.target.value || undefined);
              dispatch(leaveChat());
            }}
            className="text-sm px-2 py-1 rounded"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            {cohorts
              .filter((c) => c.isActive)
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Lobby or Room */}
      <div className="flex-1 overflow-hidden">
        {!hasEnteredLobby ? (
          <ChatLobby cohortId={cohortId} />
        ) : (
          <ChatRoom />
        )}
      </div>
    </div>
  );
}
