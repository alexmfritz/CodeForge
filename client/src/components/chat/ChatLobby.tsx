import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/store';
import { enterChat, setInRoom } from '../../features/chatSlice';
import { getSocket } from '../../utils/socket';
import { CHAT_NORMS, HELP_EXAMPLES } from './chatNorms';
import RoleBadge from './RoleBadge';

interface ChatLobbyProps {
  cohortId: string;
}

export default function ChatLobby({ cohortId }: ChatLobbyProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const activeUsers = useAppSelector((s) => s.chat.activeUsers);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.emit('chat:get-active-users', cohortId);
    }
  }, [cohortId]);

  const handleEnter = () => {
    dispatch(enterChat());
    dispatch(setInRoom({ inRoom: true, cohortId }));
    // chat:join is emitted by ChatRoom on mount
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Disclaimer */}
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--warning, #e89a3c)' }}>
            All chats are logged, saved, and reviewed by admin for pro-social behaviors.
          </p>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-heading font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Cohort Chat
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Collaborate with your peers on coding exercises
          </p>
        </div>

        {/* Chat Guidelines */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            Chat Guidelines
          </h3>
          <ul className="flex flex-col gap-2">
            {CHAT_NORMS.map((norm, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                  {i + 1}.
                </span>
                {norm}
              </li>
            ))}
          </ul>
        </div>

        {/* Help Examples */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            How to Ask for Help
          </h3>
          <div className="flex flex-col gap-2">
            {HELP_EXAMPLES.map((example, i) => (
              <div
                key={i}
                className="rounded-lg px-3 py-2"
                style={{ backgroundColor: 'var(--bg-root)', border: '1px solid var(--border)' }}
              >
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  {example.displayName}
                </span>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {example.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Users */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            Currently Active ({activeUsers.length})
          </h3>
          {activeUsers.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No one is in the chat yet. Be the first!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {activeUsers.map((u) => (
                <span
                  key={u.userId}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                  {u.displayName}
                  <RoleBadge role={u.role} />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Your info */}
        <div className="text-center">
          <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
            Joining as
          </p>
          <p className="font-heading font-semibold" style={{ color: 'var(--text-primary)' }}>
            {user?.displayName}
          </p>
        </div>

        {/* Enter button */}
        <div className="text-center pb-6">
          <button
            onClick={handleEnter}
            className="px-8 py-3 rounded-lg text-base font-heading font-bold transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-root)',
              cursor: 'pointer',
            }}
          >
            Enter the Chat
          </button>
        </div>
      </div>
    </div>
  );
}
