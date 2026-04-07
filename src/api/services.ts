import axios from "axios";
import { useAuthStore } from "../store/authStore";

// =========================
// ✅ BASE URL
// =========================
const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

// =========================
// 🔐 Attach token automatically
// =========================
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// 🔐 AUTH APIs
// =========================
export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      data
    );
    return res.data;
  },

  register: async (data: any) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  },
};

// =========================
// 🚪 LOGOUT
// =========================
export const logoutUser = () => {
  const { logout } = useAuthStore.getState();
  logout();
};

// =========================
// 🔔 NOTIFICATIONS
// =========================
export const getNotifications = async () => {
  const res = await API.get("/notices");
  return res.data;
};

// =========================
// 👤 PROFILE APIs
// =========================
export const profileService = {
  getProfile: async () => {
    const res = await API.get("/auth/profile");
    return res.data;
  },
};

// =========================
// 📂 SIDEBAR MENU
// =========================
export const getSidebarMenu = async () => {
  const res = await API.get("/menu");
  return res.data;
};

// =========================
// 👨‍🎓 STUDENT APIs
// =========================
export const studentService = {
  getAll: async () => {
    const res = await API.get("/students");
    return res.data;
  },
  getByClass: async (classId: string) => {
    const res = await API.get(`/students/class/${classId}`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/students", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await API.put(`/students/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/students/${id}`);
    return res.data;
  },
};

// =========================
// 👩‍🏫 TEACHER APIs (IMPORTANT 🔥)
// =========================
export const teacherService = {
  getAll: async () => {
    const res = await API.get("/teachers");
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/teachers", data);
    return res.data;
  },

  // 🔥 DELETE (MAIN FIX)
  delete: async (id: string) => {
    const res = await API.delete(`/teachers/${id}`);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await API.put(`/teachers/${id}`, data);
    return res.data;
  },
  getMyClasses: async () => {
    const res = await API.get("/teacher/my-classes");
    return res.data.data;
  },
  // 🔥 STUDENTS BY CLASS
  getStudentsByClass: async (classId: string) => {
    const res = await API.get(`/students/class/${classId}`);
    return res.data.data;
  },

  // 🔥 MARK ATTENDANCE
  markAttendance: async (data: any) => {
    const res = await API.post("/attendance", data);
    return res.data;
  }
};

// =========================
// 🏫 SCHOOL APIs
// =========================
export const schoolService = {
  getAll: async () => {
    const res = await API.get("/schools");
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/schools", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await API.put(`/schools/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/schools/${id}`);
    return res.data;
  },
};

// =========================
// 📊 DASHBOARD APIs
// =========================
export const dashboardService = {
  getStats: async () => {
    const res = await API.get("/dashboard/stats");
    return res.data;
  },

  getAttendanceStats: async () => {
    const res = await API.get("/dashboard/attendance");
    return res.data;
  },

  getFeeStats: async () => {
    const res = await API.get("/dashboard/fees");
    return res.data;
  },
};



// =========================
// 📢 NOTICE APIs
// =========================
export const noticeService = {
  getAll: async () => {
    const res = await API.get("/notices");
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/notices", data);
    return res.data;
  },
};


export const getNotices = async () => {
  const res = await API.get("/notices");
  return res.data;
};

// =========================
// 🏫 CLASS APIs
// =========================
export const classService = {
  getAll: async () => {
    const res = await API.get("/classes");
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/classes", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await API.put(`/classes/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/classes/${id}`);
    return res.data;
  },


  getMyRoutine: async () => {
    const res = await API.get("/classes/my-routine");
    return res.data;
  },

};

export const getTodayAttendance = async () => {
  const res = await fetch("/api/attendance/today");
  return await res.json();
};

// =========================
// 💳 SUBSCRIPTION APIs
// =========================
export const subscriptionService = {
  getAll: async () => {
    const res = await API.get("/subscriptions");
    return res.data;
  },

  create: async (data: any) => {
    const res = await API.post("/subscriptions", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await API.put(`/subscriptions/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/subscriptions/${id}`);
    return res.data;
  },
};

//  get my classes
export const getMyClasses = async () => {
  const res = await API.get("/teachers/my-classes");
  return res.data.data;   // 🔥 IMPORTANT
};


// ==============================
// 🔥 ASSIGN TEACHER TO CLASS
// ==============================
export const assignTeacher = async (data: any) => {
  const res = await API.post("/teacher/assign-class", data);
  return res.data;
};

// ==============================
// 🔥 GET TODAY SCHEDULE
// ==============================
export const getTodaySchedule = async () => {
  const res = await API.get("/schedule/today");
  return res.data;
};

export const getStudentClasses = async () => {
  const res = await API.get("/student/classes");
  return res.data;
};

export const assignTeacherToSlot = async (data: any) => {
  const res = await API.post("/teacher/assign-slot", data);
  return res.data;
};


// =========================
// 📅 ATTENDANCE APIs (FINAL ✅)
// =========================
export const attendanceService = {

  // =========================
  // 👩‍🏫 TEACHER ATTENDANCE
  // =========================
  getTeacherAttendance: async () => {
    const res = await API.get("/attendance/teacher");
    return res.data;
  },

  updateTeacher: async (id: string, status: string) => {
    const res = await API.put(`/attendance/teacher/${id}`, { status });
    return res.data;
  },

  // =========================
  // 👨‍🎓 STUDENT ATTENDANCE
  // =========================

  // 🔥 MARK (MAIN)
  markStudent: async (data: any) => {
    const res = await API.post("/attendance/student", data);
    return res.data;
  },

  // 🔥 GET TODAY / HISTORY
  getStudentAttendance: async (classId: string) => {
    const res = await API.get(`/attendance/student/${classId}`);
    return res.data;
  },

  // 🔥 HISTORY (GROUPED)
  getStudentHistory: async (classId: string) => {
    const res = await API.get(`/attendance/student-history/${classId}`);
    return res.data.data;
  },

  // 🔥 UPDATE
  updateStudent: async (id: string, status: string) => {
    const res = await API.put(`/attendance/student/${id}`, { status });
    return res.data;
  },

  // =========================
  // 📊 STATS (OPTIONAL)
  // =========================
  getStats: async () => {
    const res = await API.get("/dashboard/stats");
    return res.data.attendance;
  }

};


export default API;