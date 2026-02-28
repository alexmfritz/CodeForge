import { useNavigate } from 'react-router-dom';
import type { ExerciseLinkData } from '@codeforge/shared';

export default function ExerciseLinkCard({ data }: { data: ExerciseLinkData }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/exercises/${data.exerciseId}`);
      }}
      className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg text-left w-full"
      style={{
        backgroundColor: 'var(--bg-root)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
      }}
    >
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium block truncate" style={{ color: 'var(--text-primary)' }}>
          {data.title}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
        <span className="uppercase">{data.type}</span>
        <span
          className="inline-block px-1 py-0.5 rounded"
          style={{ backgroundColor: 'var(--bg-raised)' }}
        >
          T{data.tier}
        </span>
      </div>
    </button>
  );
}
