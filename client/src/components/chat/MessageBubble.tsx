import type { ChatMessage } from '@codeforge/shared';
import { useAppSelector } from '../../features/store';
import RoleBadge from './RoleBadge';
import ExerciseLinkCard from './ExerciseLinkCard';
import CodeSnippetBlock from './CodeSnippetBlock';
import ReactionBar from './ReactionBar';
import { getSocket } from '../../utils/socket';

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function renderContent(content: string, mentions?: string[]) {
  if (!mentions || !mentions.length) return content;
  const regex = new RegExp(`@(${mentions.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = content.split(regex);
  return parts.map((part, i) =>
    mentions.includes(part) ? (
      <span key={i} style={{ color: 'var(--accent)', fontWeight: 600 }}>
        @{part}
      </span>
    ) : (
      part
    ),
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
  showPin?: boolean;
}

export default function MessageBubble({ message, showPin }: MessageBubbleProps) {
  const userId = useAppSelector((s) => s.auth.user?._id);
  const userRole = useAppSelector((s) => s.auth.user?.role);
  const isOwn = message.userId === userId;
  const isInstructor = userRole === 'instructor' || userRole === 'ta';

  const handlePin = () => {
    const socket = getSocket();
    if (!socket) return;
    if (message.isPinned) {
      socket.emit('chat:unpin');
    } else {
      socket.emit('chat:pin', message._id);
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}>
      <div
        style={{
          backgroundColor: isOwn ? 'var(--accent)' : 'var(--bg-surface)',
          color: isOwn ? 'white' : 'var(--text-primary)',
          borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          border: isOwn ? 'none' : '1px solid var(--border)',
          padding: '8px 14px',
          maxWidth: '70%',
          minWidth: 120,
        }}
      >
        <div
          className="flex items-center gap-1 text-[10px] mb-0.5"
          style={{ opacity: isOwn ? 0.8 : 1, color: isOwn ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}
        >
          <span className="font-medium">{message.displayName}</span>
          {!isOwn && <RoleBadge role={message.role} />}
          <span>&middot;</span>
          <span>{formatTime(message.createdAt)}</span>
          {message.isPinned && (
            <span title="Pinned" style={{ color: isOwn ? 'rgba(255,255,255,0.8)' : 'var(--warning, #e89a3c)' }}>
              {' \uD83D\uDCCC'}
            </span>
          )}
        </div>

        {message.messageType === 'text' && (
          <div className="text-sm whitespace-pre-wrap break-words">
            {renderContent(message.content, message.mentions)}
          </div>
        )}

        {message.messageType === 'exercise-link' && message.exerciseLink && (
          <div>
            {message.content && (
              <div className="text-sm mb-1">{renderContent(message.content, message.mentions)}</div>
            )}
            <ExerciseLinkCard data={message.exerciseLink} />
          </div>
        )}

        {message.messageType === 'code-snippet' && message.codeSnippet && (
          <div>
            {message.content && (
              <div className="text-sm mb-1">{renderContent(message.content, message.mentions)}</div>
            )}
            <CodeSnippetBlock data={message.codeSnippet} />
          </div>
        )}

        <div className="flex items-center justify-between" style={{ position: 'relative' }}>
          <ReactionBar messageId={message._id ?? ''} reactions={message.reactions ?? []} isOwn={isOwn} readOnly={!showPin} />
          {isInstructor && showPin && (
            <button
              onClick={handlePin}
              className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-2"
              style={{ color: isOwn ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'transparent' }}
              title={message.isPinned ? 'Unpin' : 'Pin message'}
            >
              {message.isPinned ? 'Unpin' : 'Pin'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
