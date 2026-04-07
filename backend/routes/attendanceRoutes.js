import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  markTeacherAttendance,
  getTeacherAttendance,
  updateTeacherAttendance,
  

  // 🔥 ADD THESE
  markStudentAttendance,
  getStudentAttendance,
  getClassStudentAttendanceHistory,
  updateStudentAttendance,
  getTodayAttendance ,
  getMyAttendance 

} from "../controllers/attendanceController.js";

const router = express.Router();


// ==============================
// 🔥 TEACHER ATTENDANCE
// ==============================

// 👉 principal marks teacher attendance
router.post(
  "/teacher",
  protect,
  authorize("schooladmin"),
  markTeacherAttendance
);

// 👉 teacher / admin view
router.get("/teacher", protect, getTeacherAttendance);

// 👉 update
router.put("/teacher/:id", protect, updateTeacherAttendance);


// ==============================
// 🔥 STUDENT ATTENDANCE
// ==============================

// 👉 teacher marks student attendance
router.post(
  "/student",
  protect,
  authorize("teacher"), // 🔥 IMPORTANT
  markStudentAttendance
);

// 👉 get today/history
router.get(
  "/student/:classId",
  protect,
  authorize("teacher", "schooladmin"),
  getStudentAttendance
);

// 👉 class history (grouped)
router.get(
  "/student-history/:classId",
  protect,
  authorize("teacher", "schooladmin"),
  getClassStudentAttendanceHistory
);

// 👉 update student attendance
router.put(
  "/student/:id",
  protect,
  authorize("teacher"),
  updateStudentAttendance
);

router.get("/today", getTodayAttendance);

// 👉 student apna attendance dekhega
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyAttendance
);


export default router;