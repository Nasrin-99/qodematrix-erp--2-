import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { attendanceService } from "../../api/services";

export const TeacherAttendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 STATS
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);

  // ================= FETCH =================
  const fetchAttendance = async () => {
    try {
      const res = await attendanceService.getTeacherAttendance();
      const records = res?.data || [];

      console.log("📦 TEACHER ATT:", records);

      // 🔥 FORMAT DATA
      const formatted = records.map((item: any) => ({
        id: item._id,
        date: new Date(item.date).toISOString().split("T")[0],
        status:
          item.status === "present"
            ? "Present"
            : item.status === "absent"
            ? "Absent"
            : "Late",
        time: item.slot || "-"
      }));

      setAttendance(formatted);

      // 🔥 STATS CALCULATION
      const present = formatted.filter((a: any) => a.status === "Present").length;
      const absent = formatted.filter((a: any) => a.status === "Absent").length;

      const total = formatted.length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      setTotalPresent(present);
      setTotalAbsent(absent);
      setAttendanceRate(rate);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
        <p className="text-slate-500">Track your attendance records and history.</p>
      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="p-5 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase">
            Attendance Rate
          </p>
          <h3 className="text-3xl font-bold mt-2">
            {attendanceRate}%
          </h3>
        </Card>

        <Card className="p-5 border-l-4 border-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase">
            Total Present
          </p>
          <h3 className="text-3xl font-bold mt-2">
            {totalPresent}
          </h3>
        </Card>

        <Card className="p-5 border-l-4 border-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase">
            Total Absent
          </p>
          <h3 className="text-3xl font-bold mt-2">
            {totalAbsent}
          </h3>
        </Card>

      </div>

      {/* 🔥 LIST STYLE (Student jaisa UI) */}
      <Card className="p-0 overflow-hidden">

        {isLoading ? (
          <LoadingSpinner />
        ) : attendance.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No attendance data found
          </div>
        ) : (
          <div>

            {/* HEADER */}
            <div className="grid grid-cols-3 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-600">
              <span>Date</span>
              <span>Status</span>
              <span>Time</span>
            </div>

            {/* DATA */}
            {attendance.map((record) => (
              <div
                key={record.id}
                className="grid grid-cols-3 items-center px-6 py-4 border-t"
              >
                <span className="font-medium">{record.date}</span>

                <Badge
                  variant={
                    record.status === "Present"
                      ? "success"
                      : record.status === "Absent"
                      ? "danger"
                      : "warning"
                  }
                >
                  {record.status}
                </Badge>

                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={14} />
                  <span>{record.time}</span>
                </div>
              </div>
            ))}

          </div>
        )}
      </Card>

    </div>
  );
};