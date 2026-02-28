import type { ChatActiveUser } from '@codeforge/shared';
import RoleBadge from './RoleBadge';

interface ActiveUsersSidebarProps {
  users: ChatActiveUser[];
}

export default function ActiveUsersSidebar({ users }: ActiveUsersSidebarProps) {
  return (
    <div
      className="w-48 flex-shrink-0 overflow-y-auto p-3"
      style={{ borderLeft: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}
    >
      <h3 className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
        Active ({users.length})
      </h3>
      <div className="flex flex-col gap-1.5">
        {users.map((user) => (
          <div key={user.userId} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'var(--success)' }}
            />
            <span className="text-xs truncate" style={{ color: 'var(--text-primary)' }}>
              {user.displayName}
            </span>
            <RoleBadge role={user.role} />
          </div>
        ))}
        {users.length === 0 && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            No one here yet
          </span>
        )}
      </div>
    </div>
  );
}
