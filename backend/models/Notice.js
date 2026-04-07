import mongoose from "mongoose";

// ===============================
// 🔔 NOTICE SCHEMA (COMMUNICATION SYSTEM 🔥)
// ===============================
const noticeSchema = new mongoose.Schema(
  {
    // ==============================
    // 📝 NOTICE CONTENT
    // ==============================

    // 👉 notice ka title (short heading)
    // 👉 example: "Holiday Notice"
    title: {
      type: String,
      required: true,
    },

    // 👉 full message / description
    // 👉 example: "School will remain closed tomorrow"
    message: {
      type: String,
      required: true,
    },



    // ==============================
    // 🎯 TARGET AUDIENCE
    // ==============================

    // 👉 kis type ke user ko notice dikhana hai
    // 👉 filtering ke liye use hota hai
    // 👉 example:
    // "all" → sabko
    // "teacher" → sirf teachers
    // "student" → sirf students
    audience: {
      type: String,
      enum: ["all", "student", "teacher", "parent", "schooladmin"],
      default: "all",
    },



    // ==============================
    // 👤 WHO POSTED
    // ==============================

    // 👉 kis role ne notice dala
    // 👉 system flow:
    // superadmin → company level notice
    // schooladmin → school level notice
    postedByRole: {
      type: String,
      enum: ["superadmin", "schooladmin"],
    },



    // ==============================
    // 🏫 TARGET SCHOOL
    // ==============================

    // 👉 agar superadmin notice bhejta hai:
    // → specific school ko target karega
    // 👉 agar null ho → global ho sakta hai
    targetSchoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },



    // ==============================
    // 🔗 CREATED BY (USER LINK)
    // ==============================

    // 👉 kis user ne notice create kiya
    // 👉 future me audit/log ke liye useful
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // 👉 auto fields:
    // createdAt → kab notice bana
    // updatedAt → kab edit hua
    timestamps: true,
  }
);


// ===============================
// 📦 EXPORT MODEL
// ===============================
export default mongoose.model("Notice", noticeSchema);