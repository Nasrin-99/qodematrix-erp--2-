import React, { useState } from "react";
import axios from "axios";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";


export const ForgotPassword = () => {
const [step, setStep] = useState(1);

const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const API = import.meta.env.VITE_API_URL + "/password";

// ===============================
// SEND OTP
// ===============================
const sendOTP = async () => {
if (!email) {
setError("Email is required");
return;
}


try {
  setLoading(true);
  setError("");

  await axios.post(`${API}/send-otp`, { email });

  setStep(2);
} catch (err: any) {
  setError(err.response?.data?.message || "Failed to send OTP");
} finally {
  setLoading(false);
}


};

// ===============================
// VERIFY OTP
// ===============================
const verifyOTP = async () => {
if (!otp) {
setError("OTP is required");
return;
}


try {
  setLoading(true);
  setError("");

  await axios.post(`${API}/verify-otp`, { email, otp });

  setStep(3);
} catch (err: any) {
  setError(err.response?.data?.message || "Invalid OTP");
} finally {
  setLoading(false);
}


};

// ===============================
// RESET PASSWORD
// ===============================
const resetPassword = async () => {
if (!password) {
setError("Password is required");
return;
}


if (password.length < 6) {
  setError("Password must be at least 6 characters");
  return;
}

try {
  setLoading(true);
  setError("");

  await axios.post(`${API}/reset-password`, {
    email,
    newPassword: password.trim(),
  });

  setStep(1);
  setEmail("");
  setOtp("");
  setPassword("");
} catch (err: any) {
  setError(err.response?.data?.message || "Reset failed");
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"> <div className="w-full max-w-md space-y-8"> <div className="text-center"> <h1 className="text-3xl font-bold text-slate-900">
Reset Password </h1> <p className="text-slate-500 mt-2">
Recover your account access </p> </div>


    <Card className="p-8 space-y-6">

      {error && (
        <p className="text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {loading && <LoadingSpinner />}

      {/* STEP 1 */}
      {step === 1 && !loading && (
        <>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email && error ? "Email required" : ""}
          />

          <Button className="w-full" onClick={sendOTP}>
            Send OTP
          </Button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && !loading && (
        <>
          <Input
            label="Enter OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button className="w-full" onClick={verifyOTP}>
            Verify OTP
          </Button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && !loading && (
        <>
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={resetPassword}>
            Reset Password
          </Button>
        </>
      )}

    </Card>
  </div>
</div>


);
};
