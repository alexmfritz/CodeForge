import type { Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function TierBadge({ tier, size = 'sm', showName }: TierBadgeProps) {
  const meta = TIER_META[tier];
  const px = size === 'lg' ? 28 : size === 'md' ? 24 : 20;
  const fs = size === 'lg' ? 11 : size === 'md' ? 10 : 9;

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="tier-badge inline-flex items-center justify-center font-bold rounded-full"
        style={{
          width: px,
          height: px,
          fontSize: fs,
          backgroundColor: meta.bgColor,
          border: `1px solid ${meta.borderColor}`,
          color: meta.color,
        }}
      >
        {meta.label}
      </span>
      {showName && (
        <span className="text-xs capitalize" style={{ color: meta.color }}>
          {meta.name}
        </span>
      )}
    </span>
  );
}
