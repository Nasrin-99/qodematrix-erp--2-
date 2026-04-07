import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GraduationCap, Award, TrendingUp, BookOpen, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const ParentPerformance = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const [stats, setStats] = useState({ gpa: '0.0', rank: 'N/A', subjects: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        // Fetches child's grades from the student routes
        const response = await axios.get('http://localhost:5000/api/students/performance/my-child');
        const { academicRecords, gpa, rank, totalSubjects } = response.data;

        setGrades(academicRecords);
        setStats({ gpa, rank, subjects: totalSubjects });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Child Performance</h1>
        <p className="text-slate-500">Monitor your child's academic progress and grades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overall GPA</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.gpa}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Award size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Class Rank</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.rank}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><BookOpen size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Subjects</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.subjects}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Academic Grades">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Subject', 'Score', 'Grade', 'Teacher Remarks']}>
            {grades.map((record, index) => (
              <TableRow key={record._id || index}>
                <TableCell className="font-medium text-slate-900">{record.subject}</TableCell>
                <TableCell>{record.score}</TableCell>
                <TableCell>
                  <Badge variant="info">{record.grade}</Badge>
                </TableCell>
                <TableCell className="text-slate-500 italic">"{record.remarks || 'No remarks'}"</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};