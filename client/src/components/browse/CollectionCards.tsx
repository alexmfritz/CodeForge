import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { setCollectionFilter } from '../../features/uiSlice';
import { calcPercent } from '../../utils/helpers';

export default function CollectionCards() {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((s) => s.exercises.collections);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const progressItems = useAppSelector((s) => s.progress.items);

  const visibleCollections = collections.filter((c) => !c.hidden);

  const inProgressCount = useMemo(() => {
    return exercises.filter((ex) => {
      const p = progressItems[ex._id];
      return p && p.status === 'in_progress';
    }).length;
  }, [exercises, progressItems]);

  if (visibleCollections.length === 0 && inProgressCount === 0) return null;

  return (
    <div className="px-5 pt-2 pb-4">
      <h2 className="font-heading font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
        Collections
      </h2>
      <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {inProgressCount > 0 && (
          <button
            onClick={() => dispatch(setCollectionFilter('__in-progress__'))}
            className="flex flex-col gap-2 p-4 rounded-lg text-left cursor-pointer transition-all duration-150"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px dashed #f59e0b66' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#f59e0b'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#f59e0b66'; }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#f59e0b'; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#f59e0b66'; }}
          >
            <span className="font-heading font-semibold text-sm" style={{ color: '#f59e0b' }}>
              In Progress
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {inProgressCount} exercise{inProgressCount !== 1 ? 's' : ''}
            </span>
          </button>
        )}
        {visibleCollections.map((col) => {
          const colIds = new Set(col.exerciseIds);
          const colExercises = exercises.filter((ex) => colIds.has(ex._id));
          const colCompleted = colExercises.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
          const pct = calcPercent(colCompleted, colExercises.length);

          return (
            <button
              key={col._id}
              onClick={() => dispatch(setCollectionFilter(col._id))}
              className="flex flex-col gap-2 p-4 rounded-lg text-left cursor-pointer transition-all duration-150"
              style={{ backgroundColor: 'var(--bg-surface)', border: `1px solid ${col.color ?? 'var(--border)'}33` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${col.color ?? 'var(--accent)'}66`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${col.color ?? 'var(--border)'}33`; }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${col.color ?? 'var(--accent)'}66`; }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${col.color ?? 'var(--border)'}33`; }}
            >
              <span className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{col.name}</span>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{colCompleted}/{colExercises.length}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col.color ?? 'var(--accent)' }} />
                </div>
                <span>{pct}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
