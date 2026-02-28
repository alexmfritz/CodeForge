import { useEffect, useRef } from 'react';

interface CompareModalProps {
  isOpen: boolean;
  studentCode: string;
  referenceCode: string;
  language: string;
  onClose: () => void;
}

export default function CompareModal({ isOpen, studentCode, referenceCode, onClose }: CompareModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compare solutions"
    >
      <div
        className="rounded-lg max-w-4xl w-full mx-4 flex flex-col"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Compare Solutions
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-sm px-2 py-1 rounded"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            Close
          </button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden" style={{ borderRight: '1px solid var(--border)' }}>
            <div
              className="flex-shrink-0 px-3 py-1 text-xs"
              style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontFamily: 'Lexend, sans-serif' }}
            >
              Your Solution
            </div>
            <pre
              className="flex-1 overflow-auto p-3 text-xs font-code"
              style={{ backgroundColor: 'var(--bg-editor)', color: 'var(--text-primary)', margin: 0 }}
            >
              {studentCode}
            </pre>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="flex-shrink-0 px-3 py-1 text-xs"
              style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontFamily: 'Lexend, sans-serif' }}
            >
              Reference Solution
            </div>
            <pre
              className="flex-1 overflow-auto p-3 text-xs font-code"
              style={{ backgroundColor: 'var(--bg-editor)', color: 'var(--text-primary)', margin: 0 }}
            >
              {referenceCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
