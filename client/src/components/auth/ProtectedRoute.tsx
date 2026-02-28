// ProtectedRoute — wrapper that redirects unauthenticated users to /login
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../features/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// If loading, show spinner; if no token, redirect to /login; otherwise render children
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-root flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
