import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { getNotifications, logoutUser } from "../../api/services";
import { cn } from "../../utils/helpers";

interface NavbarProps {
isCollapsed: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isCollapsed }) => {
const navigate = useNavigate();
const { user, logout } = useAuthStore();

const [notifications, setNotifications] = useState<any[]>([]);
const [loadingNotif, setLoadingNotif] = useState(false);

// ==========================
// 🔔 FETCH NOTIFICATIONS (BACKEND)
// ==========================
useEffect(() => {
const fetchNotifications = async () => {
try {
setLoadingNotif(true);
const res = await getNotifications();
setNotifications(res.notifications || []);
} catch (err) {
console.log("Notification fetch error", err);
} finally {
setLoadingNotif(false);
}
};


fetchNotifications();


}, []);

// ==========================
// 🚪 LOGOUT (BACKEND + FRONTEND)
// ==========================
const handleLogout = async () => {
try {
await logoutUser(); // backend logout (optional)
} catch (err) {
console.log("Logout API failed");
} finally {
logout(); // clear store + token
navigate("/login");
}
};

return (
<header
className={cn(
"fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-30 transition-all duration-300 flex items-center justify-between px-6",
isCollapsed ? "left-20" : "left-64"
)}
>
{/* LEFT */} <div> <h2 className="text-sm font-medium text-slate-500 hidden sm:block">
Welcome back,{" "} <span className="text-slate-900 font-semibold">
{user?.name || "User"} </span> </h2> </div>


  {/* RIGHT */}
  <div className="flex items-center gap-3">
    {/* 🔔 Notifications */}
    <Button variant="ghost" size="icon" className="relative">
      <Bell size={20} />

      {/* Badge */}
      {notifications.length > 0 && (
        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </Button>

    {/* Divider */}
    <div className="h-8 w-px bg-slate-200 mx-1"></div>

    {/* 🚪 Logout */}
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-slate-600 gap-2"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  </div>
</header>


);
};
