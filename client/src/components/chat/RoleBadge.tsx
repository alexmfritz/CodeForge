import type { Role } from '@codeforge/shared';

const ROLE_CONFIG: Partial<Record<Role, { label: string; color: string }>> = {
  instructor: { label: 'Instructor', color: 'var(--success)' },
  ta: { label: 'TA', color: 'var(--accent)' },
};

export default function RoleBadge({ role }: { role: Role }) {
  const config = ROLE_CONFIG[role];
  if (!config) return null;

  return (
    <span
      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ml-1"
      style={{ backgroundColor: 'var(--bg-raised)', color: config.color }}
    >
      {config.label}
    </span>
  );
}
