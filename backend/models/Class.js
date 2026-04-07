import mongoose from "mongoose";
import Student from "./Student.js";

// ===============================
// 📚 CLASS SCHEMA (SYSTEM KA CORE 🔥🔥🔥)
// ===============================
const classSchema = new mongoose.Schema(
  {
    // ==============================
    // 📛 BASIC INFO
    // ==============================

    // 👉 class ka naam (e.g. 1, 2, 10)
    // 👉 UI me "Grade 10" dikhane ke liye
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 👉 section (A, B, C)
    // 👉 uppercase → auto capital (a → A)
    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },



    // ==============================
    // 🏫 SCHOOL LINK (VERY IMPORTANT 🔥)
    // ==============================

    // 👉 class kis school ka hai
    // 👉 pura data isolation isi pe depend karta hai
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true, // 👉 query fast karne ke liye index
    },

    // ✅ MULTIPLE TEACHERS SUPPORT
    teacherIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],



    // ==============================
    // 🔥 ROUTINE (BRAIN OF SYSTEM 🔥🔥🔥)
    // ==============================

    // 👉 yaha pura timetable store hota hai
    // 👉 structure:
    // {
    //   Monday: {
    //     "10:00-11:00": {
    //       subject: "Math",
    //       teacherId: "..."
    //     }
    //   }
    // }

    // 👉 ye kya karta hai:
    // ✔ subject mapping
    // ✔ teacher mapping
    // ✔ time slot mapping

    // ✅ STRUCTURED ROUTINE
    routine: {
      type: Map,
      of: {
        type: Map,
        of: new mongoose.Schema({
          subject: String,
          teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        })
      },
      default: {}
    },

    // ==============================
    // 📊 STUDENT COUNT
    // ==============================

    // 👉 kitne students hai class me
    // 👉 dashboard me use hota hai
    // 👉 manually update ya middleware se
    studentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    // 👉 auto fields:
    // createdAt / updatedAt
    timestamps: true,
  }
);



// ===============================
// 🔥 DELETE MIDDLEWARE (CASCADE DELETE 🔥)
// ===============================

// 👉 jab class delete hota hai:
/// → us class ke saare students bhi delete honge
classSchema.pre("findOneAndDelete", async function () {
  console.log("🔥 MIDDLEWARE DELETE HIT");

  try {
    // 👉 query se classId nikala
    const query = this.getQuery();
    const classId = query._id;

    if (!classId) return;

    // 👉 us class ke saare students delete
    const deletedStudents = await Student.deleteMany({
      classId: classId,
    });

    console.log("🧑‍🎓 CASCADE STUDENTS DELETED:", deletedStudents.deletedCount);

  } catch (error) {
    console.log("❌ MIDDLEWARE ERROR:", error);
  }
});



// ===============================
// 📦 EXPORT MODEL (SAFE)
// ===============================

// 👉 agar already model exist kare → reuse
// 👉 warna naya create kare
const Class =
  mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;