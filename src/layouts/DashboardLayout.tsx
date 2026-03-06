import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  UserCircle,
  Megaphone,
  FileSpreadsheet,
  Library,
  Bus,
  HelpCircle
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../store/authStore';
import { cn } from '../utils/helpers';
import { Button } from '../components/ui/Button';

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['superadmin', 'schooladmin', 'teacher', 'student', 'parent'] },
  // Super Admin
  { title: 'Schools', path: '/superadmin/schools', icon: School, roles: ['superadmin'] },
  { title: 'Subscriptions', path: '/superadmin/subscriptions', icon: CreditCard, roles: ['superadmin'] },
  // School Admin
  { title: 'Students', path: '/schooladmin/students', icon: GraduationCap, roles: ['schooladmin'] },
  { title: 'Teachers', path: '/schooladmin/teachers', icon: Users, roles: ['schooladmin'] },
  { title: 'Classes', path: '/schooladmin/classes', icon: BookOpen, roles: ['schooladmin'] },
  { title: 'Attendance', path: '/schooladmin/attendance', icon: Calendar, roles: ['schooladmin'] },
  { title: 'Fees', path: '/schooladmin/fees', icon: CreditCard, roles: ['schooladmin'] },
  // Teacher
  { title: 'My Classes', path: '/teacher/classes', icon: BookOpen, roles: ['teacher'] },
  { title: 'Attendance', path: '/teacher/attendance', icon: Calendar, roles: ['teacher'] },
  { title: 'Homework', path: '/teacher/homework', icon: BookOpen, roles: ['teacher'] },
  // Student
  { title: 'My Classes', path: '/student/classes', icon: BookOpen, roles: ['student'] },
  { title: 'My Attendance', path: '/student/attendance', icon: Calendar, roles: ['student'] },
  { title: 'My Fees', path: '/student/fees', icon: CreditCard, roles: ['student'] },
  // Parent
  { title: 'Child Performance', path: '/parent/performance', icon: GraduationCap, roles: ['parent'] },
  { title: 'Child Attendance', path: '/parent/attendance', icon: Calendar, roles: ['parent'] },
  
  { title: 'Notice Board', path: '/notices', icon: Megaphone, roles: ['superadmin', 'schooladmin', 'teacher', 'student', 'parent'] },
  { title: 'Exams', path: '/exams', icon: FileSpreadsheet, roles: ['superadmin', 'schooladmin', 'teacher', 'student', 'parent'] },
  { title: 'Library', path: '/library', icon: Library, roles: ['schooladmin', 'teacher', 'student'] },
  { title: 'Transport', path: '/transport', icon: Bus, roles: ['schooladmin', 'student', 'parent'] },
  { title: 'Help & Support', path: '/help', icon: HelpCircle, roles: ['superadmin', 'schooladmin', 'teacher', 'student', 'parent'] },
  { title: 'Settings', path: '/settings', icon: Settings, roles: ['superadmin', 'schooladmin', 'teacher', 'student', 'parent'] },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (v: boolean) => void }) => {
  const { user } = useAuthStore();
  const role = user?.role;

  const filteredItems = sidebarItems.filter(item => role && item.roles.includes(role));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-slate-900 text-slate-300 transition-all duration-300 z-40',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
        {!isCollapsed && <span className="text-xl font-bold text-white tracking-tight">Qode<span className="text-indigo-400">Matrix</span></span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6 px-3 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group',
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              )
            }
          >
            <item.icon size={20} className={cn('shrink-0', isCollapsed ? 'mx-auto' : '')} />
            {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 w-full px-3">
        <div className={cn('flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50', isCollapsed ? 'justify-center' : '')}>
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {user?.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export const Navbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-30 transition-all duration-300 flex items-center justify-between px-6',
        isCollapsed ? 'left-20' : 'left-64'
      )}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-slate-500 hidden sm:block">Welcome back, <span className="text-slate-900 font-semibold">{user?.name}</span></h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 gap-2">
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};
