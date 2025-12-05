import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  // Handle null auth context
  if (!auth) return <Navigate to="/login" replace />;

  const { user, loading } = auth;

  // While we don't know whether user is logged in
  if (loading) return <p>Loading...</p>;

  // If not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
