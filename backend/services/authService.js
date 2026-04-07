import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ==============================
// LOGIN SERVICE
// ==============================
export const loginUserService = async ({ email, password }) => {

  console.log("🔥 LOGIN SERVICE START");
  console.log("👉 ENTERED EMAIL:", email);
  console.log("👉 ENTERED PASSWORD:", password);

  // 🔍 find user
  const user = await User.findOne({ email });

  console.log("👉 USER FROM DB:", user);

  if (!user) {
    console.log("❌ USER NOT FOUND");
    throw new Error("Invalid email or password");
  }

  console.log("👉 DB PASSWORD (HASH):", user.password);

  // ✅ bcrypt compare
  const isMatch = await bcrypt.compare(password, user.password);

  console.log("👉 MATCH RESULT:", isMatch);

  if (!isMatch) {
    console.log("❌ PASSWORD NOT MATCH");
    throw new Error("Invalid email or password");
  }

  console.log("✅ LOGIN SUCCESS");

  return {
    user,
    token: generateToken(user._id),
  };
};


// ==============================
// REGISTER SERVICE
// ==============================
export const registerUserService = async (data) => {

  console.log("🔥 REGISTER SERVICE START");
  console.log("👉 REGISTER DATA:", data);

  const { name, email, password, role, schoolId } = data;

  const existingUser = await User.findOne({ email });

  console.log("👉 EXISTING USER:", existingUser);

  if (existingUser) {
    console.log("❌ USER ALREADY EXISTS");
    throw new Error("User already exists");
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("👉 HASHED PASSWORD:", hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    schoolId,
  });

  console.log("✅ USER CREATED:", user);

  return {
    user,
    token: generateToken(user._id),
  };
};