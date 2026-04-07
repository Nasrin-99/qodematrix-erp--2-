import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 STATS
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("❌ No token found");
        setIsLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/attendance/my", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();

      console.log("🔥 Attendance:", result);

      if (!result.success) {
        console.log("❌ API ERROR");
        setIsLoading(false);
        return;
      }

      const formatted = result.data.map((item: any) => ({
        id: item._id,
        date: item.date,
        status:
          item.status === "present"
            ? "Present"
            : item.status === "absent"
            ? "Absent"
            : "Late",
        time: item.slot || "-"
      }));

      setAttendance(formatted);

      // 🔥 CALCULATE STATS
      const present = formatted.filter((a: any) => a.status === "Present").length;
      const absent = formatted.filter((a: any) => a.status === "Absent").length;

      const total = formatted.length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      setTotalPresent(present);
      setTotalAbsent(absent);
      setAttendanceRate(rate);

    } catch (err) {
      console.log("❌ ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
          <p className="text-slate-500">Track your daily attendance records and history.</p>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Attendance Rate
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {attendanceRate}%
          </h3>
        </Card>

        <Card className="p-4 border-l-4 border-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Present
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {totalPresent} Day{totalPresent !== 1 ? "s" : ""}
          </h3>
        </Card>

        <Card className="p-4 border-l-4 border-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Absent
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {totalAbsent} Day{totalAbsent !== 1 ? "s" : ""}
          </h3>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Date', 'Status', 'Check-in Time']}>
            {attendance.length === 0 ? (
              <TableRow>
                <td colSpan={3} className="text-center text-slate-500">
                  No attendance data found
                </td>
              </TableRow>
            ) : (
              attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium text-slate-900">
                    {record.date}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        record.status === 'Present'
                          ? 'success'
                          : record.status === 'Absent'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} />
                      <span>{record.time}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </Table>
        )}
      </Card>
    </div>
  );
};