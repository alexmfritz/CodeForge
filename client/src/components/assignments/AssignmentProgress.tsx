interface AssignmentProgressProps {
  completed: number;
  total: number;
}

// Reusable progress bar with completion percentage and visual feedback
export default function AssignmentProgress({ completed, total }: AssignmentProgressProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0; // Full completion uses success color

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-raised)', minWidth: 60 }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: isComplete ? 'var(--success)' : 'var(--accent)',
          }}
        />
      </div>
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
        {completed}/{total}
      </span>
    </div>
  );
}
