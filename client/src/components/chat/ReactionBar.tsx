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
}

export default function ReactionBar({ messageId, reactions }: ReactionBarProps) {
  const userId = useAppSelector((s) => s.auth.user?._id);

  const handleReact = (emoji: EmojiReaction) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit('chat:react', { messageId, emoji });
  };

  return (
    <div className="flex items-center gap-1 mt-1">
      {EMOJI_OPTIONS.map((emoji) => {
        const reaction = reactions.find((r) => r.emoji === emoji);
        const count = reaction?.userIds.length ?? 0;
        const hasReacted = reaction?.userIds.includes(userId ?? '') ?? false;

        return (
          <button
            key={emoji}
            onClick={() => handleReact(emoji)}
            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] transition-colors"
            style={{
              backgroundColor: hasReacted ? 'var(--bg-surface)' : 'transparent',
              border: hasReacted ? '1px solid var(--accent)' : '1px solid transparent',
              cursor: 'pointer',
              opacity: count > 0 ? 1 : 0.4,
            }}
            title={emoji}
          >
            <span>{EMOJI_MAP[emoji]}</span>
            {count > 0 && (
              <span style={{ color: hasReacted ? 'var(--accent)' : 'var(--text-muted)' }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
