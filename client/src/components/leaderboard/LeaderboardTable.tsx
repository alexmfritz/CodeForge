import type { LeaderboardEntry, Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { useAppSelector } from '../../features/store';

const RANK_COLORS: Record<number, string> = {
  1: '#fbbf24', // gold
  2: '#94a3b8', // silver
  3: '#d97706', // bronze
};

interface Props {
  entries: LeaderboardEntry[];
  showCohort: boolean;
}

export default function LeaderboardTable({ entries, showCohort }: Props) {
  const currentUserId = useAppSelector((s) => s.auth.user?._id);

  if (entries.length === 0) {
    return (
      <div className="bg-bg-surface border border-border rounded-lg p-8 text-center text-text-muted">
        No students have opted in to the leaderboard yet.
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-text-muted text-left">
            <th className="px-4 py-3 w-12">#</th>
            <th className="px-4 py-3">Name</th>
            {showCohort && <th className="px-4 py-3">Cohort</th>}
            <th className="px-4 py-3 text-right">Score</th>
            <th className="px-4 py-3 text-right">Completed</th>
            <th className="px-4 py-3 text-center">Tiers</th>
            <th className="px-4 py-3 text-right">Streak</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isYou = entry.userId === currentUserId;
            return (
              <tr
                key={entry.userId}
                className="border-b border-border last:border-0 transition-colors"
                style={{
                  backgroundColor: isYou ? 'var(--bg-elevated)' : undefined,
                }}
              >
                <td className="px-4 py-3 font-bold" style={{ color: RANK_COLORS[entry.rank] }}>
                  {entry.rank}
                </td>
                <td className="px-4 py-3 font-medium">
                  {entry.displayName}
                  {isYou && (
                    <span className="ml-1.5 text-xs text-text-muted">(you)</span>
                  )}
                </td>
                {showCohort && (
                  <td className="px-4 py-3 text-text-secondary">{entry.cohortName}</td>
                )}
                <td className="px-4 py-3 text-right font-mono" style={{ color: 'var(--accent)' }}>
                  {entry.totalScore.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-text-secondary">
                  {entry.completedCount}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    {([1, 2, 3, 4, 5] as Tier[]).map((tier) => {
                      const count = entry.tierBreakdown[tier] || 0;
                      if (count === 0) return null;
                      const meta = TIER_META[tier];
                      return (
                        <span
                          key={tier}
                          className="inline-flex items-center rounded text-[10px] font-bold px-1.5 py-0.5"
                          style={{
                            backgroundColor: meta.bgColor,
                            color: meta.color,
                            border: `1px solid ${meta.borderColor}`,
                          }}
                          title={`Tier ${meta.label} (${meta.name}): ${count}`}
                        >
                          {meta.label}:{count}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {entry.streak > 0 && (
                    <span className="text-warning font-medium">{entry.streak}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
