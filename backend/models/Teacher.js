import mongoose from "mongoose";

// ===============================
// 👩‍🏫 TEACHER SCHEMA (MAIN WORKING ENTITY 🔥)
// ===============================
const teacherSchema = new mongoose.Schema(
  {
    // ==============================
    // 🧑 BASIC INFO
    // ==============================

    // 👉 Teacher ka naam (UI display + identity)
    name: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
    },

    // 👉 Email (optional login reference ya contact)
    // 👉 lowercase → duplicate avoid
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    // 👉 Phone number (contact ke liye)
    phone: {
      type: String,
      trim: true,
    },

    // 👉 Experience (UI display)
    experience: {
      type: String,
      trim: true,
    },



    // ==============================
    // 🖼️ IMAGE (OPTIONAL)
    // ==============================

    // 👉 currently disabled (future use)
    // photo: {
    //   type: String,
    //   default: null,
    // },



    // ==============================
    // 🔥 ASSIGNMENTS (CORE LOGIC 🔥🔥🔥)
    // ==============================

    // 👉 ye pura system ka MOST IMPORTANT part hai
    // 👉 teacher ko kaunsi class + kaunsa subject + kaunsa slot diya hai
    assignments: [
      {
        // ==========================
        // 📚 CLASS LINK
        // ==========================

        // 👉 kis class me teacher padhata hai
        // 👉 relation: Teacher → Class
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
          required: true,
        },

        // 👉 class ka naam (fast UI render)
        // ❗ populate ke bina bhi show kar sakte ho
        name: String,

        // 👉 section (A, B, C)
        section: String,



        // ==========================
        // ⏰ TIME SLOT + SUBJECT
        // ==========================

        // 👉 ek class ke andar multiple slots ho sakte hain
        // 👉 ek teacher multiple subjects padha sakta hai
        slots: [
          {
            // 👉 kaun sa din (Monday, Tuesday...)
            day: {
              type: String,
            },

            // 👉 kaun sa time (10:00 - 11:00)
            time: {
              type: String,
            },

            // 👉 subject (Math, Science...)
            subject: {
              type: String,
            },
          },
        ],
      },
    ],



    // ==============================
    // 🔗 RELATIONS
    // ==============================

    // 👉 teacher kis school ka hai (MULTI-SCHOOL FILTER 🔥)
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    // 👉 login user se link (User model)
    // 👉 teacher login karega → is userId se identify hoga
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },



    // ==============================
    // ⚡ STATUS
    // ==============================

    // 👉 active / inactive (disable teacher)
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    // 👉 createdAt / updatedAt auto
    timestamps: true,
  }
);



// ===============================
// 📦 EXPORT MODEL
// ===============================
export default mongoose.model("Teacher", teacherSchema);