import { useNavigate } from 'react-router-dom';
import type { RecentActivityItem, Tier, ExerciseType } from '@codeforge/shared';
import { TIER_META, TYPE_META } from '@codeforge/shared/constants';

interface RecentActivityProps {
  items: RecentActivityItem[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
  const navigate = useNavigate();

  // empty state shown before the student has completed any exercises
  if (items.length === 0) {
    return (
      <div
        className="rounded-lg p-5"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
          Recent Activity
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          No completed exercises yet. Start solving to see your activity here!
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
        Recent Activity
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const tierMeta = TIER_META[item.tier as Tier];
          const typeMeta = TYPE_META[item.type as ExerciseType];
          const date = new Date(item.completedAt);
          const relative = formatRelativeDate(date);

          return (
            // button instead of div so each row is keyboard-navigable
            <button
              key={item.exerciseId + item.completedAt} // completedAt disambiguates if an exercise was reset and re-completed
              onClick={() => navigate(`/exercises/${item.exerciseId}`)}
              className="flex items-center gap-3 p-2 rounded-lg text-left cursor-pointer transition-all duration-150"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { // inline hover because Tailwind can't access CSS vars in hover: utilities
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-raised)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              {/* optional chaining guards against a tier value that hasn't been added to TIER_META yet */}
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: tierMeta?.bgColor, color: tierMeta?.color, border: `1px solid ${tierMeta?.borderColor}` }}
              >
                {tierMeta?.label}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {relative} &middot; {item.attempts} attempt{item.attempts !== 1 ? 's' : ''}
                </div>
              </div>
              <div
                className="flex-shrink-0 px-1.5 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: `${typeMeta?.color}22`, color: typeMeta?.color }}
              >
                {typeMeta?.label}
              </div>
              {/* prefix with + to reinforce that score is an earned reward, not a raw value */}
              <div className="flex-shrink-0 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                +{item.score}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// kept local since no other component needs relative dates yet; promote to a util if reused
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString(); // falls back to locale date string beyond one week
}
