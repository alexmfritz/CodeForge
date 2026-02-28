import { useAppDispatch, useAppSelector } from '../../features/store';
import { setCategoryPath } from '../../features/uiSlice';
import type { Category } from '@codeforge/shared';

export default function SubcategoryNav() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.exercises.categories);
  const categoryPath = useAppSelector((s) => s.ui.browseFilter.categoryPath);

  let node: Record<string, Category> | undefined = categories;
  for (const seg of categoryPath) {
    const cat: Category | undefined = node?.[seg];
    if (!cat) break;
    node = cat.children;
  }

  if (!node || Object.keys(node).length === 0) return null;

  return (
    <div className="px-5 py-3 flex flex-wrap gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
      {Object.entries(node).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => dispatch(setCategoryPath([...categoryPath, key]))}
          className="px-3 py-1.5 rounded text-xs"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: `1px solid ${cat.color ?? 'var(--border)'}44`,
            color: cat.color ?? 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
