import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

// ===============================
// 📊 DASHBOARD STATS CONTROLLER
// ===============================
export const getDashboardStats = async (req, res) => {
  try {
    console.log("📊 Dashboard API HIT");

    // 👉 user se schoolId nikaal rahe hai
    const schoolId = req.user.schoolId || req.user._id;

    console.log("🏫 SCHOOL ID:", schoolId);

    // 👉 total students count
    const totalStudents = await Student.countDocuments({
      schoolId
    });

    // 👉 total teachers count
    const totalTeachers = await Teacher.countDocuments({
      schoolId
    });

    console.log("👨‍🎓 Students:", totalStudents);
    console.log("👩‍🏫 Teachers:", totalTeachers);

    // 👉 response bhej rahe hai
    res.json({
      totalStudents,
      totalTeachers
    });

  } catch (error) {
    console.log("❌ DASHBOARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};