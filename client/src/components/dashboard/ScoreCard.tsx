interface ScoreCardProps {
  totalScore: number;
  completedCount: number;
  totalExercises: number;
}

export default function ScoreCard({ totalScore, completedCount, totalExercises }: ScoreCardProps) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        // color-mix blends to a darker variant so the gradient stays on-theme across all 8 themes
        background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 60%, var(--bg-root)) 100%)',
        border: '1px solid var(--accent)',
      }}
    >
      {/* toLocaleString adds thousands separators for readability at high scores */}
      <div className="text-5xl font-heading font-bold mb-1" style={{ color: 'var(--bg-root)' }}>
        {totalScore.toLocaleString()}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--bg-surface)' }}>
        Total Score
      </div>
      {/* uses bg-surface instead of a fixed color so text remains legible on any accent */}
      <div className="mt-3 text-xs" style={{ color: 'var(--bg-surface)', opacity: 0.8 }}>
        {completedCount} of {totalExercises} exercises completed
      </div>
    </div>
  );
}
