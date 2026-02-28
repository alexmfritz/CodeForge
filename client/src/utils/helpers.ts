import type { Tier, ExerciseType, Category } from '@codeforge/shared';
import { TIER_META, TYPE_META } from '@codeforge/shared/constants';

// Prevents rapid-fire calls (e.g. auto-save on every keystroke) by collapsing into one
export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Resolves the accent color from the root of the category tree for consistent badge tinting
export function getCategoryColor(
  categoryPath: string[],
  categories: Record<string, Category>,
): string {
  if (categoryPath.length === 0) return 'var(--accent)';
  const root = categories[categoryPath[0]];
  return root?.color ?? 'var(--accent)';
}

// Walks the category tree to build human-readable breadcrumb labels
export function getCategoryLabels(
  categoryPath: string[],
  categories: Record<string, Category>,
): string[] {
  const labels: string[] = [];
  let node: Record<string, Category> | undefined = categories;
  for (const seg of categoryPath) {
    const cat: Category | undefined = node?.[seg];
    if (!cat) break;
    labels.push(cat.label);
    node = cat.children;
  }
  return labels;
}

export function getTierColor(tier: Tier): string {
  return TIER_META[tier]?.color ?? '#888';
}

export function getTypeColor(type: ExerciseType): string {
  return TYPE_META[type]?.color ?? '#888';
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Avoids division-by-zero for empty collections, returns integer percentage
export function calcPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
