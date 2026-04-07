import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

export const LoginPage = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const [error, setError] = useState("");

const { login, isAuthenticated } = useAuthStore();

const navigate = useNavigate();

// ===============================
// AUTO REDIRECT IF LOGGED IN
// ===============================
useEffect(() => {
if (isAuthenticated) {
navigate("/dashboard");
}
}, [isAuthenticated]);

// ===============================
// LOAD REMEMBERED EMAIL
// ===============================
useEffect(() => {
const savedEmail = localStorage.getItem("rememberEmail");


if (savedEmail) {
  setEmail(savedEmail);
  setRememberMe(true);
}


}, []);

// ===============================
// LOGIN
// ===============================
const handleLogin = async (e: React.FormEvent) => {
e.preventDefault();

if (!email || !password) {
  setError("All fields are required");
  return;
}

try {
  setError("");

  await login(email.trim(), password.trim());

  // remember email
  if (rememberMe) {
    localStorage.setItem("rememberEmail", email);
  } else {
    localStorage.removeItem("rememberEmail");
  }

  // ✅ CENTRALIZED REDIRECT
  navigate("/dashboard");

} catch (err: any) {
  setError(err.message || "Invalid credentials");
}


};

return ( <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"> <div className="w-full max-w-md space-y-8">

    {/* LOGO */}
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        QodeMatrix ERP
      </h1>

      <p className="text-slate-500 mt-2">
        Sign in to your account
      </p>
    </div>

    <Card className="p-8">

      <form onSubmit={handleLogin} className="space-y-6">

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <Input
          label="Email"
          type="email"
          placeholder="admin@school.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-slate-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* OPTIONS */}
        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm text-slate-600">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-indigo-600"
          >
            Forgot password?
          </button>

        </div>

        {/* LOGIN */}
        <Button type="submit" className="w-full">
          Sign In
        </Button>

        {/* REGISTER */}
        <p className="text-center text-sm">
          Don’t have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-indigo-600 ml-1"
          >
            Register
          </button>
        </p>

      </form>

    </Card>
  </div>
</div>


);
};
