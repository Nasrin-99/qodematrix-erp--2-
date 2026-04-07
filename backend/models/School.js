// 👉 mongoose import (MongoDB schema banane ke liye)
import mongoose from "mongoose";


// ===============================
// 🏫 SCHOOL SCHEMA (ROOT ENTITY 🔥)
// ===============================

// 👉 School schema define kar rahe hai
const schoolSchema = new mongoose.Schema(
  {
    // ==============================
    // 🏫 BASIC INFO
    // ==============================

    // 👉 school ka naam (MAIN IDENTITY)
    // 👉 UI me display hoga
    // 👉 example: "Delhi Public School"
    name: {
      type: String,
      required: true, // 👉 ye field mandatory hai
    },

    // 👉 school ka address
    // 👉 optional hai (agar na do to empty string)
    address: {
      type: String,
      default: "", // 👉 default empty
    },

    // 👉 contact number (school office)
    phone: {
      type: String,
      default: "", // 👉 default empty
    },

    // 👉 official email (school contact)
    email: {
      type: String,
      default: "", // 👉 default empty
    },
  },
  {
    // 👉 automatically:
    // createdAt → kab school create hua
    // updatedAt → kab update hua
    timestamps: true,
  }
);


// ===============================
// 📦 EXPORT MODEL
// ===============================

// 👉 MongoDB collection name = "schools"
export default mongoose.model("School", schoolSchema);