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
        background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 60%, var(--bg-root)) 100%)',
        border: '1px solid var(--accent)',
      }}
    >
      <div className="text-5xl font-heading font-bold mb-1" style={{ color: 'var(--bg-root)' }}>
        {totalScore.toLocaleString()}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--bg-surface)' }}>
        Total Score
      </div>
      <div className="mt-3 text-xs" style={{ color: 'var(--bg-surface)', opacity: 0.8 }}>
        {completedCount} of {totalExercises} exercises completed
      </div>
    </div>
  );
}
