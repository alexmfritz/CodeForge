import type { BreakdownEntry, Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { calcPercent } from '../../utils/helpers';

interface TierBreakdownProps {
  tierBreakdown: Record<number, BreakdownEntry>;
}

export default function TierBreakdown({ tierBreakdown }: TierBreakdownProps) {
  const tiers = [1, 2, 3, 4, 5] as Tier[]; // explicit ordered array so tiers always render 1→5 regardless of object key order

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        Progress by Tier
      </h3>
      <div className="flex flex-col gap-3">
        {tiers.map((tier) => {
          const meta = TIER_META[tier];
          const data = tierBreakdown[tier];
          if (!data) return null; // tier exists in meta but student has no exercises at this level yet
          const pct = calcPercent(data.completed, data.total);

          return (
            <div key={tier} className="flex items-center gap-3">
              {/* tier badge reuses the same colors as exercise cards for visual consistency */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.bgColor, color: meta.color, border: `1px solid ${meta.borderColor}` }}
              >
                {meta.label}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {meta.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {data.completed}/{data.total} ({pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
                  {/* CSS transition animates bar width on initial render */}
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: meta.color }}
                  />
                </div>
              </div>
              {/* score column is right-aligned and fixed-width to keep bars visually aligned */}
              <div className="flex-shrink-0 text-xs font-medium w-12 text-right" style={{ color: meta.color }}>
                {data.score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
