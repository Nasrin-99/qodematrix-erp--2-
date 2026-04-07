// 👉 student related services import (business logic yaha se call hota hai)
import {
  getStudentsService,
  createStudentService,
  deleteStudentService
} from "../services/studentService.js";

// 👉 direct Student model (MongoDB operations ke liye)
import Student from "../models/Student.js"; // Student model
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";


// ===============================
// GET ALL STUDENTS
// ===============================
export const getStudents = async (req, res) => {
  try {

    // 👉 req.user se schoolId milta hai (auth middleware se attach hota hai)
    // 👉 service me filtering + populate already handled hai
    const students = await getStudentsService(req.user);

    // 👉 frontend ko students list bhej rahe hai
    res.json(students);

  } catch (error) {

    // 👉 server error (500)
    res.status(500).json({ message: error.message });

  }
};


// ===============================
// GET STUDENTS BY CLASS
// ===============================
export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    console.log("🔥 CLASS STUDENTS FETCH:", classId);

    if (!classId) {
      return res.status(400).json({ message: "ClassId missing ❌" });
    }

    const students = await Student.find({
      classId: classId,
      schoolId: req.user.schoolId, // 🔥 IMPORTANT FILTER
    }).populate("classId");

    console.log("📦 FOUND STUDENTS:", students.length);

    res.json(students); // ⚠️ NOT res.data.data
  } catch (error) {
    console.error("❌ GET STUDENTS BY CLASS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// CREATE STUDENT
// ===============================
export const createStudent = async (req, res) => {
  try {
    const student = await createStudentService(req.body, req.user);

    // 🔥 ADD THIS
    const count = await Student.countDocuments({
      classId: student.classId,
    });

    await Class.findByIdAndUpdate(student.classId, {
      studentCount: count,
    });

    res.status(201).json(student);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ===============================
// DELETE STUDENT
// ===============================
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    await deleteStudentService(req.params.id);

    // 🔥 ADD THIS
    if (student?.classId) {
      const count = await Student.countDocuments({
        classId: student.classId,
      });

      await Class.findByIdAndUpdate(student.classId, {
        studentCount: count,
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET RECENT ADMISSIONS
// ===============================

// ❌ currently export nahi ho raha (route me use nahi hoga)
// 👉 agar use karna hai to "export" lagana padega
const getRecentAdmissions = async (req, res) => {
  try {

    // 👉 current school ke students fetch
    const students = await Student.find({
      schoolId: req.user.schoolId
    })
      .sort({ createdAt: -1 }) // 👉 newest first
      .limit(5)                // 👉 sirf latest 5 students
      .populate("classId", "name section"); // 👉 class details attach

    // 👉 success response
    res.status(200).json({
      success: true,
      students
    });

  } catch (error) {

    // 👉 error response
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ===============================
// 🔥 GET STUDENT CLASSES WITH ROUTINE
// ===============================
export const getStudentClasses = async (req, res) => {
  try {

    // 🔥 LOGIN USER SE STUDENT FIND KARO
    const student = await Student.findOne({
      userId: req.user._id
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found ❌"
      });
    }

    // 🔥 CLASS FETCH
    const cls = await Class.findById(student.classId);

    // 🔥 TEACHERS (same school)
    const teachers = await Teacher.find({
      schoolId: req.user.schoolId
    });

    res.json({
      success: true,
      classData: cls ? [cls] : [],
      teachers
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};