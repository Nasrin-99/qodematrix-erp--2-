import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ================= 🔐 AUTH & API =================
import { useAuthStore } from "../store/authStore";
import { profileService } from "../api/services";

// ================= 🎨 UI =================
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

// ================= 📦 LAYOUT =================
import { DashboardLayout } from "../layouts/MainLayout";

// ================= 🔑 AUTH PAGES =================
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPassword } from "../pages/auth/ForgotPassword";

// ================= 👑 SUPER ADMIN =================
import { SchoolManagement } from "../pages/superadmin/SchoolManagement";
import NoticeBoard from "../pages/superadmin/NoticeBoard";

// ================= 📊 DASHBOARDS =================
import { SuperAdminDashboard } from "../pages/superadmin/Dashboard";
import { SchoolAdminDashboard } from "../pages/schooladmin/Dashboard";
import { TeacherDashboard } from "../pages/teacher/Dashboard";
import { StudentDashboard } from "../pages/student/Dashboard";
import { ParentDashboard } from "../pages/parent/Dashboard";

// ================= 👨‍🏫 TEACHER =================
import { TeacherClasses } from "../pages/teacher/TeacherClasses";
import { TeacherAttendance } from "../pages/teacher/TeacherAttendance";

import { TeacherManagement } from "../pages/schooladmin/TeacherManagement";
import { StudentManagement } from "../pages/schooladmin/StudentManagement";
import { ClassManagement } from "../pages/schooladmin/ClassManagement";
import { AttendanceManagement } from "../pages/schooladmin/AttendanceManagement";
import { FeeManagement } from "../pages/schooladmin/FeeManagement";
import HelpSupport from "../pages/schooladmin/HelpSupport";

// ================= 🎓 STUDENT =================
import { StudentClasses } from "../pages/student/StudentClasses";
import { StudentAttendance } from "../pages/student/StudentAttendance";
import { StudentFees } from "../pages/student/StudentFees";

// ================= 📢 COMMON =================
import AllNotices from "../pages/common/AllNotices";
import { TeacherStudentManagement } from "../pages/teacher/TeacherStudentManagement";

// =====================================================
// 🔐 PRIVATE ROUTE
// =====================================================
const PrivateRoute = ({ children }: any) => {
  const { user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await profileService.getProfile();
        setUser(res.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// =====================================================
// 🔐 ROLE ROUTE
// =====================================================
const RoleRoute = ({ children, role }: any) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

// =====================================================
// 🔁 ROLE REDIRECT
// =====================================================
const RoleRedirect = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "superadmin":
      return <SuperAdminDashboard />;
    case "schooladmin":
      return <SchoolAdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "student":
      return <StudentDashboard />;
    case "parent":
      return <ParentDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// =====================================================
// 🚀 MAIN ROUTES
// =====================================================
export const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌐 PUBLIC */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 🔒 PROTECTED */}
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >

        {/* Dashboard */}
        <Route path="/dashboard" element={<RoleRedirect />} />

        {/* 🔥 FIXED NOTICE ROUTE */}
        <Route path="/notices" element={<AllNotices />} />

        {/* SUPER ADMIN */}
        <Route
          path="/superadmin/school-management"
          element={<RoleRoute role="superadmin"><SchoolManagement /></RoleRoute>}
        />

  

        <Route
          path="/superadmin/notices"
          element={<RoleRoute role="superadmin"><NoticeBoard /></RoleRoute>}
        />

        {/* SCHOOL ADMIN */}
        <Route path="/schooladmin/teachers" element={<TeacherManagement />} />

        <Route path="/schooladmin/students" element
          ={<RoleRoute role="schooladmin">
            <StudentManagement />
          </RoleRoute>} />
        {/* 🔥 NEW ROUTE */}
        <Route
          path="/schooladmin/students/:id"
          element={
            <RoleRoute role="schooladmin">
              <StudentManagement />
            </RoleRoute>
          }
        />
        <Route path="/schooladmin/classes" element={<RoleRoute role="schooladmin"><ClassManagement /></RoleRoute>} />
        <Route path="/schooladmin/attendance" element={<RoleRoute role="schooladmin"><AttendanceManagement /></RoleRoute>} />
        <Route path="/schooladmin/help-support" element={<RoleRoute role="schooladmin"><HelpSupport /></RoleRoute>} />

        {/* TEACHER */}
        <Route path="/teacher/classes" element={<RoleRoute role="teacher"><TeacherClasses /></RoleRoute>} />
        <Route path="/teacher/classes/:id/students" element={<TeacherStudentManagement />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
       

        {/* STUDENT */}
        <Route path="/student/classes" element={<RoleRoute role="student"><StudentClasses /></RoleRoute>} />
        <Route path="/student/attendance" element={<RoleRoute role="student"><StudentAttendance /></RoleRoute>} />
        <Route path="/student/fees" element={<RoleRoute role="student"><StudentFees /></RoleRoute>} />

      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};