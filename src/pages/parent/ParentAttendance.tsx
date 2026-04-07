import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';

export const ParentAttendance = () => {
  const { user } = useAuthStore();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [stats, setStats] = useState({ rate: 0, present: 0, absent: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Fetches child's attendance using the parent's ID or linked student ID
        const response = await axios.get(`http://localhost:5000/api/students/attendance/my-child`);
        const data = response.data.data;

        setAttendance(data);

        // Calculate basic stats from the returned data
        const presentCount = data.filter((r: any) => r.status === 'Present' || r.status === 'Late').length;
        const absentCount = data.filter((r: any) => r.status === 'Absent').length;
        const rate = data.length > 0 ? Math.round((presentCount / data.length) * 100) : 0;

        setStats({ rate, present: presentCount, absent: absentCount });
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Child Attendance</h1>
        <p className="text-slate-500">View your child's daily attendance history and records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.rate}%</h3>
        </Card>
        <Card className="p-4 border-l-4 border-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Present</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.present} Days</h3>
        </Card>
        <Card className="p-4 border-l-4 border-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Absent</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.absent} Day{stats.absent !== 1 ? 's' : ''}</h3>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Date', 'Status', 'Check-in Time']}>
            {attendance.map((record) => (
              <TableRow key={record._id}>
                <TableCell className="font-medium text-slate-900">
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={
                    record.status === 'Present' ? 'success' : 
                    record.status === 'Absent' ? 'danger' : 'warning'
                  }>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={14} />
                    <span>{record.checkInTime || '-'}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};