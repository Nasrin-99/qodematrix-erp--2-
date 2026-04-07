import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';

// ✅ FIX: missing imports add kiye
import {
  dashboardService,
  studentService,
  attendanceService,
  noticeService,
  getTodayAttendance
} from '../../api/services';

export const SchoolAdminDashboard = () => {
  const [attendance, setAttendance] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const [notices, setNotices] = useState<any[]>([]);
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);

 useEffect(() => {

  fetchAttendance();

  // ✅ 🔥 LISTENER ADD (IMPORTANT)
  const handleUpdate = () => {
    fetchAttendance();
  };

  window.addEventListener("attendanceUpdated", handleUpdate);

  // notices
  noticeService.getAll().then(setNotices);

  // students
  studentService.getAll().then((res) => {
    const data = (res || []).slice(-5).reverse();
    setRecentStudents(data);
  });

  // dashboard stats
  dashboardService.getStats().then((res) => {
    setStats(res);
  });

  return () => {
    window.removeEventListener("attendanceUpdated", handleUpdate);
  };

}, []);

  const fetchAttendance = async () => {
    const res = await getTodayAttendance();
    setAttendanceCount(res.total);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Dashboard</h1>
          <p className="text-slate-500">Overview of Greenwood International School</p>
        </div>

      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Students</p>
              <h3 className="text-2xl font-bold">
                {stats?.totalStudents ?? '...'}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Teachers</p>
              <h3 className="text-2xl font-bold">
                {stats?.totalTeachers ?? '...'}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Attendance Today</p>
              <h3 className="text-2xl font-bold">
                {attendanceCount || 0}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* 🔥 STUDENTS + EVENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card className="lg:col-span-2" title="Recent Student Admissions">

          <div className="mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>

          <Table headers={['Student Name', 'Class', 'Admission ID', 'Status']}>
            {recentStudents.map((s, i) => {
              const admissionId = `ADM-2026-${String(i + 1).padStart(3, '0')}`;

              return (
                <TableRow key={s._id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>
                    {s.classId?.name}-{s.classId?.section}
                  </TableCell>
                  <TableCell>{admissionId}</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-4">
            {(showAll ? notices : notices.slice(0, 2)).map((notice, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <h4 className="text-sm font-semibold">{notice.title}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {notice.message?.slice(0, 60)}
                </p>
              </div>
            ))}

            {notices.length === 0 && (
              <p className="text-sm text-center text-slate-400">
                No upcoming events
              </p>
            )}

            <Button
              variant="ghost"
              className="w-full text-xs text-indigo-600"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Events"}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
};