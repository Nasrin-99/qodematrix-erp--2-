// 👉 express import (routing banane ke liye)
import express from "express";

// 👉 controller functions
import {
  getStudents,
  createStudent,
  deleteStudent,
  getStudentsByClass,
  getStudentClasses 
} from "../controllers/studentController.js";

// 👉 middleware import
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// 🔥 DEBUG CHECK (IMPORTANT)
// ===============================
console.log("🔍 PROTECT TYPE:", typeof protect);
console.log("🔍 AUTHORIZE TYPE:", typeof authorize);


// ===============================
// GET ALL STUDENTS
// ===============================
router.get(
  "/",
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: GET /students");
    next();
  },
  protect,
  (req, res, next) => {
    console.log("✅ AFTER PROTECT");
    next();
  },
  authorize("schooladmin", "teacher"),
  (req, res, next) => {
    console.log("✅ AFTER AUTHORIZE");
    next();
  },
  getStudents
);


// ===============================
// GET STUDENTS BY CLASS
// ===============================
router.get(
  "/class/:classId",
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: GET /students/class");
    next();
  },
  protect,
 authorize("schooladmin", "teacher"),
  getStudentsByClass
);


// ===============================
// CREATE STUDENT
// ===============================
router.post(
  "/",
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: POST /students");
    next();
  },
  protect,
  (req, res, next) => {
    console.log("✅ AFTER PROTECT");
    next();
  },
  authorize("schooladmin", "teacher"),
  (req, res, next) => {
    console.log("✅ AFTER AUTHORIZE");
    next();
  },
  createStudent
);


// ===============================
// DELETE STUDENT
// ===============================
router.delete(
  "/:id",
  protect,
  authorize("schooladmin", "teacher"),
  deleteStudent
);

router.get("/classes", protect, getStudentClasses);

export default router;