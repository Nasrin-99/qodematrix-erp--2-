import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ===============================
// 👤 USER SCHEMA (LOGIN + ROLE SYSTEM)
// ===============================
const userSchema = new mongoose.Schema(
  {
    // 👤 Name of user (Teacher / Student / Admin / SuperAdmin)
    // 👉 UI me display ke liye use hota hai
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 📧 Email (LOGIN ke liye main field)
    // 👉 unique hai → ek hi email se ek account
    // 👉 lowercase → duplicate avoid (ABC@gmail vs abc@gmail)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // 🔐 Password (encrypted store hota hai)
    // 👉 login ke time compare hoga (bcrypt se)
    password: {
      type: String,
      required: true,
    },

    // 👥 Role (SYSTEM ka brain 🔥)
    // 👉 decide karta hai user kya access karega
    // 👉 flow:
    // superadmin → company level
    // schooladmin → school manage karega
    // teacher → class + attendance
    // student → apna data dekhega
    role: {
      type: String,
      enum: ["superadmin", "schooladmin", "teacher", "student"],
      required: true,
    },

    // 🏫 School reference (MULTI-SCHOOL SUPPORT 🔥)
    // 👉 har user kisi school se linked hoga
    // 👉 except superadmin (kyunki wo company level pe hai)
    // 👉 data flow:
    // User → schoolId → School → uske andar classes/students/teachers
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: function () {
        return this.role !== "superadmin"; // 👈 superadmin ke liye optional
      },
      index: true, // 👉 query fast karne ke liye index
    },

    // 🖼️ Avatar (profile image)
    // 👉 UI me profile icon dikhane ke liye
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    // ⏱️ Automatically add:
    // createdAt → kab bana
    // updatedAt → kab update hua
    timestamps: true,
  }
);



// ===============================
// 🔐 PASSWORD COMPARE FUNCTION (LOGIN SYSTEM)
// ===============================

// 👉 jab user login karega:
// enteredPassword (user input)
// vs
// this.password (DB me stored hashed password)
//
// 👉 bcrypt.compare:
/// true → password correct
/// false → wrong password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// ===============================
// ⚠️ (COMMENTED) STUDENT COUNT AUTO UPDATE
// ===============================

// 👉 ye logic kya karta:
// jab user (student role) create hota:
// → uska classId le
// → count kare kitne students hai us class me
// → Class.studentCount update kare

// ❗ BUT PROBLEM:
// 👉 ab tu Student model use kar rahi hai (User nahi)
// 👉 isliye ye logic yaha galat jagah hai

// 👉 correct jagah:
// ✔ studentController ya Student model me hona chahiye


// userSchema.post("save", async function (doc) {
//   try {
//     if (doc.role === "student" && doc.classId) {
//       const count = await mongoose
//         .model("User")
//         .countDocuments({
//           role: "student",
//           classId: doc.classId,
//         });

//       await Class.findByIdAndUpdate(doc.classId, {
//         studentCount: count,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });



// ===============================
// ⚠️ (COMMENTED) DELETE HOOK
// ===============================

// 👉 jab student delete hota:
// → class ka student count update hota

// ❗ same issue:
// 👉 ye User model me nahi hona chahiye
// 👉 Student model me hona chahiye


// userSchema.post("findOneAndDelete", async function (doc) {
//   try {
//     if (doc && doc.role === "student" && doc.classId) {
//       const count = await mongoose
//         .model("User")
//         .countDocuments({
//           role: "student",
//           classId: doc.classId,
//         });

//       await Class.findByIdAndUpdate(doc.classId, {
//         studentCount: count,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });



// ===============================
// 📦 EXPORT MODEL
// ===============================

// 👉 MongoDB collection name = "users"
export default mongoose.model("User", userSchema);