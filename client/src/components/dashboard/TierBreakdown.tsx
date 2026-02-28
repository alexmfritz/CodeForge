import type { BreakdownEntry, Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { calcPercent } from '../../utils/helpers';

interface TierBreakdownProps {
  tierBreakdown: Record<number, BreakdownEntry>;
  onTierClick?: (tier: Tier) => void;
}

export default function TierBreakdown({ tierBreakdown, onTierClick }: TierBreakdownProps) {
  const tiers = [1, 2, 3, 4, 5] as Tier[];

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
          if (!data) return null;
          const pct = calcPercent(data.completed, data.total);

          return (
            <button
              key={tier}
              type="button"
              onClick={() => onTierClick?.(tier)}
              className="flex items-center gap-3 w-full text-left rounded-lg px-2 py-1.5 -mx-2 transition-colors"
              style={{ background: 'none', border: 'none', cursor: onTierClick ? 'pointer' : 'default' }}
              onMouseEnter={(e) => { if (onTierClick) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-raised)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
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
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: meta.color }}
                  />
                </div>
              </div>
              <div className="flex-shrink-0 text-xs font-medium w-12 text-right" style={{ color: meta.color }}>
                {data.score}
              </div>
              {onTierClick && (
                <svg className="flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
