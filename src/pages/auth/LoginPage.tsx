import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { LogIn } from 'lucide-react';

import { authService } from '../../api/services';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authService.login({ email, password });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 mb-6">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">QodeMatrix ERP</h1>
          <p className="text-slate-500 mt-2">Sign in to your school management portal</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Demo Credentials</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['superadmin', 'schooladmin', 'teacher', 'student', 'parent'].map(r => (
              <button 
                key={r}
                onClick={() => setEmail(r === 'superadmin' ? 'superadmin@qodematrixtechsolutions.com' : `${r}@demo.com`)}
                className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {r === 'superadmin' ? 'superadmin@qodematrixtechsolutions.com' : `${r}@demo.com`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
