import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Plus, Search, Calendar, Clock, MapPin, Award, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';

export const ExamManagement = () => {
  const { user } = useAuthStore();
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.role === 'superadmin' || user?.role === 'schooladmin' || user?.role === 'teacher';

  useEffect(() => {
    // Mock data for exams
    setTimeout(() => {
      setExams([
        { 
          id: '1', 
          title: 'Mathematics Mid-term', 
          class: '10-A', 
          date: '2024-03-20', 
          time: '09:00 AM - 12:00 PM',
          room: 'Hall A',
          status: 'Upcoming'
        },
        { 
          id: '2', 
          title: 'Physics Practical', 
          class: '12-B', 
          date: '2024-03-22', 
          time: '10:30 AM - 01:30 PM',
          room: 'Lab 1',
          status: 'Upcoming'
        },
        { 
          id: '3', 
          title: 'English Literature', 
          class: '9-C', 
          date: '2024-02-15', 
          time: '09:00 AM - 12:00 PM',
          room: 'Room 302',
          status: 'Completed'
        },
        { 
          id: '4', 
          title: 'History Quiz', 
          class: '8-A', 
          date: '2024-02-10', 
          time: '02:00 PM - 03:00 PM',
          room: 'Room 204',
          status: 'Completed'
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exam Management</h1>
          <p className="text-slate-500">Schedule exams, manage results and track academic performance.</p>
        </div>
        {isAdmin && (
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Schedule Exam
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Exams</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
        </Card>
        <Card className="p-4 border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Results Published</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">45</h3>
        </Card>
        <Card className="p-4 border-l-4 border-amber-500">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Performance</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">78%</h3>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search exams..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Exam Title', 'Class', 'Date & Time', 'Room', 'Status', 'Actions']}>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileSpreadsheet size={20} />
                    </div>
                    <span className="font-medium text-slate-900">{exam.title}</span>
                  </div>
                </TableCell>
                <TableCell>{exam.class}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Calendar size={12} />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={12} />
                      <span>{exam.time}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={14} />
                    <span>{exam.room}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={exam.status === 'Upcoming' ? 'info' : 'success'}>
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600 gap-1">
                    {exam.status === 'Completed' ? (
                      <>
                        <Award size={14} />
                        View Results
                      </>
                    ) : (
                      <>
                        <ChevronRight size={14} />
                        Details
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
