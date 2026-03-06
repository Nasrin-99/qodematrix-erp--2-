import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, Navbar } from './DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/helpers';

export const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Navbar isCollapsed={isCollapsed} />
      <main
        className={cn(
          'pt-24 pb-12 px-6 transition-all duration-300',
          isCollapsed ? 'pl-28' : 'pl-72'
        )}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
