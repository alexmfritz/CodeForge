import type { LeaderboardHighlight } from '@codeforge/shared';

interface Props {
  highlights: LeaderboardHighlight[];
  loading: boolean;
}

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

export default function HighlightsWidget({ highlights, loading }: Props) {
  if (loading && highlights.length === 0) {
    return (
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-3">Recent Highlights</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded bg-bg-elevated animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border rounded-lg p-5">
      <h3 className="text-lg font-semibold mb-3">Recent Highlights</h3>
      {highlights.length === 0 ? (
        <p className="text-sm text-text-muted">No recent highlights.</p>
      ) : (
        <div className="space-y-2">
          {highlights.map((h, i) => (
            <div
              key={`${h.userId}-${h.timestamp}-${i}`}
              className="flex items-start gap-3 p-2.5 rounded-lg"
              style={{ backgroundColor: 'var(--bg-elevated)' }}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{h.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{h.displayName}</span>{' '}
                  <span className="text-text-secondary">{h.description}</span>
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {formatRelativeTime(h.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
