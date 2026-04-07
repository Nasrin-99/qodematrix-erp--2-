import express from "express";

import {
  getTeachers,
  createTeacher,
  deleteTeacher,
  getMyClasses,
  assignTeacherToSlot
} from "../controllers/teacherController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ==============================
// 🔹 GET ALL TEACHERS (ADMIN)
// ==============================
router.get(
  "/",
  protect,
  authorize("schooladmin"),
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: GET /teachers");
    next();
  },
  getTeachers
);


// ==============================
// 🔹 CREATE TEACHER (ADMIN)
// ==============================
router.post(
  "/",
  protect,
  authorize("schooladmin"),
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: POST /teachers");
    next();
  },
  upload.single("photo"),
  createTeacher
);


// ==============================
// 🔹 DELETE TEACHER (ADMIN)
// ==============================
router.delete(
  "/:id",
  protect,
  authorize("schooladmin"),
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: DELETE /teachers");
    next();
  },
  deleteTeacher
);


// ==============================
// 🔥 MY CLASSES (TEACHER)
// ==============================
router.get(
  "/my-classes",
  protect,
  authorize("teacher"),
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: GET /teachers/my-classes");
    next();
  },
  getMyClasses
);


// ==============================
// 🔥 ASSIGN TEACHER TO SLOT
// ==============================
// ⚠️ IMPORTANT: frontend is calling /assign-class
router.post(
  "/assign-class",
  protect,
  (req, res, next) => {
    console.log("➡️ ROUTE HIT: ASSIGN TEACHER");
    next();
  },
  assignTeacherToSlot
);


export default router;