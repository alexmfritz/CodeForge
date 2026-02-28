interface StatsRowProps {
  completedCount: number;
  inProgressCount: number;
  totalAttempts: number;
  totalScore: number;
}

export default function StatsRow({ completedCount, inProgressCount, totalAttempts, totalScore }: StatsRowProps) {
  const stats = [
    { label: 'Completed', value: completedCount, color: 'var(--success)' },
    { label: 'In Progress', value: inProgressCount, color: '#f59e0b' },
    { label: 'Total Attempts', value: totalAttempts, color: 'var(--text-secondary)' },
    { label: 'Avg Score', value: completedCount > 0 ? Math.round(totalScore / completedCount) : 0, color: 'var(--accent)' },
  ];

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg p-4 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="text-2xl font-heading font-bold" style={{ color: s.color }}>
            {s.value.toLocaleString()}
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
