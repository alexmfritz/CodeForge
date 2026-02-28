interface LockProgressProps {
  current: number;
  needed: number;
}

export default function LockProgress({ current, needed }: LockProgressProps) {
  const pct = Math.min((current / needed) * 100, 100);
  const remaining = Math.max(needed - current, 0);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-faint)' }}>
      <span
        className="inline-block h-1 rounded-full overflow-hidden"
        style={{ width: '40px', backgroundColor: 'var(--bg-raised)' }}
      >
        <span
          className="block h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: 'var(--text-muted)' }}
        />
      </span>
      {remaining > 0 && <span>{remaining} more</span>}
    </span>
  );
}
