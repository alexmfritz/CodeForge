import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './features/store';
import { setTheme } from './features/uiSlice';
import { fetchMe, logout } from './features/authSlice';
import { fetchExercises } from './features/exercisesSlice';
import { fetchProgress } from './features/progressSlice';
import { THEMES } from '@codeforge/shared/constants';
import type { Theme } from '@codeforge/shared';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BrowseView from './components/browse/BrowseView';
import ExerciseView from './components/exercise/ExerciseView';
import Toast from './components/shared/Toast';

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

  useEffect(() => {
    if (user) {
      dispatch(fetchExercises());
      dispatch(fetchProgress());
    }
  }, [user, dispatch]);

  return (
    <>
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
      <Toast />
    </>
  );
}

function AppShell() {
  const theme = useAppSelector((state) => state.ui.theme);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-bg-root text-text-primary transition-theme">
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border">
        <h1
          className="text-xl font-heading font-bold tracking-tight cursor-pointer"
          onClick={() => navigate('/exercises')}
        >
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
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/exercises" element={<BrowseView />} />
          <Route path="/exercises/:id" element={<ExerciseView />} />
          <Route path="/" element={<Navigate to="/exercises" replace />} />
          <Route path="*" element={<Navigate to="/exercises" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
