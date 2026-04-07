import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

let otpStore = {}; // temporary memory storage


// ===============================
// SEND OTP
// ===============================

export const sendOTP = async (req, res) => {

  try {

    const { email } = req.body;

    console.log("OTP request for:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email not found"
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory
    otpStore[email] = otp;

    console.log("Generated OTP:", otp);

    // ===============================
    // SEND EMAIL
    // ===============================

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "QodeMatrix ERP Password Reset",
      text: `Your OTP is: ${otp}`
    });

    console.log("OTP sent to email:", email);

    res.json({
      message: "OTP sent"
    });

  } catch (error) {

    console.log("OTP ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};



// ===============================
// VERIFY OTP
// ===============================

export const verifyOTP = (req, res) => {

  const { email, otp } = req.body;

  console.log("Stored OTP:", otpStore[email]);
  console.log("Entered OTP:", otp);

  const savedOTP = String(otpStore[email]);
  const enteredOTP = String(otp);

  if (savedOTP === enteredOTP) {

    return res.json({
      message: "OTP verified"
    });

  }

  res.status(400).json({
    message: "Invalid OTP"
  });

};



// ===============================
// RESET PASSWORD
// ===============================

export const resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

     console.log("PASSWORD RECEIVED:", newPassword);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // convert to string
    const cleanPassword = String(newPassword).trim();

    // bcrypt hash
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    console.log("HASHED PASSWORD:", hashedPassword);

    user.password = hashedPassword;

    await user.save();

    // delete otp after password reset
    delete otpStore[email];

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {


    console.log("RESET PASSWORD ERROR:", error);
    res.status(500).json({
      message: error.message
    });

  }

};