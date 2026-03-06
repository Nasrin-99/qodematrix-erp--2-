import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { DashboardLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { SuperAdminDashboard } from '../pages/superadmin/Dashboard';
import { SchoolAdminDashboard } from '../pages/schooladmin/Dashboard';
import { TeacherDashboard } from '../pages/teacher/Dashboard';
import { TeacherClasses } from '../pages/teacher/TeacherClasses';
import { TeacherAttendance } from '../pages/teacher/TeacherAttendance';
import { TeacherHomework } from '../pages/teacher/TeacherHomework';
import { StudentDashboard } from '../pages/student/Dashboard';
import { StudentClasses } from '../pages/student/StudentClasses';
import { StudentAttendance } from '../pages/student/StudentAttendance';
import { StudentFees } from '../pages/student/StudentFees';

// Parent Pages
import { ParentPerformance } from '../pages/parent/ParentPerformance';
import { ParentAttendance } from '../pages/parent/ParentAttendance';
import { ParentDashboard } from '../pages/parent/Dashboard';
import { SettingsPage } from '../pages/common/SettingsPage';
import { NoticeBoard } from '../pages/common/NoticeBoard';
import { ExamManagement } from '../pages/common/ExamManagement';
import { LibraryManagement } from '../pages/common/LibraryManagement';
import { TransportManagement } from '../pages/common/TransportManagement';
import { HelpSupport } from '../pages/common/HelpSupport';

const RoleRedirect = () => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'superadmin': return <SuperAdminDashboard />;
    case 'schooladmin': return <SchoolAdminDashboard />;
    case 'teacher': return <TeacherDashboard />;
    case 'student': return <StudentDashboard />;
    case 'parent': return <ParentDashboard />;
    default: return <Navigate to="/login" replace />;
  }
};

import { SchoolManagement } from '../pages/superadmin/SchoolManagement';
import { SubscriptionManagement } from '../pages/superadmin/SubscriptionManagement';
import { StudentManagement } from '../pages/schooladmin/StudentManagement';
import { TeacherManagement } from '../pages/schooladmin/TeacherManagement';
import { ClassManagement } from '../pages/schooladmin/ClassManagement';
import { AttendanceManagement } from '../pages/schooladmin/AttendanceManagement';
import { FeeManagement } from '../pages/schooladmin/FeeManagement';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<RoleRedirect />} />
        
        {/* Super Admin Routes */}
        <Route path="/superadmin/schools" element={<SchoolManagement />} />
        <Route path="/superadmin/subscriptions" element={<SubscriptionManagement />} />
        
        {/* School Admin Routes */}
        <Route path="/schooladmin/students" element={<StudentManagement />} />
        <Route path="/schooladmin/teachers" element={<TeacherManagement />} />
        <Route path="/schooladmin/classes" element={<ClassManagement />} />
        <Route path="/schooladmin/attendance" element={<AttendanceManagement />} />
        <Route path="/schooladmin/fees" element={<FeeManagement />} />

        {/* Teacher Routes */}
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/homework" element={<TeacherHomework />} />

        {/* Student Routes */}
        <Route path="/student/classes" element={<StudentClasses />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/fees" element={<StudentFees />} />

        {/* Parent Routes */}
        <Route path="/parent/performance" element={<ParentPerformance />} />
        <Route path="/parent/attendance" element={<ParentAttendance />} />
        
        {/* Common Routes */}
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/exams" element={<ExamManagement />} />
        <Route path="/library" element={<LibraryManagement />} />
        <Route path="/transport" element={<TransportManagement />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
