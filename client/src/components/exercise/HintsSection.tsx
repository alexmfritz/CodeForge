import { HINT_GATES } from '@codeforge/shared/constants';
import MarkdownLite from '../shared/MarkdownLite';
import LockProgress from './LockProgress';

const HINT_LABELS = ['Hint 1', 'Hint 2', 'Hint 3'] as const;

interface HintsSectionProps {
  hints: string[];
  expandedHints: Set<number>;
  onToggleHint: (index: number) => void;
  uniqueAttempts: number;
}

// Progressive hint reveal: each hint unlocks after a configurable number of unique attempts
export default function HintsSection({ hints, expandedHints, onToggleHint, uniqueAttempts }: HintsSectionProps) {
  if (hints.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {hints.map((hintText, i) => {
        // Each hint has an escalating gate; fall back to the last threshold for extra hints
        const gateThreshold = HINT_GATES[i] ?? HINT_GATES[HINT_GATES.length - 1];
        const unlocked = uniqueAttempts >= gateThreshold;

        return (
          <div key={i} className="rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <button
              onClick={() => { if (unlocked) onToggleHint(i); }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: 'var(--bg-raised)',
                color: unlocked ? 'var(--text-secondary)' : 'var(--text-faint)',
                cursor: unlocked ? 'pointer' : 'not-allowed',
                border: 'none',
                fontFamily: 'Lexend, sans-serif',
              }}
              disabled={!unlocked}
              aria-expanded={unlocked ? expandedHints.has(i) : undefined}
            >
              <span className="flex items-center gap-2">
                {unlocked ? '💡' : '🔒'} {HINT_LABELS[i] ?? `Hint ${i + 1}`}
                {!unlocked && <LockProgress current={uniqueAttempts} needed={gateThreshold} />}
              </span>
              {unlocked && (
                <span style={{ color: 'var(--text-faint)' }} aria-hidden="true">
                  {expandedHints.has(i) ? '▲' : '▼'}
                </span>
              )}
            </button>
            {unlocked && expandedHints.has(i) && (
              <div
                className="px-3 py-2 text-xs leading-relaxed"
                style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
              >
                <MarkdownLite text={hintText} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
