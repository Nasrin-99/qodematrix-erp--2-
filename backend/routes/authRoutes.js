import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import School from "../models/School.js"; // 🔥 ADD THIS
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// ==============================
// 🔐 AUTH ROUTES
// ==============================

// LOGIN
router.post("/login", loginUser);

// REGISTER
router.post("/register", registerUser);

// ==============================
// 👤 PROFILE ROUTE
// ==============================
router.get("/profile", async (req, res) =>  {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json({ user });

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// ==============================
// 📊 DASHBOARD STATS (🔥 ADD THIS)
// ==============================
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalSchools = await School.countDocuments();

    res.json({ totalSchools });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;