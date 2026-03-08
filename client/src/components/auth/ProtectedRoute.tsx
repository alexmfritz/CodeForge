import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../features/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, user, loading } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Show loading while fetchMe is in flight or hasn't resolved yet
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg-root flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
