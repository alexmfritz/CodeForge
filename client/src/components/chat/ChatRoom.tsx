import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/store';
import { setInRoom, resetUnread } from '../../features/chatSlice';
import { getSocket } from '../../utils/socket';
import { CHAT_NORMS } from './chatNorms';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ActiveUsersSidebar from './ActiveUsersSidebar';

export default function ChatRoom() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((s) => s.chat.messages);
  const pinnedMessage = useAppSelector((s) => s.chat.pinnedMessage);
  const activeUsers = useAppSelector((s) => s.chat.activeUsers);
  const typingUsers = useAppSelector((s) => s.chat.typingUsers);
  const userId = useAppSelector((s) => s.auth.user?._id);
  const userRole = useAppSelector((s) => s.auth.user?.role);
  const currentCohortId = useAppSelector((s) => s.chat.currentCohortId);
  const isInstructor = userRole === 'instructor' || userRole === 'ta';

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [normIndex, setNormIndex] = useState(0);

  // Join the room on mount and on socket reconnect
  useEffect(() => {
    if (!currentCohortId) return;
    const socket = getSocket();
    if (!socket) return;

    const joinRoom = () => {
      socket.emit('chat:join', { cohortId: currentCohortId });
    };

    // Join now
    joinRoom();

    // Re-join on reconnect (e.g. after server restart or network blip)
    socket.on('connect', joinRoom);

    return () => {
      socket.off('connect', joinRoom);
    };
  }, [currentCohortId]);

  // Auto-rotating system norm
  useEffect(() => {
    const timer = setInterval(() => {
      setNormIndex((prev) => (prev + 1) % CHAT_NORMS.length);
    }, 90_000);
    return () => clearInterval(timer);
  }, []);

  // Reset unread when entering
  useEffect(() => {
    dispatch(resetUnread());
  }, [dispatch]);

  // Auto-scroll on new message (only if near bottom)
  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initial scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.emit('chat:leave');
      }
      dispatch(setInRoom({ inRoom: false, cohortId: null }));
    };
  }, [dispatch]);

  const handleUnpin = () => {
    const socket = getSocket();
    if (socket) socket.emit('chat:unpin');
  };

  const otherTyping = typingUsers.filter((t) => t.userId !== userId && t.isTyping);

  return (
    <div className="h-full flex flex-col">
      {/* Disclaimer bar */}
      <div className="flex-shrink-0 px-4 py-1.5 text-center" style={{ backgroundColor: 'var(--bg-raised)', borderBottom: '1px solid var(--border)' }}>
        <span className="text-[10px]" style={{ color: 'var(--warning, #e89a3c)' }}>
          All chats are logged and reviewed. Be respectful and professional.
        </span>
      </div>

      {/* Pinned message */}
      {pinnedMessage && (
        <div
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
        >
          <span className="text-xs" style={{ color: 'var(--warning, #e89a3c)' }}>
            {'\uD83D\uDCCC'}
          </span>
          <span className="text-xs flex-1 truncate" style={{ color: 'var(--text-secondary)' }}>
            <strong>{pinnedMessage.displayName}:</strong> {pinnedMessage.content}
          </span>
          {isInstructor && (
            <button
              onClick={handleUnpin}
              className="text-[10px]"
              style={{ color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'transparent' }}
            >
              Unpin
            </button>
          )}
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Message area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* System norm banner */}
          <div className="flex-shrink-0 px-4 py-2 text-center" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
              {CHAT_NORMS[normIndex]}
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3"
          >
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg._id} message={msg} showPin />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing indicator */}
          {otherTyping.length > 0 && (
            <div className="flex-shrink-0 px-4 py-1">
              <span className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                {otherTyping.length === 1
                  ? 'Someone is typing...'
                  : `${otherTyping.length} people are typing...`}
              </span>
            </div>
          )}

          {/* Input */}
          <ChatInput />
        </div>

        {/* Active users sidebar */}
        <ActiveUsersSidebar users={activeUsers} />
      </div>
    </div>
  );
}
