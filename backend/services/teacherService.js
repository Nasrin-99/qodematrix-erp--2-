import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import fs from "fs";
import path from "path";


// ==============================
// GET TEACHERS
// ==============================
export const getTeachersService = async (user) => {

  console.log("🔥 GET TEACHERS");

  // console.log("👉 DATA:", data);
  console.log("👉 USER:", user);
  //console.log("👉 FILE:", file);

  const teachers = await Teacher.find({
    schoolId: user.schoolId
  });

  console.log("📦 TOTAL TEACHERS:", teachers.length);

  return teachers;
};


// ==============================
// CREATE TEACHER (FINAL 🔥)
// ==============================
export const createTeacherService = async (data, user, file) => {

  try {

    console.log("🔥 CREATE TEACHER SERVICE HIT");
    console.log("📥 RAW DATA:", data);

    let {
      name,
      email,
      phone,
      experience,
      assignments
    } = data;

    // ===============================
    // 🧹 CLEAN DATA
    // ===============================
    name = name?.trim();
    email = email?.trim().toLowerCase();

    // ===============================
    // 🔴 VALIDATION
    // ===============================
    if (!name || !email) {
      throw new Error("Name and Email required ❗");
    }

    // ===============================
    // 🔍 CHECK DUPLICATE USER
    // ===============================
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("Teacher already exists with this email ❌");
    }

    // ===============================
    // 🔐 RANDOM PASSWORD
    // ===============================
    const defaultPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // ===============================
    // 👤 CREATE USER
    // ===============================
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
      schoolId: user.schoolId,
    });

    console.log("✅ USER CREATED:", newUser._id);

    // ===============================
    // 📦 HANDLE ASSIGNMENTS
    // ===============================
    let parsedAssignments = [];

    if (assignments) {
      try {
        parsedAssignments =
          typeof assignments === "string"
            ? JSON.parse(assignments)
            : assignments;
      } catch (err) {
        console.log("⚠️ ASSIGNMENT PARSE ERROR");
        parsedAssignments = [];
      }
    }

    console.log("📚 ASSIGNMENTS:", parsedAssignments);

    // ===============================
    // 🎓 CREATE TEACHER
    // ===============================
    const teacher = await Teacher.create({
      name,
      email,
      phone,
      experience,

      assignments: parsedAssignments,

      photo: file ? file.filename : null,

      schoolId: user.schoolId,
      userId: newUser._id,
      status: "Active"
    });

    console.log("✅ TEACHER CREATED:", teacher._id);
    console.log("🔐 LOGIN:", email, defaultPassword);

    // ===============================
    // 📩 SEND EMAIL (SAFE)
    // ===============================
    try {
      await sendEmail({
        to: email,
        subject: "Teacher Account Created",
        text: `Welcome to QodeMatrix ERP 🎓

Your login details:

Email: ${email}
Password: ${defaultPassword}

Please login and change your password.`,
      });

    } catch (err) {
      console.log("⚠️ EMAIL FAILED (ignored)");
    }

    return teacher;

  } catch (error) {

    console.log("❌ SERVICE ERROR:", error.message);
    throw error;
  }
};


// ==============================
// DELETE TEACHER
// ==============================
export const deleteTeacherService = async (teacherId) => {

  console.log("🔥 DELETE TEACHER:", teacherId);

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new Error("Teacher not found ❌");
  }

  // ===============================
  // 🧹 DELETE IMAGE
  // ===============================
  if (teacher.photo) {

    const filePath = path.join("uploads", teacher.photo);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑 IMAGE DELETED");
    }
  }

  // ===============================
  // 🧹 DELETE USER
  // ===============================
  if (teacher.userId) {
    await User.findByIdAndDelete(teacher.userId);
    console.log("🗑 USER DELETED");
  }

  // ===============================
  // 🧹 DELETE TEACHER
  // ===============================
  await Teacher.findByIdAndDelete(teacherId);

  console.log("✅ TEACHER DELETED");

  return teacher;
};