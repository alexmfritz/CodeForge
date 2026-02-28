import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './features/store';
import { setTheme } from './features/uiSlice';
import { THEMES } from '@codeforge/shared/constants';
import type { Theme } from '@codeforge/shared';

function App() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg-root text-text-primary transition-theme">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h1 className="text-xl font-heading font-bold tracking-tight">
          <span style={{ color: 'var(--accent)' }}>Code</span>Forge
        </h1>
        <select
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value as Theme))}
          className="bg-bg-surface text-text-primary border border-border-strong rounded px-2 py-1 text-sm"
        >
          {THEMES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </header>
      <main className="flex items-center justify-center" style={{ height: 'calc(100vh - 65px)' }}>
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-2">CodeForge</h2>
          <p className="text-text-secondary">Scaffolding complete. Ready to build.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
