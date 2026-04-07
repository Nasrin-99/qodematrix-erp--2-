import School from "../models/School.js";
import Class from "../models/Class.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Notice from "../models/Notice.js";
import User from "../models/User.js";

// ===============================
// 🔥 DELETE SCHOOL (CASCADE DELETE)
// ===============================
export const deleteSchool = async (req, res) => {
  try {
    const schoolId = req.params.id;

    console.log("🔥 DELETE SCHOOL:", schoolId);

    // 1️⃣ Classes delete
    await Class.deleteMany({ schoolId });
    console.log("🏫 CLASSES DELETED");

    // 2️⃣ Students delete
    await Student.deleteMany({ schoolId });
    console.log("🧑‍🎓 STUDENTS DELETED");

    // 3️⃣ Teachers delete
    await Teacher.deleteMany({ schoolId });
    console.log("👩‍🏫 TEACHERS DELETED");

    // 4️⃣ Attendance delete
    await Attendance.deleteMany({ schoolId });
    console.log("📅 ATTENDANCE DELETED");

    // 5️⃣ Fees delete
    await Fee.deleteMany({ schoolId });
    console.log("💰 FEES DELETED");

    // 6️⃣ Notices delete
    await Notice.deleteMany({ schoolId });
    console.log("📢 NOTICES DELETED");

    // 7️⃣ School delete
    await School.findByIdAndDelete(schoolId);
    console.log("✅ SCHOOL DELETED");

    //user delete (optional, only if you want to delete the admin user of the school)
    await User.deleteMany({ schoolId });
    console.log("👤 USERS DELETED");

    res.status(200).json({
      success: true,
      message: "School and all related data deleted ✅",
    });

  } catch (error) {
    console.log("❌ DELETE SCHOOL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};