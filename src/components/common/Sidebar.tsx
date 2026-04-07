import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  CheckSquare,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore, UserRole } from "../../store/authStore";
import { getSidebarMenu } from "../../api/services";
import { cn } from "../../utils/helpers";
import { sidebarConfig } from "../../config/sidebarConfig";
import { Megaphone, Headphones } from "lucide-react";

interface SidebarItem {
  title: string;
  path: string;
  icon?: any;
  roles?: UserRole[];
}

const iconMap: Record<string, any> = {
  dashboard: LayoutDashboard,
  school: School,
  users: Users,
  students: GraduationCap,
  classes: BookOpen,
  attendance: CheckSquare,
  fees: CreditCard,
  settings: Settings,
  notice: Megaphone,
  help: Headphones,
};

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [menuItems, setMenuItems] = useState<SidebarItem[]>([]);

  // ==========================
  // ✅ FETCH MENU (API + FALLBACK)
  // ==========================
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getSidebarMenu();

        // ✅ Use backend if available
        if (res?.menu?.length) {
          setMenuItems(res.menu);
        } else {
          throw new Error("Empty menu");
        }
      } catch (err) {
        console.log("Using sidebarConfig fallback");

        // ✅ Role-based config
        const role = user?.role?.toLowerCase();

        if (!role) {
          setMenuItems([]);
          return;
        }

        const roleMenu = sidebarConfig[role as keyof typeof sidebarConfig] || [];
        setMenuItems(
          roleMenu.map((item: any) => ({
            title: item.name,
            path: item.path,
            icon: item.icon || "dashboard",
          }))
        );
      }
    };

    if (user?.role) {
      fetchMenu();
    }
  }, [user]);

  // ==========================
  // 🚪 LOGOUT
  // ==========================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-slate-900 text-slate-300 transition-all duration-300 z-40",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* HEADER */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
        {!isCollapsed && (
          <span className="text-xl font-bold text-white">
            Qode<span className="text-indigo-400">Matrix</span>
          </span>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          {isCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-6 px-3 space-y-1">
        {menuItems.map((item, i) => {
          const Icon = iconMap[item.icon || "dashboard"];

          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-800 hover:text-white"
                )
              }
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* USER + LOGOUT */}
      <div className="absolute bottom-4 left-0 w-full px-3 space-y-2">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-slate-800",
            isCollapsed && "justify-center"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
            {user?.name?.charAt(0) || "U"}
          </div>

          {!isCollapsed && (
            <div>
              <p className="text-xs text-white">{user?.name}</p>
              <p className="text-[10px] text-slate-400 uppercase">
                {user?.role}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg"
        >
          <LogOut size={18} />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};