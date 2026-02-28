import type { BreakdownEntry, ExerciseType } from '@codeforge/shared';
import { TYPE_META } from '@codeforge/shared/constants';
import { calcPercent } from '../../utils/helpers';

interface TypeBreakdownProps {
  typeBreakdown: Record<string, BreakdownEntry>;
}

export default function TypeBreakdown({ typeBreakdown }: TypeBreakdownProps) {
  // derive order from TYPE_META so adding a new type only requires updating the shared constant
  const types = Object.keys(TYPE_META) as ExerciseType[];

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        Progress by Type
      </h3>
      <div className="flex flex-col gap-3">
        {types.map((type) => {
          const meta = TYPE_META[type];
          const data = typeBreakdown[type];
          if (!data) return null; // type is defined in meta but student has no exercises of this type
          const pct = calcPercent(data.completed, data.total);

          return (
            <div key={type} className="flex items-center gap-3">
              {/* `${color}22` appends hex alpha for a translucent tinted pill background */}
              <div
                className="flex-shrink-0 px-2 py-1 rounded text-xs font-bold"
                style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
              >
                {meta.label}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
