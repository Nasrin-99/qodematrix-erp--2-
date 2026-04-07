import Attendance from "../models/Attendance.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

// ==============================
// 🔥 MARK TEACHER ATTENDANCE
// ==============================
export const markTeacherAttendance = async (req, res) => {
  try {
    const { records, time } = req.body;

    const today = new Date().toISOString().split("T")[0];


    console.log("📥 BODY:", req.body);
    console.log("👤 USER:", req.user);

    const result = await Promise.all(
      records.map(async (r) => {
        return await Attendance.findOneAndUpdate(
          {
            teacherId: r.teacherId,
            date: today,
            type: "teacher",
          },
          {
            teacherId: r.teacherId,
            status: r.status.toLowerCase(),
            schoolId: req.user.schoolId,
            date: today,
            type: "teacher",
            slot: time || "09:00-10:00" // ✅ ADD THIS
          },
          {
            upsert: true,
            new: true,
          }
        );
      })
    );

    res.json({ success: true, data: result });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// 🔥 GET TEACHER ATTENDANCE
// ==============================
export const getTeacherAttendance = async (req, res) => {
  try {
    const { view } = req.query;

    const today = new Date().toISOString().split("T")[0]; // ✅ FIX

    let query = {
      type: "teacher",
      schoolId: req.user.schoolId
    };

    if (view !== "history") {
      query.date = today; // ✅ STRING MATCH
    }

    if (req.user.role === "teacher") {
      const teacher = await Teacher.findOne({
        userId: req.user._id
      });

      if (!teacher) {
        return res.json({ success: true, data: [] });
      }

      query.teacherId = teacher._id;
    }

    const records = await Attendance.find(query)
      .populate("teacherId", "name")
      .sort({ date: -1 });

    res.json({ success: true, data: records });

  } catch (error) {
    console.log("❌ GET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({
      date: today
    });

    res.json({
      total: attendance.length,
      data: attendance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ==============================
// 🔥 UPDATE TEACHER ATTENDANCE
// ==============================
export const updateTeacherAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Attendance.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// ==========================================================
// ================= STUDENT ATTENDANCE ======================
// ==========================================================


/// ==============================
// 🔥 MARK STUDENT ATTENDANCE
// ==============================
export const markStudentAttendance = async (req, res) => {
  try {
    const { records, classId, subject, time } = req.body;

    // ✅ date ko string format me convert karo (model ke hisab se)
    const today = new Date().toISOString().split("T")[0];

    const result = await Promise.all(
      records.map(async (r) => {
        return await Attendance.findOneAndUpdate(
          {
            studentId: r.studentId,
            classId,
            date: today,
            type: "student",
            slot: time, // ✅ FIXED (time → slot)
          },
          {
            studentId: r.studentId,
            classId,
            subject,
            slot: time, // ✅ FIXED
            status: r.status.toLowerCase(),
            schoolId: req.user.schoolId,
            date: today,
            type: "student",
          },
          {
            upsert: true,
            new: true,
          }
        );
      })
    );

    // ✅ response yaha aayega (loop ke bahar)
    res.json({ success: true, data: result });

  } catch (err) {
    console.log("❌ STUDENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// 🔥 GET STUDENT ATTENDANCE (TODAY / HISTORY)
// ==============================
export const getStudentAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { view } = req.query;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = {
      classId,
      type: "student",
      schoolId: req.user.schoolId
    };

    if (view !== "history") {
      query.date = { $gte: today };
    }

    const data = await Attendance.find(query)
      .populate("studentId", "name")
      .populate("teacherId", "name")
      .sort({ date: -1 });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ==============================
// 🔥 CLASS ATTENDANCE HISTORY (GROUPED)
// ==============================
export const getClassStudentAttendanceHistory = async (req, res) => {
  try {
    const { classId } = req.params;

    const data = await Attendance.find({
      classId,
      type: "student"
    })
      .populate("teacherId", "name")
      .sort({ date: -1 });

    const grouped = {};

    data.forEach((item) => {
      const key = `${item.date.toISOString()}-${item.time}`;

      if (!grouped[key]) {
        grouped[key] = {
          date: item.date,
          time: item.time,
          subject: item.subject,
          teacher: item.teacherId?.name,
          present: 0,
          absent: 0,
          late: 0,
        };
      }

      if (item.status === "present") grouped[key].present++;
      if (item.status === "absent") grouped[key].absent++;
      if (item.status === "late") grouped[key].late++;
    });

    res.json({
      success: true,
      data: Object.values(grouped)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ==============================
// 🔥 UPDATE STUDENT ATTENDANCE
// ==============================
export const updateStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Attendance.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/// ==============================
// 🔥 GET LOGGED-IN STUDENT ATTENDANCE
// ==============================
export const getMyAttendance = async (req, res) => {
  try {
    console.log("👤 USER ID:", req.user._id);

    // 🔥 STEP 1: find student using userId
    const student = await Student.findOne({
      userId: req.user._id
    });

    console.log("🎓 STUDENT:", student);

    if (!student) {
      return res.json({ success: true, data: [] });
    }

    // 🔥 STEP 2: fetch attendance using student._id
    const data = await Attendance.find({
      studentId: student._id,
      type: "student"
    }).sort({ date: -1 });

    console.log("📊 DATA:", data);

    res.json({ success: true, data });

  } catch (err) {
    console.log("❌ MY ATTENDANCE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

