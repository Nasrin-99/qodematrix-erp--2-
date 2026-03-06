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

import { attendanceService, feeService, noticeService } from '../../api/services';

export const SchoolAdminDashboard = () => {
  const [attendance, setAttendance] = useState<any>(null);
  const [fees, setFees] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    attendanceService.getStats().then(setAttendance);
    feeService.getStats().then(setFees);
    noticeService.getAll().then(setNotices);
  }, []);
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Dashboard</h1>
          <p className="text-slate-500">Overview of Greenwood International School</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} /> Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-900">1,240</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Teachers</p>
              <h3 className="text-2xl font-bold text-slate-900">86</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance Today</p>
              <h3 className="text-2xl font-bold text-slate-900">{attendance?.today || '...'}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Fee Collection</p>
              <h3 className="text-2xl font-bold text-slate-900">${fees?.totalCollected || '...'}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Recent Student Admissions">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
          <Table headers={['Student Name', 'Class', 'Admission ID', 'Status']}>
            {[
              { name: 'Alex Johnson', class: '10-A', id: 'ADM-2024-001', status: 'Active' },
              { name: 'Sarah Miller', class: '8-B', id: 'ADM-2024-002', status: 'Active' },
              { name: 'James Wilson', class: '12-C', id: 'ADM-2024-003', status: 'Pending' },
              { name: 'Emily Davis', class: '9-A', id: 'ADM-2024-004', status: 'Active' },
            ].map((s, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.class}</TableCell>
                <TableCell className="text-slate-500">{s.id}</TableCell>
                <TableCell>
                  <Badge variant={s.status === 'Active' ? 'success' : 'warning'}>{s.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-4">
            {notices.map((notice, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <span className="text-xs font-bold uppercase">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(notice.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{notice.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Event</p>
                </div>
              </div>
            ))}
            {notices.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No upcoming events</p>}
            <Button variant="ghost" className="w-full text-xs text-indigo-600">View All Events</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
