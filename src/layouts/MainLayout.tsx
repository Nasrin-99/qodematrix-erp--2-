import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/common/Sidebar";
import { Navbar } from "../components/common/Navbar";
import { useAuthStore } from "../store/authStore";
import { profileService } from "../api/services";
import { cn } from "../utils/helpers";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export const DashboardLayout = () => {
const [isCollapsed, setIsCollapsed] = useState(false);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();
const { user, setUser, logout, isAuthenticated } = useAuthStore();

// ==========================
// 🔐 VERIFY TOKEN (BACKEND)
// ==========================
useEffect(() => {
const checkAuth = async () => {
try {
const res = await profileService.getProfile(); // 🔥 API CALL
setUser(res.user); // restore user
} catch (err) {
console.log("Auth failed", err);
logout();
navigate("/login");
} finally {
setLoading(false);
}
};

checkAuth();


}, []);

// ==========================
// ⏳ LOADING STATE
// ==========================
if (loading || isAuthenticated === null) {
return <LoadingSpinner />;
}

// ==========================
// ❌ NOT AUTHENTICATED
// ==========================
if (!isAuthenticated || !user) {
return <Navigate to="/login" replace />;
}

return ( <div className="min-h-screen bg-slate-50">
{/* Sidebar */} <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />


  {/* Navbar */}
  <Navbar isCollapsed={isCollapsed} />

  {/* Content */}
  <main
    className={cn(
      "pt-24 pb-12 px-6 transition-all duration-300",
      isCollapsed ? "pl-28" : "pl-72"
    )}
  >
    <div className="max-w-7xl mx-auto">
      <Outlet />
    </div>
  </main>
</div>


);
};
