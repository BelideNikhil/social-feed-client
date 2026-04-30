import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/auth.context";

export const PublicRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>; // 1. User sees this when hitting "Next"
  }
  return user ? <Navigate to="/feed" replace /> : <Outlet />;
};
