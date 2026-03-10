import type { AchievementDefinition } from '@codeforge/shared';

interface AchievementCardProps {
  definition: AchievementDefinition;
  earned: boolean;
  earnedAt?: string;
  progress?: { current: number; target: number };
}

export default function AchievementCard({ definition, earned, earnedAt, progress }: AchievementCardProps) {
  const hasProgress = progress && progress.target > 0;
  const rawPct = hasProgress ? progress.current / progress.target : 0;
  const pct = Math.min(rawPct, 1);
  const metCriteria = !earned && hasProgress && rawPct >= 1;
  const almostThere = !earned && hasProgress && rawPct >= 0.8 && rawPct < 1;
  const hasAnyProgress = !earned && hasProgress && progress.current > 0;

  return (
    <div
      className="rounded-lg p-4 flex flex-col items-center text-center transition-all duration-200"
      style={{
        backgroundColor: earned ? 'var(--bg-surface)' : 'var(--bg-root)',
        border: earned ? '1px solid var(--accent)' : '1px solid var(--border)',
        opacity: earned ? 1 : hasAnyProgress ? 0.7 : 0.55,
      }}
    >
      {/* Icon */}
      <div
        className="text-3xl mb-2 select-none"
        style={{
          filter: earned ? 'none' : hasAnyProgress ? 'grayscale(0.5)' : 'grayscale(1)',
        }}
      >
        {earned || hasAnyProgress ? definition.icon : '\uD83D\uDD12'}
      </div>

      {/* Name */}
      <div
        className="font-heading font-semibold text-sm mb-1"
        style={{ color: earned ? 'var(--text-primary)' : 'var(--text-muted)' }}
      >
        {definition.name}
      </div>

      {/* Description */}
      <div
        className="text-xs leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {definition.description}
      </div>

      {/* Earned date badge */}
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

      {/* Progress bar (unearned only) */}
      {!earned && hasProgress && (
        <div className="w-full mt-2">
          {/* Track */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '4px', backgroundColor: 'var(--bg-raised)' }}
          >
            {/* Fill */}
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(pct * 100, pct > 0 ? 4 : 0)}%`,
                backgroundColor: metCriteria ? 'var(--success)' : almostThere ? 'var(--accent)' : 'var(--text-muted)',
              }}
            />
          </div>
          {/* Progress text */}
          <div
            className="text-xs mt-1"
            style={{ color: metCriteria ? 'var(--success)' : 'var(--text-faint)' }}
          >
            {Math.min(progress.current, progress.target).toLocaleString()} / {progress.target.toLocaleString()}
          </div>
        </div>
      )}

      {/* Status badge */}
      {metCriteria && (
        <div
          className="text-xs mt-1.5 px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--success) 15%, transparent)',
            color: 'var(--success)',
          }}
        >
          Criteria met!
        </div>
      )}
      {almostThere && (
        <div
          className="text-xs mt-1.5 px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            color: 'var(--accent)',
          }}
        >
          Almost there!
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
