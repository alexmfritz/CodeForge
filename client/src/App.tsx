// App — top-level routing: public /login route + all other routes wrapped in ProtectedRoute
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './features/store';
import { setTheme } from './features/uiSlice';
import { fetchMe, logout } from './features/authSlice';
import { THEMES } from '@codeforge/shared/constants';
import type { Theme } from '@codeforge/shared';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// App: applies theme class to <html>, fetches current user on mount if token exists but user is null
function App() {
  const theme = useAppSelector((state) => state.ui.theme);
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe());
    }
  }, [token, user, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// App: applies theme class to <html>, fetches current user on mount if token exists but user is null
// AppShell: authenticated layout with header (theme picker, user info, sign-out) and nested routes
function AppShell() {
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-bg-root text-text-primary transition-theme">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h1 className="text-xl font-heading font-bold tracking-tight">
          <span style={{ color: 'var(--accent)' }}>Code</span>Forge
        </h1>
        <div className="flex items-center gap-4">
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
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">
                {user.displayName}
                <span className="text-text-muted ml-1">({user.role})</span>
              </span>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm text-text-muted hover:text-error transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-20">
                <h2 className="text-3xl font-heading font-bold mb-2">
                  Welcome, {user?.displayName}
                </h2>
                <p className="text-text-secondary">
                  Signed in as <strong>{user?.username}</strong> ({user?.role})
                </p>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
