import Notice from "../models/Notice.js";

// ==============================
// 🔹 GET NOTICES (TEACHER)
// ==============================
export const getNotices = async (req, res) => {
  try {

    console.log("🔥 GET NOTICES HIT");
    console.log("👤 USER:", req.user);

    const notices = await Notice.find({
      $and: [
        {
          // 👉 audience filter
          audience: { $in: ["all", "teacher"] }
        },
        {
          // 👉 school filter
          $or: [
            { schoolId: req.user.schoolId },
            { targetSchoolId: req.user.schoolId }
          ]
        }
      ]
    })
    .sort({ createdAt: -1 });

    console.log("📢 NOTICES:", notices);

    res.status(200).json({
      success: true,
      data: notices
    });

  } catch (error) {

    console.log("❌ ERROR:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
};