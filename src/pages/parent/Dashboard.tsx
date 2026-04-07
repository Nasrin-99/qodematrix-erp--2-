import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GraduationCap, Award, Calendar, Bell, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const ParentDashboard = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch Summary Stats (Attendance & Grades)
        const statsRes = await axios.get(`/api/dashboard/parent/${user?.id}`);
        setData(statsRes.data);

        // 2. Fetch Recent Notices from your notices.js route
        const noticeRes = await axios.get(`/api/notices?schoolId=${user?.schoolId}`);
        setNotices(noticeRes.data.slice(0, 3)); // Get latest 3
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchDashboardData();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Parent Dashboard</h1>
        <p className="text-slate-500">Monitoring progress for {data?.studentName || 'your child'}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overall Grade</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.overallGrade || 'N/A'}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Calendar size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance</p>
              <h3 className="text-2xl font-bold text-slate-900">{data?.attendancePercentage || 0}%</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Bell size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Notices</p>
              <h3 className="text-2xl font-bold text-slate-900">{notices.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Latest Notices">
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="p-3 rounded-lg border border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900">{notice.title}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notice.content}</p>
                <p className="text-[10px] text-indigo-500 mt-2">{new Date(notice.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Events">
           {/* Static/Mock as per your requirement or fetch from a dedicated Events model */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Parent-Teacher Meeting</h4>
                <p className="text-xs text-slate-500">March 10, 2026 • 04:00 PM</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};