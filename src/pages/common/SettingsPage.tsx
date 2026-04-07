import React, { useState } from 'react';
import { User, Bell, Shield, Globe, LogOut } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios'; // Ensure axios is installed

export const SettingsPage = () => {
  const { user, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  // 1. Connects to your backend's Profile Update logic
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Logic would go to a route like /api/auth/profile (if implemented)
      // or student/teacher update route based on user.role
      await axios.put(`/api/${user?.role}s/${user?.id}`, { name });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Connects to your passwordRoutes.js -> forgot-password
  const handlePasswordUpdate = async () => {
    try {
      await axios.post('/api/password/forgot-password', { email: user?.email });
      alert("A reset link has been sent to your email: " + user?.email);
    } catch (error) {
      alert("Error sending reset email.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile, notifications and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Profile Information">
            <div className="space-y-4">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                  <input 
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                  <input 
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                    defaultValue={user?.email}
                    disabled
                  />
                </div>
              </div>
              <Button 
                className="mt-4" 
                onClick={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Card>

          <Card title="Security">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Change Password</p>
                    <p className="text-xs text-slate-500">Update your account password regularly.</p>
                  </div>
                </div>
                {/* Triggering your backend password reset flow */}
                <Button variant="outline" size="sm" onClick={handlePasswordUpdate}>Update</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-700">Email Notifications</span>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-700">Public Profile</span>
                </div>
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-red-50 border-red-100">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-red-900">Danger Zone</h3>
              <p className="text-xs text-red-700">Once you delete your account, there is no going back.</p>
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-100">Delete Account</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};