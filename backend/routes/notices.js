import express from "express";
import Notice from "../models/Notice.js";
import { protect } from "../middleware/authMiddleware.js";
import { getNotices } from "../controllers/noticeController.js";



const router = express.Router();


// =====================================================
// 🔹 GET ALL NOTICES (FINAL FIXED)
// =====================================================
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user;

    console.log("👤 USER:", user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    let filter = {};

    // ================= SUPER ADMIN =================
    if (user.role === "superadmin") {
      filter = {
        postedByRole: "superadmin",
      };
    }

    // ================= SCHOOL ADMIN =================
    else if (user.role === "schooladmin" || user.role === "principal") {
      filter = {
        $or: [
          {
            targetSchoolId: user.schoolId,
            audience: "schooladmin",
          },
          {
            postedByRole: "schooladmin",
            targetSchoolId: user.schoolId,
          },
        ],
      };
    }

    // ================= TEACHER / STUDENT =================
    else {
      filter = {
        targetSchoolId: user.schoolId,
        audience: { $in: ["all", user.role] },
      };
    }

    console.log("📦 FINAL FILTER:", filter);

    const notices = await Notice.find(filter).sort({ createdAt: -1 });

    console.log("📄 TOTAL NOTICES:", notices.length);

    res.json(notices);

  } catch (err) {
    console.log("❌ ERROR GET:", err);
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 🔹 CREATE NOTICE (FINAL FIXED)
// =====================================================
router.post("/", protect, async (req, res) => {
  try {
    const user = req.user;

    console.log("👤 USER:", user);
    console.log("📨 BODY:", req.body);

    if (!req.body.title || !req.body.message) {
      return res.status(400).json({ error: "Title & message required" });
    }

    let audience = req.body.audience;

    // 🔥 RULE: superadmin → schooladmin ko bhejega
    if (user.role === "superadmin") {
      audience = "schooladmin";
    }

    let schoolId;

    if (user.role === "superadmin") {
      if (!req.body.targetSchoolId) {
        return res.status(400).json({ error: "Select school ❗" });
      }
      schoolId = req.body.targetSchoolId;
    } else {
      schoolId = user.schoolId;
    }

    console.log("🏫 FINAL schoolId:", schoolId);

    const notice = await Notice.create({
      title: req.body.title,
      message: req.body.message,

      audience,
      postedByRole: user.role,

      // 🔥 MAIN FIX
      targetSchoolId: schoolId,
      schoolId: schoolId,

      createdBy: user._id,
    });

    console.log("✅ CREATED:", notice);

    res.status(201).json(notice);

  } catch (err) {
    console.log("❌ ERROR POST:", err);
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 🔹 DELETE NOTICE
// =====================================================
router.delete("/:id", protect, async (req, res) => {
  try {
    console.log("🗑 DELETE:", req.params.id);

    await Notice.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.log("❌ DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// =====================================================
// 🔹 UPDATE NOTICE
// =====================================================
router.put("/:id", protect, async (req, res) => {
  try {
    console.log("✏️ UPDATE:", req.params.id);
    console.log("📨 DATA:", req.body);

    const updated = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("❌ UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router; 