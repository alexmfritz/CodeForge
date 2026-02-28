import type { AchievementDefinition } from '@codeforge/shared';

interface AchievementCardProps {
  definition: AchievementDefinition;
  earned: boolean;
  earnedAt?: string;
}

export default function AchievementCard({ definition, earned, earnedAt }: AchievementCardProps) {
  return (
    <div
      className="rounded-lg p-4 flex flex-col items-center text-center transition-all duration-200"
      style={{
        backgroundColor: earned ? 'var(--bg-surface)' : 'var(--bg-root)',
        border: earned ? '1px solid var(--accent)' : '1px solid var(--border)',
        opacity: earned ? 1 : 0.55,
      }}
    >
      <div
        className="text-3xl mb-2 select-none"
        style={{
          filter: earned ? 'none' : 'grayscale(1)',
        }}
      >
        {earned ? definition.icon : '\uD83D\uDD12'}
      </div>
      <div
        className="font-heading font-semibold text-sm mb-1"
        style={{ color: earned ? 'var(--text-primary)' : 'var(--text-muted)' }}
      >
        {definition.name}
      </div>
      <div
        className="text-xs leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {definition.description}
      </div>
      {earned && earnedAt && (
        <div
          className="text-xs mt-2 px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            color: 'var(--accent)',
          }}
        >
          Earned {formatDate(earnedAt)}
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
