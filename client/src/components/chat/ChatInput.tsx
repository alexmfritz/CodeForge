import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppSelector } from '../../features/store';
import { getSocket } from '../../utils/socket';
import type { Exercise, ChatActiveUser, CodeSnippetData } from '@codeforge/shared';
import ExercisePicker from './ExercisePicker';
import CodeShareModal from './CodeShareModal';

export default function ChatInput() {
  const [text, setText] = useState('');
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showCodeShare, setShowCodeShare] = useState(false);
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const activeUsers = useAppSelector((s) => s.chat.activeUsers);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendTyping = useCallback((isTyping: boolean) => {
    const socket = getSocket();
    if (socket) socket.emit('chat:typing', isTyping);
  }, []);

  const handleTextChange = (val: string) => {
    setText(val);

    // Typing indicator
    sendTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => sendTyping(false), 2000);

    // @mention detection
    const cursor = inputRef.current?.selectionStart ?? val.length;
    const beforeCursor = val.slice(0, cursor);
    const atMatch = beforeCursor.match(/@(\w*)$/);
    if (atMatch) {
      setShowMentionList(true);
      setMentionFilter(atMatch[1].toLowerCase());
    } else {
      setShowMentionList(false);
    }
  };

  const filteredMentionUsers = activeUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(mentionFilter) ||
      u.displayName.toLowerCase().includes(mentionFilter),
  );

  const insertMention = (user: ChatActiveUser) => {
    const cursor = inputRef.current?.selectionStart ?? text.length;
    const beforeCursor = text.slice(0, cursor);
    const afterCursor = text.slice(cursor);
    const atIndex = beforeCursor.lastIndexOf('@');
    const newText = beforeCursor.slice(0, atIndex) + `@${user.username} ` + afterCursor;
    setText(newText);
    setShowMentionList(false);
    inputRef.current?.focus();
  };

  const parseMentions = (content: string): string[] => {
    const usernames = activeUsers.map((u) => u.username);
    const mentions: string[] = [];
    const regex = /@(\w+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (usernames.includes(match[1])) {
        mentions.push(match[1]);
      }
    }
    return [...new Set(mentions)];
  };

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const socket = getSocket();
    if (!socket) return;

    const mentions = parseMentions(trimmed);
    socket.emit('chat:send-message', {
      messageType: 'text',
      content: trimmed,
      mentions: mentions.length > 0 ? mentions : undefined,
    });
    setText('');
    sendTyping(false);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  };

  const handleExerciseSelect = (exercise: Exercise) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit('chat:send-message', {
      messageType: 'exercise-link',
      content: 'Check out this exercise:',
      exerciseLink: {
        exerciseId: exercise._id,
        title: exercise.title,
        tier: exercise.tier,
        type: exercise.type,
      },
    });
  };

  const handleCodeShare = (snippet: CodeSnippetData) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit('chat:send-message', {
      messageType: 'code-snippet',
      content: '',
      codeSnippet: snippet,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  return (
    <div className="relative" style={{ borderTop: '1px solid var(--border)' }}>
      {/* @mention autocomplete dropdown */}
      {showMentionList && filteredMentionUsers.length > 0 && (
        <div
          className="absolute bottom-full left-0 right-0 rounded-t-lg overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderBottom: 'none' }}
        >
          {filteredMentionUsers.slice(0, 5).map((user) => (
            <button
              key={user.userId}
              onClick={() => insertMention(user)}
              className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors"
              style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>{user.displayName}</span>
              <span style={{ color: 'var(--text-muted)' }}>@{user.username}</span>
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 pt-2">
        <button
          onClick={() => setShowExercisePicker(true)}
          className="px-2 py-1 rounded text-[11px] font-medium"
          style={{ color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'var(--bg-raised)' }}
          title="Share an exercise"
        >
          Exercise
        </button>
        <button
          onClick={() => setShowCodeShare(true)}
          className="px-2 py-1 rounded text-[11px] font-medium"
          style={{ color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'var(--bg-raised)' }}
          title="Share code"
        >
          Code
        </button>
      </div>

      {/* Input area */}
      <div className="flex items-end gap-2 p-3">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Shift+Enter for new line)"
          rows={1}
          className="flex-1 px-3 py-2 rounded-lg text-sm resize-none"
          style={{
            backgroundColor: 'var(--bg-root)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            maxHeight: 120,
            minHeight: 38,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          className="px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0"
          style={{
            backgroundColor: text.trim() ? 'var(--accent)' : 'var(--bg-raised)',
            color: text.trim() ? 'var(--bg-root)' : 'var(--text-muted)',
            cursor: text.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Send
        </button>
      </div>

      <ExercisePicker
        isOpen={showExercisePicker}
        onClose={() => setShowExercisePicker(false)}
        onSelect={handleExerciseSelect}
      />
      <CodeShareModal
        isOpen={showCodeShare}
        onClose={() => setShowCodeShare(false)}
        onShare={handleCodeShare}
      />
    </div>
  );
}
