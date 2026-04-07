exports.getSidebarMenu = (req, res) => {
  const userRole = req.user.role;

  let menu = [];

  if (userRole === "schooladmin") {
    menu = [
      { title: "Dashboard", path: "/dashboard", icon: "dashboard" },

      { title: "Students", path: "/schooladmin/students", icon: "students" },

      { title: "Teachers", path: "/schooladmin/teachers", icon: "users" },

      // ✅ ADD HERE
      { title: "Teacher & Staff", path: "/schooladmin/teacher-staff", icon: "users" },

      { title: "Classes", path: "/schooladmin/classes", icon: "classes" },
      { title: "Attendance", path: "/schooladmin/attendance", icon: "attendance" },
      { title: "Fees", path: "/schooladmin/fees", icon: "fees" },
    ];
  }

  res.json({ menu });
};