import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, Award } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { getStudentClasses } from "../../api/services";

const API_URL = import.meta.env.VITE_API_URL;

export const StudentDashboard = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [attendanceRate, setAttendanceRate] = useState(0); // 🔥 NEW


  
  // 👉 Get Today Day
  const getToday = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const today = getToday();

  const getTeacherName = (day: string, time: string, subject: string) => {
    for (const teacher of teachers) {
      for (const assign of teacher.assignments || []) {
        for (const slot of assign.slots || []) {

          const dbSubject = slot.subject?.toLowerCase().trim();
          const uiSubject = subject?.toLowerCase().trim();

          if (
            slot.day === day &&
            slot.time === time &&
            dbSubject === uiSubject
          ) {
            return teacher.name;
          }
        }
      }
    }
    return "";
  };

  // ================= FETCH ROUTINE =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClasses();

        console.log("📦 DASHBOARD DATA:", res);

        setClasses(res.classData || []);
        setTeachers(res.teachers || []);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // ================= FETCH ATTENDANCE =================
  useEffect(() => {
    fetchAttendanceStats();
  }, []);

  const fetchAttendanceStats = async () => {
    try {
         const res = await fetch(`${API_URL}/attendance/my`, {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const result = await res.json();

      console.log("🔥 DASHBOARD ATTENDANCE:", result);

      if (!result.success) return;

      const present = result.data.filter((a: any) => a.status === "present").length;
      const total = result.data.length;

      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      setAttendanceRate(rate);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= TODAY CLASSES =================
  let todayClasses: any[] = [];

  classes.forEach((cls) => {
    const dayRoutine = cls.routine?.[today];

    if (dayRoutine) {
      Object.entries(dayRoutine).forEach(([time, value]: any) => {

        const subject =
          typeof value === "string"
            ? value
            : value?.subject;

        if (subject) {
          todayClasses.push({
            time,
            subject,
            teacher: getTeacherName(today, time, subject)
          });
        }
      });
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500">Welcome back! Ready for another day of learning?</p>
      </div>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Today's Classes */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Today's Classes</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {todayClasses.length}
              </h3>
            </div>
          </div>
        </Card>

        {/* 🔥 Attendance (DYNAMIC) */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {attendanceRate}%
              </h3>
            </div>
          </div>
        </Card>

        {/* Grade */}
      </div>

      {/* ================= LOWER SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* TIMETABLE */}
        <Card title="My Timetable">
          <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">My Timetable</h2>

            {todayClasses.length === 0 ? (
              <p>No classes today</p>
            ) : (
              todayClasses.map((cls) => (
                <div key={cls.time} className="flex items-center justify-between border p-3 rounded-lg mb-2">

                  <div className="text-sm font-medium text-gray-600">
                    🕒 {cls.time}
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{cls.subject}</p>
                    <p className="text-sm text-gray-500">
                      {cls.teacher}
                    </p>
                  </div>

                </div>
              ))
            )}
          </div>
        </Card>

        {/* HOMEWORK */}
        <Card title="Pending Homework">
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', title: 'Calculus Exercise 4.2', due: 'Tomorrow', priority: 'High' },
              { subject: 'Physics', title: 'Lab Report: Optics', due: 'In 3 days', priority: 'Medium' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    item.priority === 'High'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-1">Due: {item.due}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};