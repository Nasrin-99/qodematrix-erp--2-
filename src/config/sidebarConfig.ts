export const sidebarConfig = {
  superadmin: [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "School Management", path: "/superadmin/school-management", icon: "school" },
    { name: "Subscriptions", path: "/superadmin/subscriptions", icon: "fees" },
    { name: "Notice Board", path: "/superadmin/notices", icon: "notice" }
  ],

  schooladmin: [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "Teachers", path: "/schooladmin/teachers", icon: "users" },
    { name: "Classes", path: "/schooladmin/classes", icon: "classes" },
    { name: "Attendance", path: "/schooladmin/attendance", icon: "attendance" },
    { name: "Notice Board", path: "/notices", icon: "notice" },
    { name: "Help & Support", path: "/schooladmin/help-support", icon: "help" }
  ],

  teacher: [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "My Classes", path: "/teacher/classes", icon: "classes" },
    { name: "Notice Board", path: "/notices", icon: "notice" },
    {
      name: "Attendance",
      path: "/teacher/attendance",
      icon: "attendance"
    },
  ],
  student: [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "My Classes", path: "/student/classes", icon: "classes" },
    { name: "Attendance", path: "/student/attendance", icon: "attendance" },
    { name: "Fees", path: "/student/fees", icon: "fees" },
    { name: "Notice Board", path: "/notices", icon: "notice" }
  ]
};