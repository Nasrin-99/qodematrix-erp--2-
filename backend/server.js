import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import noticeRoutes from "./routes/notices.js"; 
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import classRoutes from "./routes/classRoutes.js";// ✅ ADD THIS LINE
import attendanceRoutes from "./routes/attendanceRoutes.js";


dotenv.config();
connectDB();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/notices", noticeRoutes); 
app.use("/api", subscriptionRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);


// ===============================
// ROOT TEST
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 QodeMatrix ERP API Running...");
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});