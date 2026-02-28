import { useState, useEffect, useRef } from 'react';
import type { ChatReaction, EmojiReaction } from '@codeforge/shared';
import { useAppSelector } from '../../features/store';
import { getSocket } from '../../utils/socket';

const EMOJI_MAP: Record<EmojiReaction, string> = {
  'thumbs-up': '\uD83D\uDC4D',
  lightbulb: '\uD83D\uDCA1',
  checkmark: '\u2705',
};

const EMOJI_OPTIONS: EmojiReaction[] = ['thumbs-up', 'lightbulb', 'checkmark'];

interface ReactionBarProps {
  messageId: string;
  reactions: ChatReaction[];
  isOwn: boolean;
  readOnly?: boolean;
}

export default function ReactionBar({ messageId, reactions, isOwn, readOnly }: ReactionBarProps) {
  const userId = useAppSelector((s) => s.auth.user?._id);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [positionAbove, setPositionAbove] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleReact = (emoji: EmojiReaction) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit('chat:react', { messageId, emoji });
  };

  // Position picker above or below based on location in scroll container
  useEffect(() => {
    if (!isPickerOpen || !triggerRef.current) return;
    const scrollParent = triggerRef.current.closest('.overflow-y-auto') as HTMLElement | null;
    if (!scrollParent) return;
    const scrollRect = scrollParent.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const midpoint = scrollRect.top + scrollRect.height / 2;
    setPositionAbove(triggerRect.top > midpoint);
  }, [isPickerOpen]);

  // Close on click-outside, Escape, and scroll
  useEffect(() => {
    if (!isPickerOpen) return;

    const close = () => setIsPickerOpen(false);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current && !pickerRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const scrollParent = triggerRef.current?.closest('.overflow-y-auto');

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    scrollParent?.addEventListener('scroll', close, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      scrollParent?.removeEventListener('scroll', close);
    };
  }, [isPickerOpen]);

  const activeReactions = EMOJI_OPTIONS.filter((emoji) => {
    const r = reactions.find((rx) => rx.emoji === emoji);
    return r && r.userIds.length > 0;
  });

  const hasAnyReactions = activeReactions.length > 0;

  // If read-only and no reactions, render nothing
  if (readOnly && !hasAnyReactions) return null;

  return (
    <div className="flex items-center gap-1 mt-1">
      {/* Inline pills for existing reactions */}
      {activeReactions.map((emoji) => {
        const reaction = reactions.find((r) => r.emoji === emoji)!;
        const count = reaction.userIds.length;
        const hasReacted = reaction.userIds.includes(userId ?? '');

        return (
          <button
            key={emoji}
            onClick={readOnly ? undefined : () => handleReact(emoji)}
            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] transition-colors"
            style={{
              backgroundColor: isOwn
                ? hasReacted ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)'
                : hasReacted ? 'var(--bg-raised, var(--bg-surface))' : 'var(--bg-surface)',
              border: isOwn
                ? hasReacted ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)'
                : hasReacted ? '1px solid var(--accent)' : '1px solid var(--border)',
              cursor: readOnly ? 'default' : 'pointer',
            }}
            title={emoji}
          >
            <span style={{ fontSize: 11 }}>{EMOJI_MAP[emoji]}</span>
            <span style={{
              color: isOwn
                ? 'rgba(255,255,255,0.9)'
                : hasReacted ? 'var(--accent)' : 'var(--text-muted)',
            }}>
              {count}
            </span>
          </button>
        );
      })}

      {/* Hover trigger + Popover */}
      {!readOnly && (
        <div style={{ position: 'relative' }}>
          <button
            ref={triggerRef}
            onClick={() => setIsPickerOpen((v) => !v)}
            className={`flex items-center justify-center rounded-full transition-opacity ${isPickerOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            style={{
              width: 22,
              height: 22,
              fontSize: 12,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isOwn ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
            }}
            title="React"
          >
            {isPickerOpen ? '\u2715' : '\u263A'}
          </button>

          {isPickerOpen && (
            <div
              ref={pickerRef}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded-full"
              style={{
                position: 'absolute',
                ...(positionAbove ? { bottom: '100%' } : { top: '100%' }),
                ...(isOwn ? { right: 0 } : { left: 0 }),
                zIndex: 20,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                marginTop: positionAbove ? 0 : 4,
                marginBottom: positionAbove ? 4 : 0,
                animation: 'reactionPickerIn 100ms ease-out',
              }}
            >
              {EMOJI_OPTIONS.map((emoji) => {
                const reaction = reactions.find((r) => r.emoji === emoji);
                const hasReacted = reaction?.userIds.includes(userId ?? '') ?? false;

                return (
                  <button
                    key={emoji}
                    onClick={() => {
                      handleReact(emoji);
                      setIsPickerOpen(false);
                    }}
                    className="flex items-center justify-center rounded-full transition-colors"
                    style={{
                      width: 30,
                      height: 30,
                      fontSize: 16,
                      backgroundColor: hasReacted ? 'var(--bg-raised, var(--bg-surface))' : 'transparent',
                      border: hasReacted ? '1px solid var(--accent)' : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                    title={emoji}
                  >
                    {EMOJI_MAP[emoji]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Keyframe animation for picker entrance */}
      {isPickerOpen && (
        <style>{`
          @keyframes reactionPickerIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      )}
    </div>
  );
}
