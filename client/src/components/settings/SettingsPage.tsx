import { useAppDispatch, useAppSelector } from '../../features/store';
import { setTheme, setEditorFontSize } from '../../features/uiSlice';
import { updatePreferences } from '../../features/authSlice';
import { THEMES, MIN_EDITOR_FONT_SIZE, MAX_EDITOR_FONT_SIZE } from '@codeforge/shared/constants';
import type { Theme } from '@codeforge/shared';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);
  const editorFontSize = useAppSelector((s) => s.ui.editorFontSize);
  const user = useAppSelector((s) => s.auth.user);

  const leaderboardOptIn = user?.preferences.leaderboardOptIn ?? false;

  const handleThemeChange = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
    if (user) {
      dispatch(updatePreferences({ userId: user._id, preferences: { theme: newTheme } }));
    }
  };

  const handleFontSizeChange = (size: number) => {
    dispatch(setEditorFontSize(size));
    if (user) {
      dispatch(updatePreferences({ userId: user._id, preferences: { editorFontSize: size } }));
    }
  };

  const handleLeaderboardToggle = () => {
    if (!user) return;
    dispatch(
      updatePreferences({
        userId: user._id,
        preferences: { leaderboardOptIn: !leaderboardOptIn },
      }),
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-heading font-bold">Settings</h1>

        {/* Appearance */}
        <section className="bg-bg-surface border border-border rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <label className="block text-sm text-text-secondary mb-2">Theme</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {THEMES.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className="px-3 py-2.5 rounded text-xs font-medium transition-colors text-center flex items-center justify-center"
                  style={{
                    border: `2px solid ${isActive ? t.accent : 'var(--border)'}`,
                    backgroundColor: isActive ? `${t.accent}18` : 'transparent',
                    color: isActive ? t.accent : 'var(--text-secondary)',
                    minHeight: 48,
                  }}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <label className="block text-sm text-text-secondary mb-3">Editor Font Size</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={MIN_EDITOR_FONT_SIZE}
                max={MAX_EDITOR_FONT_SIZE}
                step={2}
                value={editorFontSize}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                className="flex-1"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span
                className="w-16 text-center font-code font-medium"
                style={{ fontSize: `${editorFontSize}px` }}
              >
                {editorFontSize}px
              </span>
            </div>
            <p className="text-xs mt-1.5" style={{ color: 'var(--text-faint)' }}>
              Also adjustable with Ctrl+= / Ctrl+- in the editor
            </p>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-bg-surface border border-border rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
          <p className="text-sm text-text-secondary mb-4">
            Opt in to appear on the cohort leaderboard. Your display name and scores will be visible
            to other students in your cohort. You can opt out at any time.
          </p>
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              role="switch"
              aria-checked={leaderboardOptIn}
              onClick={handleLeaderboardToggle}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{
                backgroundColor: leaderboardOptIn ? 'var(--accent)' : 'var(--bg-elevated)',
              }}
            >
              <span
                className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
                style={{
                  transform: leaderboardOptIn ? 'translateX(22px)' : 'translateX(4px)',
                }}
              />
            </button>
            <span className="text-sm font-medium">
              {leaderboardOptIn ? 'Visible on leaderboard' : 'Hidden from leaderboard'}
            </span>
          </label>
        </section>
      </div>
    </div>
  );
}
