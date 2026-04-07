import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const RegisterPage = () => {
  // delet karna he
  console.log(import.meta.env.VITE_API_URL);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL + "/auth";

  // ===============================
  // REGISTER
  // ===============================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(`${API}/register`, {
        name,
        email,
        password,
        role,
      });

      // ✅ SUCCESS → REDIRECT TO LOGIN
      navigate("/login");

    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }


  };

  return (<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">


    <div className="w-full max-w-md space-y-8">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>
        <p className="text-slate-500 mt-2">
          Start your journey with us
        </p>
      </div>

      <Card className="p-8">

        <form onSubmit={handleRegister} className="space-y-6">

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* NAME */}
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Role
            </label>

            <select
              className="w-full mt-1 h-10 rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="schooladmin">School Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full"
            isLoading={loading}
          >
            Register
          </Button>

          {/* LOGIN */}
          <p className="text-center text-sm">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 ml-1"
            >
              Login
            </button>
          </p>

        </form>

      </Card>

    </div>

  </div>


  );
};
