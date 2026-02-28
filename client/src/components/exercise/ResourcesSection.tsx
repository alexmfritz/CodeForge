import type { Resource } from '@codeforge/shared';

interface ResourcesSectionProps {
  resources: Resource[];
  expanded: boolean;
  onToggle: () => void;
}

export default function ResourcesSection({ resources, expanded, onToggle }: ResourcesSectionProps) {
  if (resources.length === 0) return null;

  return (
    <div className="rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium"
        style={{
          backgroundColor: 'var(--bg-raised)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          border: 'none',
          fontFamily: 'Lexend, sans-serif',
        }}
        aria-expanded={expanded}
      >
        <span>Learn More ({resources.length})</span>
        <span style={{ color: 'var(--text-faint)' }} aria-hidden="true">
          {expanded ? '▲' : '▼'}
        </span>
      </button>
      {expanded && (
        <div
          className="px-3 py-2 flex flex-col gap-2"
          style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
        >
          {resources.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {r.label}
              {r.description && (
                <span style={{ color: 'var(--text-muted)' }}> — {r.description}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
