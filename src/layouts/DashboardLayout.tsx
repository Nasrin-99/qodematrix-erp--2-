import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/common/Sidebar";
import { Navbar } from "../components/common/Navbar";
import { useAuthStore } from "../store/authStore";
import { profileService  } from "../api/services";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export const DashboardLayoutWrapper = () => {
const [isCollapsed, setIsCollapsed] = useState(false);
const navigate = useNavigate();

const { user, setUser, logout, isAuthenticated } = useAuthStore();
const [loading, setLoading] = useState(true);

// ==========================
// 🔐 VERIFY TOKEN FROM BACKEND
// ==========================
useEffect(() => {
const initAuth = async () => {
try {
const res = await profileService.getProfile(); // 🔥 backend call
setUser(res.user); // save user in store
} catch (error) {
console.log("Auth failed", error);
logout();
navigate("/login");
} finally {
setLoading(false);
}
};


initAuth();


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
if (!user) {
navigate("/login");
return null;
}

return ( <div className="min-h-screen bg-slate-50">
{/* Sidebar */} <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />


  {/* Navbar */}
  <Navbar isCollapsed={isCollapsed} />

  {/* Main Content */}
  <main
    className={`pt-20 transition-all duration-300 ${
      isCollapsed ? "pl-20" : "pl-64"
    }`}
  >
    <div className="p-6">
      <Outlet />
    </div>
  </main>
</div>


);
};
