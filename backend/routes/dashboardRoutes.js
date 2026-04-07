import express from "express";
import { protect } from "../middleware/authMiddleware.js";

// 👉 models import (IMPORTANT)
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import School from "../models/School.js";

const router = express.Router();

// ===============================
// 🏫 SUPER ADMIN DASHBOARD
// ===============================
router.get("/superadmin", async (req, res) => {
  try {

    const totalSchools = await School.countDocuments();

     const recentSchools = await School.find()
      .sort({ createdAt: -1 })
      .limit(5);

    console.log("🔥 TOTAL SCHOOLS:", totalSchools);

    res.json({
      totalSchools,
      activeSubs: 0,
      totalRevenue: 0,
      newRequests: 0,
      trendSchools: 0,
      trendActive: 0,
      trendRevenue: 0,
      trendRequests: 0,
      recentSchools
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// 🧪 TEST ROUTE (OPTIONAL)
// ===============================
router.get("/", protect, (req, res) => {
  res.json({
    message: "Dashboard working ✅",
    user: req.user
  });
});


// ===============================
// 📊 DASHBOARD STATS (MAIN)
// ===============================
router.get("/stats", protect, async (req, res) => {
  try {

    console.log("📊 DASHBOARD API HIT");

    // 👉 schoolId nikaal rahe
    const schoolId = req.user.schoolId || req.user._id;

    console.log("🏫 SCHOOL ID:", schoolId);

    // 👉 dynamic counts
    const totalStudents = await Student.countDocuments({ schoolId });
    const totalTeachers = await Teacher.countDocuments({ schoolId });

    console.log("👨‍🎓 Students:", totalStudents);
    console.log("👩‍🏫 Teachers:", totalTeachers);

    // 👉 FINAL RESPONSE
    res.json({
      totalStudents,
      totalTeachers,

      // 👉 existing data bhi rakh diya (optional)
      attendance: {
        today: 85,
      },
      fees: {
        totalCollected: 50000,
      },
    });

  } catch (err) {
    console.log("❌ DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

export default router;