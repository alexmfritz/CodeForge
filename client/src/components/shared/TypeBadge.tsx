import type { ExerciseType } from '@codeforge/shared';
import { TYPE_META } from '@codeforge/shared/constants';

interface TypeBadgeProps {
  type: ExerciseType;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  const meta = TYPE_META[type];
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
      style={{
        color: meta.color,
        backgroundColor: `${meta.color}18`,
        border: `1px solid ${meta.color}33`,
        fontFamily: 'Lexend, sans-serif',
      }}
    >
      {meta.label}
    </span>
  );
}
