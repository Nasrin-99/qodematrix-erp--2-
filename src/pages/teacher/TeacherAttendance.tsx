import React, { useState, useEffect } from 'react';
import { Calendar, Search, CheckCircle2, XCircle, Clock, Save } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const TeacherAttendance = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('10-A');

  useEffect(() => {
    // Mock data for students in a specific class for attendance marking
    setTimeout(() => {
      setStudents([
        { id: '1', name: 'Alex Johnson', status: 'Present' },
        { id: '2', name: 'Sarah Miller', status: 'Absent' },
        { id: '3', name: 'James Wilson', status: 'Present' },
        { id: '4', name: 'Emily Davis', status: 'Present' },
        { id: '5', name: 'Michael Brown', status: 'Late' },
        { id: '6', name: 'Jessica Taylor', status: 'Present' },
        { id: '7', name: 'David Lee', status: 'Present' },
      ]);
      setIsLoading(false);
    }, 800);
  }, [selectedClass]);

  const handleStatusChange = (id: string, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mark Attendance</h1>
          <p className="text-slate-500">Record daily attendance for your assigned classes.</p>
        </div>
        <Button className="gap-2">
          <Save size={18} /> Save Attendance
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="10-A">Class 10-A (Mathematics)</option>
            <option value="12-B">Class 12-B (Physics)</option>
            <option value="9-C">Class 9-C (Mathematics)</option>
          </select>
          <div className="h-10 px-4 rounded-lg bg-slate-100 flex items-center gap-2 text-sm font-medium text-slate-600">
            <Calendar size={16} /> {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="success" className="px-3 py-1">Present: {students.filter(s => s.status === 'Present').length}</Badge>
          <Badge variant="danger" className="px-3 py-1">Absent: {students.filter(s => s.status === 'Absent').length}</Badge>
          <Badge variant="warning" className="px-3 py-1">Late: {students.filter(s => s.status === 'Late').length}</Badge>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Student Name', 'Status', 'Actions']}>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                <TableCell>
                  <Badge variant={
                    student.status === 'Present' ? 'success' : 
                    student.status === 'Absent' ? 'danger' : 'warning'
                  }>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={student.status === 'Present' ? 'default' : 'outline'} 
                      size="sm" 
                      className={student.status === 'Present' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'}
                      onClick={() => handleStatusChange(student.id, 'Present')}
                    >
                      Present
                    </Button>
                    <Button 
                      variant={student.status === 'Absent' ? 'default' : 'outline'} 
                      size="sm" 
                      className={student.status === 'Absent' ? 'bg-red-600 hover:bg-red-700' : 'text-red-600 border-red-200 hover:bg-red-50'}
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                    >
                      Absent
                    </Button>
                    <Button 
                      variant={student.status === 'Late' ? 'default' : 'outline'} 
                      size="sm" 
                      className={student.status === 'Late' ? 'bg-amber-600 hover:bg-amber-700' : 'text-amber-600 border-amber-200 hover:bg-amber-50'}
                      onClick={() => handleStatusChange(student.id, 'Late')}
                    >
                      Late
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
