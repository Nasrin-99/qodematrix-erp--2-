import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { attendanceService } from '../../api/services';

export const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocking some attendance data for the list
    setTimeout(() => {
      setAttendance([
        { id: '1', name: 'Alex Johnson', class: '10-A', status: 'Present', time: '08:15 AM' },
        { id: '2', name: 'Sarah Miller', class: '10-A', status: 'Absent', time: '-' },
        { id: '3', name: 'James Wilson', class: '10-A', status: 'Late', time: '08:45 AM' },
        { id: '4', name: 'Emily Davis', class: '10-A', status: 'Present', time: '08:10 AM' },
        { id: '5', name: 'Michael Brown', class: '10-A', status: 'Present', time: '08:20 AM' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Module</h1>
          <p className="text-slate-500">Track and manage daily student attendance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">View Reports</Button>
          <Button size="sm">Mark Attendance</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">92%</h3>
        </Card>
        <Card className="p-4 border-l-4 border-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent Today</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">5%</h3>
        </Card>
        <Card className="p-4 border-l-4 border-amber-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Late Arrivals</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">3%</h3>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search student..." 
            />
          </div>
          <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Class 10-A</option>
            <option>Class 9-B</option>
          </select>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Student Name', 'Class', 'Status', 'Check-in Time', 'Actions']}>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium text-slate-900">{record.name}</TableCell>
                <TableCell>{record.class}</TableCell>
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
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
