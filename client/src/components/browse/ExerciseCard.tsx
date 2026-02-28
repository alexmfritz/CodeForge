import { useNavigate } from 'react-router-dom';
import type { Exercise } from '@codeforge/shared';
import { useAppSelector } from '../../features/store';
import { getCategoryColor } from '../../utils/helpers';
import TierBadge from '../shared/TierBadge';
import TypeBadge from '../shared/TypeBadge';
import RatingDisplay from '../ratings/RatingDisplay';

interface ExerciseCardProps {
  exercise: Exercise;
  onDismiss?: (exerciseId: string) => void;
}

export default function ExerciseCard({ exercise, onDismiss }: ExerciseCardProps) {
  const navigate = useNavigate();
  const categories = useAppSelector((s) => s.exercises.categories);
  const progress = useAppSelector((s) => s.progress.items[exercise._id]);
  const isComplete = progress?.status === 'completed';
  const attempts = progress?.attempts ?? 0;

  const catColor = getCategoryColor(exercise.category, categories);

  return (
    <article
      className="relative flex flex-col gap-3 p-4 rounded-lg cursor-pointer transition-all duration-150"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: isComplete ? `1px solid ${catColor}55` : '1px solid var(--border)',
      }}
      onClick={() => navigate(`/exercises/${exercise._id}`)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = isComplete ? `${catColor}99` : 'var(--border-strong)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = isComplete ? `${catColor}55` : 'var(--border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/exercises/${exercise._id}`); } }}
      aria-label={`Exercise: ${exercise.title}`}
    >
      {onDismiss ? (
        <button
          className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded"
          style={{ color: 'var(--text-muted)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); onDismiss(exercise._id); }}
          title="Remove from In Progress"
          aria-label={`Remove ${exercise.title} from In Progress`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : isComplete ? (
        <span className="absolute top-3 right-3 text-xs font-bold" style={{ color: 'var(--success)' }} title="Completed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
      ) : attempts > 0 ? (
        <span className="absolute top-3 right-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }} title={`${attempts} attempt${attempts !== 1 ? 's' : ''}`}>
          {attempts}
        </span>
      ) : null}
      <div className="flex items-center gap-2 pr-6">
        <TierBadge tier={exercise.tier} size="sm" />
        <TypeBadge type={exercise.type} />
      </div>
      <h3 className="font-heading font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
        {exercise.title}
      </h3>
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {exercise.description}
      </p>
      <RatingDisplay exerciseId={exercise._id} />
      {exercise.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {exercise.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
