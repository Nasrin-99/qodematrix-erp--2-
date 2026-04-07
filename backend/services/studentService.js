import Student from "../models/Student.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import Class from "../models/Class.js";
import mongoose from "mongoose";


// ==============================
// GET STUDENTS
// ==============================
export const getStudentsService = async (user) => {

  console.log("🔥 GET STUDENTS SERVICE");

  const students = await Student.find({
    schoolId: user.schoolId || user._id,
   
  }).populate("classId");

  console.log("📦 STUDENTS:", students.length);

  return students;
};


// ==============================
// CREATE STUDENT
// ==============================
export const createStudentService = async (data, user) => {
  try {
    console.log("CLASS MODEL:", Class);
    console.log("TYPE:", typeof Class);

    console.log("🔥 CREATE STUDENT SERVICE HIT");
    console.log("📥 RAW DATA:", data);

    const { name, email, phone, parentName, classId, section } = data;

    // ✅ VALIDATION
    if (!name || !email || !classId || !phone || !parentName) {
      throw new Error("All fields required ❗");
    }

    // ✅ convert ObjectId
    const classObjectId = new mongoose.Types.ObjectId(classId);

    // ✅ check class exists
    const existingClass = await Class.findById(classObjectId);
    if (!existingClass) {
      throw new Error("Class not found ❌");
    }

    // ✅ clean data
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // ✅ duplicate check
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      throw new Error("Student already exists ❌");
    }

    // ✅ password
    const defaultPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // ✅ create user
    const newUser = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: "student",
      schoolId: user.schoolId
    });

    // ✅ create student
    const student = await Student.create({
      name: cleanName,
      email: cleanEmail,
      phone,
      parentName,
      classId: classObjectId,
      section,
      schoolId: user.schoolId,
      userId: newUser._id
    });

    // ✅ email (optional)
    try {
      await sendEmail({
        to: cleanEmail,
        subject: "Student Account Created",
        text: `Email: ${cleanEmail}\nPassword: ${defaultPassword}`
      });
    } catch (err) {
      console.log("⚠️ Email failed");
    }

    return student;

  } catch (error) {
    console.log("❌ SERVICE ERROR:", error.message);
    throw error;
  }
};


// ==============================
// DELETE STUDENT
// ==============================
export const deleteStudentService = async (studentId) => {

  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  if (student.userId) {
    await User.findByIdAndDelete(student.userId);
  }

  await Student.findByIdAndDelete(studentId);

  return student;
};