import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { attendanceService } from '../../api/services';

export const TeacherDashboard = () => {

  const [attendanceRate, setAttendanceRate] = useState(0);

  // 🔥 FETCH ATTENDANCE
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await attendanceService.getTeacherAttendance();
        const records = res?.data || [];

        const present = records.filter((r: any) => r.status === "present").length;
        const total = records.length;

        const rate = total > 0 ? Math.round((present / total) * 100) : 0;

        setAttendanceRate(rate);

      } catch (err) {
        console.log(err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Teacher Dashboard</h1>
        <p className="text-slate-500">
          Welcome back! Here's what's happening with your classes today.
        </p>
      </div>

      {/* 🔥 TOP CARDS (UPDATED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* MY CLASSES */}
        <Card className="p-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-500">My Classes</p>
              <h3 className="text-3xl font-bold">2</h3>
            </div>
          </div>
        </Card>

        {/* 🔥 ATTENDANCE (NEW) */}
        <Card className="p-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Attendance</p>
              <h3 className="text-3xl font-bold">{attendanceRate}%</h3>
            </div>
          </div>
        </Card>

      </div>

      {/* SCHEDULE */}
      <Card title="Today's Schedule">
        <div className="space-y-3">

          <div className="flex justify-between items-center border p-4 rounded-lg">
            <span className="text-indigo-600 font-medium">
              🕒 10:00 AM - 11:00 AM
            </span>
            <div className="text-right">
              <p className="font-semibold">biology</p>
              <p className="text-sm text-gray-500">Class 2-A</p>
            </div>
          </div>

          <div className="flex justify-between items-center border p-4 rounded-lg">
            <span className="text-indigo-600 font-medium">
              🕒 10:00 AM - 11:00 AM
            </span>
            <div className="text-right">
              <p className="font-semibold">physics</p>
              <p className="text-sm text-gray-500">Class 1-A</p>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
};