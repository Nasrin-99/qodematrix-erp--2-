import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Clock, ChevronRight, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const TeacherClasses = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for teacher's assigned classes
    setTimeout(() => {
      setClasses([
        { id: '1', name: 'Mathematics', section: '10-A', students: 32, schedule: 'Mon, Wed, Fri • 09:00 AM' },
        { id: '2', name: 'Physics', section: '12-B', students: 28, schedule: 'Tue, Thu • 11:30 AM' },
        { id: '3', name: 'Mathematics', section: '9-C', students: 35, schedule: 'Mon, Wed • 02:00 PM' },
        { id: '4', name: 'Algebra', section: '8-A', students: 30, schedule: 'Fri • 01:00 PM' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Classes</h1>
          <p className="text-slate-500">Manage your assigned classes, students and course materials.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search classes..." className="pl-10" />
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={20} />
                  </Button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900">{cls.name}</h3>
                <p className="text-sm text-slate-500 mb-4">Section {cls.section}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} className="text-slate-400" />
                    <span>{cls.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="truncate">{cls.schedule}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
