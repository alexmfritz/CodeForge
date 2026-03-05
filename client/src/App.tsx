import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './features/store';
import { fetchMe, logout } from './features/authSlice';
import { fetchExercises } from './features/exercisesSlice';
import { fetchProgress } from './features/progressSlice';
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BrowseView from './components/browse/BrowseView';
import ExerciseView from './components/exercise/ExerciseView';
import StudentDashboard from './components/dashboard/StudentDashboard';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import AssignmentDetail from './components/assignments/AssignmentDetail';
import ChatPage from './components/chat/ChatPage';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import SettingsPage from './components/settings/SettingsPage';
import Toast from './components/shared/Toast';
import AchievementToast from './components/achievements/AchievementToast';
import { useSocket } from './hooks/useSocket';

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
      <AchievementToast />
    </>
  );
}

function AppShell() {
  const user = useAppSelector((state) => state.auth.user);
  const unreadCount = useAppSelector((state) => state.chat.unreadCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useSocket();

  return (
    <div className="h-screen flex flex-col bg-bg-root text-text-primary transition-theme">
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-6">
          <h1
            className="text-xl font-heading font-bold tracking-tight cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <span style={{ color: 'var(--accent)' }}>Code</span>Forge
          </h1>
          <nav className="flex items-center gap-1">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/exercises" label="Exercises" />
            <NavLink to="/chat" label="Chat" badge={location.pathname.startsWith('/chat') ? undefined : unreadCount} />
            <NavLink to="/leaderboard" label="Leaderboard" />
          </nav>
        </div>
        {user && <UserMenu user={user} onSettings={() => navigate('/settings')} onLogout={() => dispatch(logout())} />}
      </header>
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route
            path="/dashboard"
            element={
              user?.role === 'instructor' || user?.role === 'ta'
                ? <InstructorDashboard />
                : <StudentDashboard />
            }
          />
          <Route path="/exercises" element={<BrowseView />} />
          <Route path="/exercises/:id" element={<ExerciseView />} />
          <Route path="/assignments/:id" element={<AssignmentDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function UserMenu({ user, onSettings, onLogout }: { user: { displayName: string }; onSettings: () => void; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="text-sm text-text-secondary hover:text-text-primary transition-colors px-2 py-1">
        {user.displayName} <span className="text-text-muted text-xs">&#9662;</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 min-w-[140px] rounded-lg border border-border shadow-lg overflow-hidden z-50"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          <button
            onClick={() => { onSettings(); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-elevated)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Settings
          </button>
          <button
            onClick={() => { onLogout(); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-sm transition-colors"
            style={{ color: 'var(--error)', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-elevated)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

function NavLink({ to, label, badge }: { to: string; label: string; badge?: number }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.startsWith(to);

  return (
    <button
      onClick={() => navigate(to)}
      className="relative px-3 py-1.5 rounded text-sm font-medium transition-colors"
      style={{
        backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
        cursor: 'pointer',
      }}
    >
      {label}
      {badge != null && badge > 0 && (
        <span
          className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white text-[10px] font-bold"
          style={{
            backgroundColor: 'var(--error)',
            minWidth: 16,
            height: 16,
            padding: '0 4px',
          }}
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

export default App;
