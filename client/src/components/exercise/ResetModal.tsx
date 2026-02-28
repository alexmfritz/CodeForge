import { useEffect, useRef } from 'react';

interface ResetModalProps {
  isOpen: boolean;
  isComplete: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ResetModal({ isOpen, isComplete, onConfirm, onCancel }: ResetModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) cancelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Tab') {
        e.preventDefault();
        if (document.activeElement === cancelRef.current) {
          confirmRef.current?.focus();
        } else {
          cancelRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Reset confirmation"
    >
      <div
        className="rounded-lg p-6 max-w-sm w-full mx-4"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-heading font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
          Reset Exercise?
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          This will clear your code and restore the starter code.
          {isComplete && ' Your completion status will also be cleared.'}
        </p>
        <div className="flex justify-end gap-2">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-3 py-1.5 rounded text-sm"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="px-3 py-1.5 rounded text-sm font-medium"
            style={{ backgroundColor: 'var(--error)', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
