import { useEffect, useRef } from 'react';

interface KeyboardShortcutConfig {
  onSave: (() => void) | null;
  onTogglePanel: (() => void) | null;
  onNavigatePrev: (() => void) | null;
  onNavigateNext: (() => void) | null;
  onFontSizeUp: (() => void) | null;
  onFontSizeDown: (() => void) | null;
  isModalOpen: boolean;
}

/**
 * Document-level keyboard shortcuts for the exercise editor.
 *
 * - Ctrl/Cmd+S  → Save (flush debounce)
 * - Escape      → Toggle instructions panel (unless a modal is open)
 * - Ctrl/Cmd+[  → Previous exercise
 * - Ctrl/Cmd+]  → Next exercise
 * - Ctrl/Cmd+=  → Increase editor font size
 * - Ctrl/Cmd+-  → Decrease editor font size
 *
 * Uses a configRef pattern to avoid re-registering the listener
 * every time a callback changes.
 */
export function useKeyboardShortcuts(config: KeyboardShortcutConfig) {
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const cfg = configRef.current;
      const mod = e.metaKey || e.ctrlKey;

      // Ctrl/Cmd + S → Save
      if (mod && e.key === 's') {
        e.preventDefault();
        cfg.onSave?.();
        return;
      }

      // Escape → Toggle panel (only when no modal is open)
      if (e.key === 'Escape' && !cfg.isModalOpen) {
        cfg.onTogglePanel?.();
        return;
      }

      // Ctrl/Cmd + [ → Previous exercise
      if (mod && e.key === '[') {
        e.preventDefault();
        cfg.onNavigatePrev?.();
        return;
      }

      // Ctrl/Cmd + ] → Next exercise
      if (mod && e.key === ']') {
        e.preventDefault();
        cfg.onNavigateNext?.();
        return;
      }

      // Ctrl/Cmd + = → Increase editor font size
      if (mod && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        cfg.onFontSizeUp?.();
        return;
      }

      // Ctrl/Cmd + - → Decrease editor font size
      if (mod && e.key === '-') {
        e.preventDefault();
        cfg.onFontSizeDown?.();
        return;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
