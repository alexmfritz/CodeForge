import type { Tier } from '@codeforge/shared';
import { TIER_META } from '@codeforge/shared/constants';
import { useAppSelector } from '../../features/store';
import { calcPercent } from '../../utils/helpers';

interface CollectionProgressProps {
  onCollectionClick?: (collectionId: string) => void;
  filterTier?: Tier | null;
  filterCollection?: string | null;
}

export default function CollectionProgress({ onCollectionClick, filterTier, filterCollection }: CollectionProgressProps) {
  const collections = useAppSelector((s) => s.exercises.collections);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const progressItems = useAppSelector((s) => s.progress.items);

  let visibleCollections = collections.filter((c) => !c.hidden);
  if (filterCollection) {
    visibleCollections = visibleCollections.filter((c) => c._id === filterCollection);
  }
  if (visibleCollections.length === 0) return null;

  const tierSuffix = filterTier ? ` — Tier ${TIER_META[filterTier].label}` : '';

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        Collection Progress{tierSuffix}
      </h3>
      <div className="flex flex-col gap-3">
        {visibleCollections.map((col) => {
          const colIds = new Set(col.exerciseIds);
          let colExercises = exercises.filter((ex) => colIds.has(ex._id));
          if (filterTier) {
            colExercises = colExercises.filter((ex) => ex.tier === filterTier);
          }
          const completed = colExercises.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
          const total = colExercises.length;
          const pct = calcPercent(completed, total);

          return (
            <button
              key={col._id}
              type="button"
              onClick={() => onCollectionClick?.(col._id)}
              className="w-full text-left rounded-lg px-2 py-1.5 -mx-2 transition-colors"
              style={{ background: 'none', border: 'none', cursor: onCollectionClick ? 'pointer' : 'default' }}
              onMouseEnter={(e) => { if (onCollectionClick) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-raised)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                    {col.name}
                  </span>
                  {col.source && (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {col.source}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {completed}/{total} ({pct}%)
                  </span>
                  {onCollectionClick && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, backgroundColor: col.color ?? 'var(--accent)' }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
