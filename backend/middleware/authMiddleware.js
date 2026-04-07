import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ==============================
// 🔐 PROTECT ROUTE (VERIFY TOKEN)
// ==============================
export const protect = async (req, res, next) => {
  console.log("🔥 PROTECT HIT");
  console.log("👉 next type:", typeof next);
  try {

    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRET_KEY"
    );

    // Get user from DB (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {

    console.error("AUTH ERROR:", error);

    return res.status(401).json({ message: "Not authorized, invalid token" });

  }
};



// ==============================
// 🔐 ROLE BASED ACCESS
// ==============================
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("USER ROLE:", req.user.role);

    const userRole = req.user.role?.toLowerCase().trim();

     const allowedRoles = roles.map(r => r.toLowerCase().trim());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    next();
  };
};