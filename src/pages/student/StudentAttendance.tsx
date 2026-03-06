import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocking some attendance data for the student
    setTimeout(() => {
      setAttendance([
        { id: '1', date: '2024-02-28', status: 'Present', time: '08:25 AM' },
        { id: '2', date: '2024-02-27', status: 'Present', time: '08:15 AM' },
        { id: '3', date: '2024-02-26', status: 'Late', time: '08:50 AM' },
        { id: '4', date: '2024-02-23', status: 'Present', time: '08:20 AM' },
        { id: '5', date: '2024-02-22', status: 'Absent', time: '-' },
        { id: '6', date: '2024-02-21', status: 'Present', time: '08:10 AM' },
        { id: '7', date: '2024-02-20', status: 'Present', time: '08:22 AM' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
          <p className="text-slate-500">Track your daily attendance records and history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">94%</h3>
        </Card>
        <Card className="p-4 border-l-4 border-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Present</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">18 Days</h3>
        </Card>
        <Card className="p-4 border-l-4 border-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Absent</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">1 Day</h3>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Date', 'Status', 'Check-in Time']}>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium text-slate-900">{record.date}</TableCell>
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
                    <span>{record.time}</span>
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
