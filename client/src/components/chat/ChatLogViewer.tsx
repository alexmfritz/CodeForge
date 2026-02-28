import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchArchivedLogs, fetchArchivedLog, deleteArchivedLog } from '../../features/chatSlice';
import MessageBubble from './MessageBubble';
import Skeleton from '../shared/Skeleton';

interface ChatLogViewerProps {
  cohortId?: string;
  canDelete?: boolean;
}

export default function ChatLogViewer({ cohortId, canDelete }: ChatLogViewerProps) {
  const dispatch = useAppDispatch();
  const { archivedLogs, archivedLogsLoading, selectedLog, selectedLogLoading } = useAppSelector(
    (s) => s.chat,
  );

  useEffect(() => {
    if (cohortId) {
      dispatch(fetchArchivedLogs(cohortId));
    }
  }, [dispatch, cohortId]);

  if (!cohortId) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Select a cohort to view chat logs.
      </p>
    );
  }

  if (archivedLogsLoading) {
    return <Skeleton height="80px" />;
  }

  // Viewing a specific log
  if (selectedLog) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(fetchArchivedLog('')).abort()}
            className="px-3 py-1.5 rounded text-sm"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
            // Simple approach: re-dispatch to clear
            onClickCapture={() => {
              // Clear selectedLog by re-fetching logs list
              dispatch(fetchArchivedLogs(cohortId));
            }}
          >
            Back to Logs
          </button>
          <span className="text-sm font-heading font-semibold" style={{ color: 'var(--text-primary)' }}>
            Chat Log — {selectedLog.date}
          </span>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', maxHeight: 500, overflowY: 'auto' }}
        >
          {selectedLog.messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} />
          ))}
        </div>
      </div>
    );
  }

  if (selectedLogLoading) {
    return <Skeleton height="200px" />;
  }

  if (archivedLogs.length === 0) {
    return (
      <div
        className="rounded-lg p-5 text-center"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          No chat logs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {archivedLogs.map((log) => (
        <div
          key={log._id}
          className="rounded-lg p-3 flex items-center justify-between"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <button
            onClick={() => dispatch(fetchArchivedLog(log._id))}
            className="flex-1 text-left flex items-center gap-4"
            style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
          >
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {log.date}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {log.messageCount} message{log.messageCount !== 1 ? 's' : ''}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {log.participants.length} participant{log.participants.length !== 1 ? 's' : ''}
            </span>
          </button>
          {canDelete && (
            <button
              onClick={() => dispatch(deleteArchivedLog(log._id))}
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                color: 'var(--error)',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: '1px solid var(--border)',
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
