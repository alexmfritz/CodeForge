import { useAppSelector } from '../../features/store';
import { calcPercent } from '../../utils/helpers';

export default function CollectionProgress() {
  const collections = useAppSelector((s) => s.exercises.collections);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const progressItems = useAppSelector((s) => s.progress.items);

  const visibleCollections = collections.filter((c) => !c.hidden);
  if (visibleCollections.length === 0) return null;

  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-heading font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        Collection Progress
      </h3>
      <div className="flex flex-col gap-3">
        {visibleCollections.map((col) => {
          const colIds = new Set(col.exerciseIds);
          const colExercises = exercises.filter((ex) => colIds.has(ex._id));
          const completed = colExercises.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
          const total = colExercises.length;
          const pct = calcPercent(completed, total);

          return (
            <div key={col._id}>
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
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {completed}/{total} ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, backgroundColor: col.color ?? 'var(--accent)' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
