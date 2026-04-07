import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

interface ProtectedRouteProps {
allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
allowedRoles,
}) => {
const { user, isAuthenticated } = useAuthStore();

// ===============================
// ⏳ AUTH CHECK LOADING
// ===============================
if (isAuthenticated === null) {
return <LoadingSpinner fullScreen text="Checking authentication..." />;
}

// ===============================
// ❌ NOT LOGGED IN
// ===============================
if (!isAuthenticated || !user) {
return <Navigate to="/login" replace />;
}

// ===============================
// 🔐 ROLE BASED ACCESS
// ===============================
if (allowedRoles && !allowedRoles.includes(user.role)) {
return <Navigate to="/dashboard" replace />;
}

// ===============================
// ✅ ACCESS GRANTED
// ===============================
return <Outlet />;
};
