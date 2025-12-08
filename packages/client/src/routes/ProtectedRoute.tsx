import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const auth = useAuth();

  // Handle null auth context
  if (!auth) return <Navigate to="/login" replace />;

  const { user, loading } = auth;

  // While we don't know whether user is logged in
  if (loading) return <p>Loading...</p>;

  // Role check
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
