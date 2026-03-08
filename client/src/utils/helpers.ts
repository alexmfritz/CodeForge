import type { Tier, ExerciseType, Category } from '@codeforge/shared';
import { TIER_META, TYPE_META } from '@codeforge/shared/constants';

interface DebouncedFn<T extends (...args: never[]) => unknown> {
  (...args: Parameters<T>): void;
  flush(): void;
}

export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number,
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout>;
  let pendingArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer);
    pendingArgs = args;
    timer = setTimeout(() => {
      pendingArgs = null;
      fn(...args);
    }, delay);
  };

  debounced.flush = () => {
    if (pendingArgs) {
      clearTimeout(timer);
      const args = pendingArgs;
      pendingArgs = null;
      fn(...args);
    }
  };

  return debounced;
}

export function getCategoryColor(
  categoryPath: string[],
  categories: Record<string, Category>,
): string {
  if (categoryPath.length === 0) return 'var(--accent)';
  const root = categories[categoryPath[0]];
  return root?.color ?? 'var(--accent)';
}

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

export function calcPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
