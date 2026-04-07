import {
  getTeachersService,
  createTeacherService,
  deleteTeacherService
} from "../services/teacherService.js";

import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";


// ==============================
// 🔹 GET ALL TEACHERS
// ==============================
export const getTeachers = async (req, res) => {
  try {
    const teachers = await getTeachersService(req.user);

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });

  } catch (error) {
    console.log("❌ GET TEACHERS ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ==============================
// 🔹 CREATE TEACHER
// ==============================
export const createTeacher = async (req, res) => {
  try {
    const teacher = await createTeacherService(
      req.body,
      req.user,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Teacher created successfully ✅",
      data: teacher
    });

  } catch (error) {
    console.log("❌ CREATE TEACHER ERROR:", error.message);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ==============================
// 🔹 DELETE TEACHER
// ==============================
export const deleteTeacher = async (req, res) => {
  try {
    const result = await deleteTeacherService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully ✅",
      data: result
    });

  } catch (error) {
    console.log("❌ DELETE ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ==============================
// 🔥 GET MY CLASSES (TEACHER)
// ==============================
export const getMyClasses = async (req, res) => {
  try {
    console.log("🔥 GET MY CLASSES");

    const teacher = await Teacher.findOne({
      userId: req.user._id
    });

    if (!teacher) {
      return res.json({
        success: true,
        data: []
      });
    }

    console.log("📦 TEACHER ASSIGNMENTS:", teacher.assignments);

    res.status(200).json({
      success: true,
      data: teacher.assignments   // 🔥 FINAL FIX
    });

  } catch (error) {
    console.log("❌ ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// 🔥 ASSIGN TEACHER (FINAL API)
// ==============================
export const assignTeacherToSlot = async (req, res) => {
  try {
    const { classId, day, time, subject, teacherId } = req.body;

    if (!classId || !day || !time || !subject || !teacherId) {
      return res.status(400).json({
        message: "All fields required ❌"
      });
    }

    // =========================
    // 1️⃣ UPDATE CLASS ROUTINE
    // =========================
    const cls = await Class.findById(classId);

    if (!cls) {
      return res.status(404).json({ message: "Class not found ❌" });
    }

    if (!cls.routine[day]) {
      cls.routine[day] = {};
    }

    cls.routine[day][time] = {
      subject,
      teacherId
    };

    await cls.save();

    await Class.findByIdAndUpdate(classId, {
      $addToSet: { teacherIds: teacherId }
    });

    // =========================
    // 2️⃣ UPDATE TEACHER ASSIGNMENT
    // =========================
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found ❌" });
    }

    // 👉 check if class already exists
    let assignment = teacher.assignments.find(
      (a) => a.classId.toString() === classId
    );

    if (!assignment) {
      assignment = {
        classId,
        name: cls.name,
        section: cls.section,
        slots: []
      };

      teacher.assignments.push(assignment);
    }

    // 👉 add slot
    assignment.slots.push({
      day,
      time,
      subject
    });

    await teacher.save();

    res.json({
      success: true,
      message: "Teacher assigned successfully ✅"
    });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};