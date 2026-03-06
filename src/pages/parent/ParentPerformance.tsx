import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, TrendingUp, BookOpen, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const ParentPerformance = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocking some performance data for the parent's child
    setTimeout(() => {
      setGrades([
        { id: '1', subject: 'Mathematics', score: '92/100', grade: 'A', remarks: 'Excellent progress' },
        { id: '2', subject: 'English', score: '85/100', grade: 'B+', remarks: 'Good participation' },
        { id: '3', subject: 'Science', score: '88/100', grade: 'A-', remarks: 'Very consistent' },
        { id: '4', subject: 'History', score: '78/100', grade: 'B', remarks: 'Needs more focus on dates' },
        { id: '5', subject: 'Art', score: '95/100', grade: 'A+', remarks: 'Highly creative' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Child Performance</h1>
          <p className="text-slate-500">Monitor your child's academic progress and grades.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overall GPA</p>
              <h3 className="text-2xl font-bold text-slate-900">3.8</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Class Rank</p>
              <h3 className="text-2xl font-bold text-slate-900">5th / 32</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Subjects</p>
              <h3 className="text-2xl font-bold text-slate-900">8</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Academic Grades">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Subject', 'Score', 'Grade', 'Teacher Remarks']}>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium text-slate-900">{grade.subject}</TableCell>
                <TableCell>{grade.score}</TableCell>
                <TableCell>
                  <Badge variant="info">{grade.grade}</Badge>
                </TableCell>
                <TableCell className="text-slate-500 italic">"{grade.remarks}"</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
