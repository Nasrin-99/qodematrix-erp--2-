// 👉 Class model (MongoDB collection for classes)
import Class from "../models/Class.js";

// 👉 Student model (students collection)
import Student from "../models/Student.js";

// 👉 Attendance model (attendance records)
import Attendance from "../models/Attendance.js";

// 👉 Fee model (fees collection)
import Fee from "../models/Fee.js";

// 👉 mongoose ObjectId validation & conversion ke liye
import mongoose from "mongoose";


import Teacher from "../models/Teacher.js";

// ===============================
// GET CLASSES (School wise)
// ===============================
export const getClasses = async (req, res) => {
  try {
    console.log("🔥 GET CLASSES HIT"); // 👉 debug log

    // 👉 logged-in user ke school ki classes fetch
    const classes = await Class.find({
      schoolId: req.user.schoolId, // 👉 security filter (important)
    }) // 👉 teacher details auto attach

    console.log("📦 TOTAL CLASSES:", classes.length); // 👉 total count

    // 👉 har class ke liye student count calculate kar rahe hai
    const updatedClasses = await Promise.all(
      classes.map(async (cls) => {

        // 👉 is class ke students count karo
        const count = await Student.countDocuments({
          classId: cls._id,
        });

        console.log("CLASS:", cls.name, "ID:", cls._id); // 👉 debug
        console.log("STUDENT COUNT:", count); // 👉 debug

        return {
          ...cls.toObject(),   // 👉 mongoose doc ko plain object banata hai
          routine: Object.fromEntries(cls.routine || []),
          studentCount: count, // 👉 custom field add
        };
      })
    );

    // 👉 final response frontend ko
    res.json(updatedClasses);

  } catch (error) {
    console.error("❌ GET CLASSES ERROR:", error); // 👉 error log
    res.status(500).json({ message: error.message }); // 👉 server error
  }
};


// ===============================
// CREATE CLASS
// ===============================
export const createClass = async (req, res) => {
  try {
    console.log("🔥 CREATE CLASS HIT"); // 👉 debug
    console.log("BODY:", req.body); // 👉 incoming data

    // 👉 frontend se fields extract
    const { name, section, schoolId, routine } = req.body;

    // 👉 new class document create
    const newClass = await Class.create({
      name,
      section,
      schoolId: req.user.schoolId, // 👉 security: logged-in user ke school me hi class create karna
      routine,
    });

    console.log("🚀 FINAL ROUTINE:", JSON.stringify(routine, null, 2));

    console.log("✅ CLASS CREATED:", newClass._id); // 👉 debug

    // 👉 success response (201 created)
    res.status(201).json(newClass);

  } catch (error) {
    console.log("❌ CREATE ERROR:", error); // 👉 error log

    // 👉 validation error / bad request
    res.status(400).json({
      message: error.message,
    });
  }
};


// ===============================
// UPDATE CLASS
// ===============================
export const updateClass = async (req, res) => {
  try {
    console.log("🔥 UPDATE CLASS HIT"); // 👉 debug

    const { id } = req.params; // 👉 URL se class id
    console.log("UPDATE ID:", id); // 👉 debug
    console.log("UPDATE BODY:", req.body); // 👉 new data

    // 👉 class update by id
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // 👉 updated document return karega
    );

    // 👉 agar class exist nahi karti
    if (!updatedClass) {
      console.log("❌ CLASS NOT FOUND");
      return res.status(404).json({ message: "Class not found ❌" });
    }

    console.log("✅ UPDATED:", updatedClass._id); // 👉 debug

    // 👉 success response
    res.status(200).json({
      success: true,
      data: updatedClass,
    });

  } catch (error) {
    console.error("❌ UPDATE ERROR:", error); // 👉 error log
    res.status(500).json({
      success: false,
      message: "Update failed ❌",
    });
  }
};


// ===============================
// GET ALL CLASSES
// ===============================
export const getAllClasses = async (req, res) => {
  try {
    console.log("🔥 GET ALL CLASSES HIT"); // 👉 debug

    // 👉 sab classes fetch (no filter ❌ security risk if multi-school)
    const classes = await Class.find();

    console.log("TOTAL CLASSES:", classes.length); // 👉 debug

    // 👉 har class ka student count add kar rahe hai
    const updatedClasses = await Promise.all(
      classes.map(async (cls) => {

        const count = await Student.countDocuments({
          classId: cls._id,
        });

        console.log("CLASS:", cls.name, "COUNT:", count); // 👉 debug

        return {
          ...cls.toObject(), // 👉 plain object
          studentCount: count, // 👉 extra field
        };
      })
    );

    // 👉 response
    res.json(updatedClasses);

  } catch (error) {
    console.error("❌ GET ALL ERROR:", error);
    res.status(500).json({ message: "Error fetching classes" });
  }
};


// ===============================
// DELETE CLASS
// ===============================
export const deleteClass = async (req, res) => {
  try {
    console.log("🔥 DELETE CLASS HIT"); // 👉 debug

    const classId = req.params.id; // 👉 URL se id
    console.log("DELETE ID:", classId); // 👉 debug

    // 👉 ObjectId valid hai ya nahi check
    if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
      console.log("❌ INVALID CLASS ID");
      return res.status(400).json({ message: "Invalid Class ID ❌" });
    }

    // 👉 string ko ObjectId me convert
    const objectId = new mongoose.Types.ObjectId(classId);

    // 👉 class exist karti hai ya nahi check
    const existingClass = await Class.findById(objectId);
    if (!existingClass) {
      console.log("❌ CLASS NOT FOUND");
      return res.status(404).json({ message: "Class not found ❌" });
    }

    console.log("✅ CLASS FOUND:", existingClass.name); // 👉 debug

    // 👉 related data delete (important for consistency)
    const studentDelete = await Student.deleteMany({ classId: objectId });
    console.log("🧑‍🎓 STUDENTS DELETED:", studentDelete.deletedCount);

    const attendanceDelete = await Attendance.deleteMany({ classId: objectId });
    console.log("📅 ATTENDANCE DELETED:", attendanceDelete.deletedCount);

    const feeDelete = await Fee.deleteMany({ classId: objectId });
    console.log("💰 FEES DELETED:", feeDelete.deletedCount);

    // 👉 class delete
    await Class.findByIdAndDelete(objectId);

    console.log("✅ CLASS DELETED SUCCESS");

    // 👉 success response
    res.status(200).json({
      success: true,
      message: "Class deleted successfully ✅",
    });

  } catch (error) {
    console.error("❌ DELETE ERROR FULL:", error);

    // 👉 server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyClassRoutine = async (req, res) => {
  try {
    const student = req.user;

    const classData = await Class.findById(student.classId);

    const routine = classData.routine;

    // 🔥 MANUAL FIX
    for (const day in routine) {
      for (const time in routine[day]) {
        const slot = routine[day][time];

        if (slot.teacherId) {
          const teacher = await Teacher.findById(slot.teacherId).select("name");

          routine[day][time] = {
            ...slot,
            teacherId: teacher   // ✅ IMPORTANT
          };
        }
      }
    }

    res.json({
      classData: [classData],
      routine
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};