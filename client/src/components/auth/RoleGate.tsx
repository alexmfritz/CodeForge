// RoleGate — conditionally renders children only if the current user has one of the allowed roles
import { useAppSelector } from '../../features/store';
import type { Role } from '@codeforge/shared';

interface RoleGateProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// If user is missing or role is not in the allowed list, render fallback (default: nothing)
export default function RoleGate({ roles, children, fallback = null }: RoleGateProps) {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || !roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
