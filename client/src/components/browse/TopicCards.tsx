import { useAppDispatch, useAppSelector } from '../../features/store';
import { setCategoryPath } from '../../features/uiSlice';
import { calcPercent } from '../../utils/helpers';

export default function TopicCards() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.exercises.categories);
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const progressItems = useAppSelector((s) => s.progress.items);

  const topLevelKeys = Object.keys(categories);
  if (topLevelKeys.length === 0) return null;

  return (
    <div className="px-5 pt-5 pb-2">
      <h2 className="font-heading font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
        Topics
      </h2>
      <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {topLevelKeys.map((key) => {
          const cat = categories[key];
          const catExercises = exercises.filter((ex) => ex.category[0] === key);
          const completed = catExercises.filter((ex) => progressItems[ex._id]?.status === 'completed').length;
          const pct = calcPercent(completed, catExercises.length);

          return (
            <button
              key={key}
              onClick={() => dispatch(setCategoryPath([key]))}
              className="flex flex-col gap-2 p-4 rounded-lg text-left cursor-pointer transition-all duration-150"
              style={{ backgroundColor: 'var(--bg-surface)', border: `1px solid ${cat.color ?? 'var(--border)'}33` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${cat.color ?? 'var(--accent)'}66`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${cat.color ?? 'var(--border)'}33`; }}
            >
              <span className="font-heading font-semibold text-sm" style={{ color: cat.color ?? 'var(--text-primary)' }}>
                {cat.label}
              </span>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{completed}/{catExercises.length}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-raised)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cat.color ?? 'var(--accent)' }} />
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
