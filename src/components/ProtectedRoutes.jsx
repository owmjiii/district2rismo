import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return null; 

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

 
  const isAllowed =
    !allowedRoles ||
    allowedRoles.includes(userRole) ||
    (userRole === "host" && allowedRoles.includes("customer")) ||
    userRole === "admin"; 

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};