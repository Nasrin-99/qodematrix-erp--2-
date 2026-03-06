import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Calendar, FileText, CheckCircle2, Clock, Trash2, Edit2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const TeacherHomework = () => {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for homework assignments
    setTimeout(() => {
      setHomeworks([
        { id: '1', title: 'Calculus Exercise 4.2', class: '10-A', subject: 'Mathematics', dueDate: '2024-03-05', submissions: '28/32', status: 'Active' },
        { id: '2', title: 'Lab Report: Optics', class: '12-B', subject: 'Physics', dueDate: '2024-03-08', submissions: '15/28', status: 'Active' },
        { id: '3', title: 'Algebra Quiz Preparation', class: '9-C', subject: 'Mathematics', dueDate: '2024-03-02', submissions: '35/35', status: 'Completed' },
        { id: '4', title: 'Geometry Proofs', class: '10-A', subject: 'Mathematics', dueDate: '2024-03-12', submissions: '0/32', status: 'Draft' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Homework Assignments</h1>
          <p className="text-slate-500">Create and manage homework for your classes.</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} /> Create Assignment
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search assignments..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Assignment Title', 'Class', 'Due Date', 'Submissions', 'Status', 'Actions']}>
            {homeworks.map((hw) => (
              <TableRow key={hw.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <span className="font-medium text-slate-900">{hw.title}</span>
                  </div>
                </TableCell>
                <TableCell>{hw.class}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    <span>{hw.dueDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-500">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>{hw.submissions}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    hw.status === 'Active' ? 'info' : 
                    hw.status === 'Completed' ? 'success' : 'neutral'
                  }>
                    {hw.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 size={16} />
                    </Button>
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
