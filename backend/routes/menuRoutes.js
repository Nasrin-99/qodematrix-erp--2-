import express from "express";

const router = express.Router();

// ===============================
// 📂 GET MENU
// ===============================
router.get("/", (req, res) => {
  res.json([
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Teachers", path: "/teachers" },
  ]);
});

export default router;