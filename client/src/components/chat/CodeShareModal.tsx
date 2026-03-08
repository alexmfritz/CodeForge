import { useState, useEffect, useRef } from 'react';
import type { CodeSnippetData } from '@codeforge/shared';

interface CodeShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (snippet: CodeSnippetData) => void;
}

export default function CodeShareModal({ isOpen, onClose, onShare }: CodeShareModalProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
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

  const handleShare = () => {
    if (!code.trim()) return;
    onShare({ code: code.trim(), language });
    setCode('');
    setLanguage('javascript');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share Code"
        className="rounded-lg overflow-hidden w-full max-w-lg"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            Share Code
          </h3>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <label className="sr-only" htmlFor="code-language">Language</label>
          <select
            id="code-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1.5 rounded text-sm"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <label className="sr-only" htmlFor="code-content">Code</label>
          <textarea
            id="code-content"
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={10}
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              backgroundColor: 'var(--bg-root)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              resize: 'vertical',
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs font-medium"
            style={{ color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={!code.trim()}
            className="px-4 py-1.5 rounded text-xs font-medium"
            style={{
              backgroundColor: code.trim() ? 'var(--accent)' : 'var(--bg-raised)',
              color: code.trim() ? 'var(--bg-root)' : 'var(--text-muted)',
              cursor: code.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
