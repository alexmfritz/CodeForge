import { useState } from 'react';
import DifficultyReport from './DifficultyReport';
import CohortHeatmap from './CohortHeatmap';
import EngagementTimeline from './EngagementTimeline';

type AnalyticsView = 'difficulty' | 'heatmap' | 'engagement';

const VIEWS: { id: AnalyticsView; label: string; description: string }[] = [
  { id: 'difficulty', label: 'Exercise Difficulty', description: 'Identify which exercises students struggle with most \u2014 sorted by completion rate, attempt count, and solution usage.' },
  { id: 'heatmap', label: 'Cohort Heatmap', description: 'Visualize each student\u2019s progress across exercises \u2014 green for completed, yellow for in progress, gray for not started.' },
  { id: 'engagement', label: 'Engagement', description: 'Track daily student activity and spot students who may need additional support.' },
];

interface Props {
  cohortId?: string;
}

export default function AnalyticsPanel({ cohortId }: Props) {
  const [activeView, setActiveView] = useState<AnalyticsView>('difficulty');

  return (
    <div className="flex flex-col gap-6">
      <div
        className="flex items-center gap-1 p-1 rounded-lg self-start"
        style={{ backgroundColor: 'var(--bg-raised)' }}
      >
        {VIEWS.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className="px-4 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={{
              backgroundColor: activeView === view.id ? 'var(--bg-surface)' : 'transparent',
              color: activeView === view.id ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            {view.label}
          </button>
        ))}
      </div>

      <p className="text-xs -mt-3" style={{ color: 'var(--text-muted)' }}>
        {VIEWS.find((v) => v.id === activeView)?.description}
      </p>

      {activeView === 'difficulty' && <DifficultyReport cohortId={cohortId} />}
      {activeView === 'heatmap' && <CohortHeatmap cohortId={cohortId} />}
      {activeView === 'engagement' && <EngagementTimeline cohortId={cohortId} />}
    </div>
  );
}
