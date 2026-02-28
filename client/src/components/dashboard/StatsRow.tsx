interface StatsRowProps {
  completedCount: number;
  inProgressCount: number;
  totalAttempts: number;
  totalScore: number;
  onStatClick?: (stat: string) => void;
}

export default function StatsRow({ completedCount, inProgressCount, totalAttempts, totalScore, onStatClick }: StatsRowProps) {
  const stats = [
    { key: 'completed', label: 'Completed', value: completedCount, color: 'var(--success)', clickable: true },
    { key: 'in-progress', label: 'In Progress', value: inProgressCount, color: '#f59e0b', clickable: true },
    { key: 'attempts', label: 'Total Attempts', value: totalAttempts, color: 'var(--text-secondary)', clickable: false },
    { key: 'avg-score', label: 'Avg Score', value: completedCount > 0 ? Math.round(totalScore / completedCount) : 0, color: 'var(--accent)', clickable: false },
  ];

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
    >
      {stats.map((s) => {
        const isClickable = s.clickable && onStatClick && s.value > 0;
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => isClickable && onStatClick?.(s.key)}
            className="rounded-lg p-4 text-center transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: isClickable ? 'pointer' : 'default',
            }}
            onMouseEnter={(e) => { if (isClickable) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-raised)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)'; }}
          >
            <div className="text-2xl font-heading font-bold" style={{ color: s.color }}>
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {s.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
