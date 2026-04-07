// 👉 mongoose import (schema + model banane ke liye)
import mongoose from "mongoose";


// ===============================
// 👨‍🎓 STUDENT SCHEMA (CLASS MEMBER ENTITY 🔥)
// ===============================

// 👉 Student schema define kar rahe hai
const studentSchema = new mongoose.Schema(
  {
    // ==============================
    // 🧑 BASIC INFO
    // ==============================

    // 👉 student ka full name (UI + identity)
    // 👉 example: "Rahul Sharma"
    name: {
      type: String,
      required: true, // 👉 mandatory field
    },

    // 👉 email address (contact ya future login ke liye)
    // ❗ abhi unique nahi hai (future me kar sakti hai)
    email: {
      type: String,
      required: true, // 👉 mandatory
    },

    // 👉 phone number (parent contact / emergency)
    phone: {
      type: String,
      required: true, // 👉 required
    },

    // 👉 parent ka naam (important for school records)
    parentName: {
      type: String,
      required: true, // 👉 required
    },



    // ==============================
    // 🏫 CLASS INFO
    // ==============================

    // 👉 section (A, B, C)
    // 👉 UI display ke liye use hota hai
    // ❗ optional hai (validation nahi)
    section: String,



    // ==============================
    // 🔥 CLASS RELATION (MOST IMPORTANT 🔥)
    // ==============================

    // 👉 student kis class me hai
    // 👉 relation: Student → Class
    // 👉 pura system isi pe dependent hai
    classId: {
      type: mongoose.Schema.Types.ObjectId, // 👉 MongoDB ObjectId
      ref: "Class", // 👉 Class collection se link
      required: true, // 👉 mandatory relation
      index: true,
    },



    // ==============================
    // 🏫 SCHOOL RELATION
    // ==============================

    // 👉 multi-school system ke liye
    // 👉 ensure karta hai student apne school ke data me hi rahe
    // 👉 filtering:
    // req.user.schoolId === student.schoolId
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School", // 👉 School collection link
      required: true, // 👉 required for security filtering
      index: true,
    },



    // ==============================
    // 🔗 LOGIN RELATION
    // ==============================

    // 👉 agar student ka login account hai
    // 👉 User model se connect hota hai
    // 👉 flow:
    // User (role=student) → userId → Student data
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👉 User collection se relation
    },



    // ==============================
    // ⚡ STATUS
    // ==============================

    // 👉 active / inactive (student disable karne ke liye)
    status: {
      type: String,
      enum: ["Active", "Inactive"], // 👉 allowed values only
      default: "Active", // 👉 default value
    }
  },
  {
    // 👉 automatically:
    // createdAt → kab add hua
    // updatedAt → kab update hua
    timestamps: true,
  }
);


// ===============================
// 📦 EXPORT MODEL
// ===============================

// 👉 MongoDB collection name = "students"
export default mongoose.model("Student", studentSchema);