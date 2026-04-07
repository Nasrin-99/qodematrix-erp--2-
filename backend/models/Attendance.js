// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-04-06"
    required: true,
    index: true,
  },

  slot: {
    type: String, // "09:00-10:00"
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  subject: String,

  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },

  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  type: {
    type: String,
    enum: ["student"],
    default: "student",
  }

}, { timestamps: true });


// 🔥 Duplicate रोकने के लिए
attendanceSchema.index(
  { studentId: 1, date: 1, slot: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);