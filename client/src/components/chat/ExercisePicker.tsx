import { useState, useMemo, useEffect, useRef } from 'react';
import { useAppSelector } from '../../features/store';
import type { Exercise } from '@codeforge/shared';

interface ExercisePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

export default function ExercisePicker({ isOpen, onClose, onSelect }: ExercisePickerProps) {
  const exercises = useAppSelector((s) => s.exercises.exercises);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return exercises.slice(0, 20);
    const q = search.toLowerCase();
    return exercises.filter((ex) => ex.title.toLowerCase().includes(q)).slice(0, 20);
  }, [exercises, search]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share an Exercise"
        className="rounded-lg overflow-hidden w-full max-w-md"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
            Share an Exercise
          </h3>
          <label className="sr-only" htmlFor="exercise-search">Search exercises</label>
          <input
            id="exercise-search"
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises..."
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          />
        </div>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
              No exercises found
            </div>
          ) : (
            filtered.map((ex) => (
              <button
                key={ex._id}
                onClick={() => {
                  onSelect(ex);
                  onClose();
                  setSearch('');
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors"
                style={{
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                }}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm truncate block" style={{ color: 'var(--text-primary)' }}>
                    {ex.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  <span className="uppercase">{ex.type}</span>
                  <span className="inline-block px-1 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-raised)' }}>
                    T{ex.tier}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs font-medium"
            style={{ color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
