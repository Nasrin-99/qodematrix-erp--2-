import express from "express";
import School from "../models/School.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { deleteSchool } from "../controllers/schoolController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { sendEmail } from "../utils/sendEmail.js";   // ✅ ADD

const router = express.Router();


// ===============================
// 🔹 GET ALL SCHOOLS
// ===============================
router.get("/", protect, authorize("superadmin"), async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ===============================
// 🔹 CREATE SCHOOL + ADMIN
// ===============================
router.post("/", protect, authorize("superadmin"), async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const { name, address, email, phone, plan } = req.body;

    // 🔴 validation
    if (!name || !address || !email) {
      return res.status(400).json({
        message: "Name, Address and Email are required"
      });
    }

    // 🔴 check existing admin
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Admin with this email already exists"
      });
    }

    // ===============================
    // 1️⃣ CREATE SCHOOL
    // ===============================
    const school = await School.create({
      name,
      address,
      email,
      phone,
      plan,
      status: "Active"
    });

    // ===============================
    // 2️⃣ CREATE ADMIN USER
    // ===============================
    const defaultPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const admin = await User.create({
      name: "School Admin",
      email,
      password: hashedPassword,
      role: "schooladmin",
      schoolId: school._id
    });

    // ===============================
    // DEBUG LOGS
    // ===============================
    console.log("✅ School Created:", school._id);
    console.log("✅ Admin Created:", admin._id);

    console.log("🔐 Admin Login:");
    console.log("Email:", email);
    console.log("Password:", defaultPassword);

    // ===============================
    // 📩 SEND EMAIL (🔥 MAIN FEATURE)
    // ===============================
    await sendEmail({
      to: email,
      subject: "Your School Admin Account Created",
      text: `Welcome to QodeMatrix ERP 🎉

Your login details:

Email: ${email}
Password: ${defaultPassword}

Please login and change your password.`,
    });

    // ===============================
    // RESPONSE
    // ===============================
    res.status(201).json({
      message: "School and Admin created successfully",
      school,
      adminCredentials: {
        email,
        password: defaultPassword
      }
    });

  } catch (error) {
    console.log("❌ CREATE ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
});


// ===============================
// 🔹 DELETE SCHOOL
// ===============================
router.delete("/:id", protect, authorize("superadmin"), deleteSchool);

export default router;