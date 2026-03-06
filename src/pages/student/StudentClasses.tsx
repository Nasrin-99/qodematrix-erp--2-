import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Clock, Search, FileText } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const StudentClasses = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for student's classes
    setTimeout(() => {
      setClasses([
        { id: '1', name: 'English Literature', teacher: 'Ms. Sarah Wilson', room: 'Room 302', schedule: 'Mon, Wed, Fri • 08:30 AM' },
        { id: '2', name: 'Advanced Mathematics', teacher: 'Mr. John Doe', room: 'Room 102', schedule: 'Mon, Wed, Fri • 10:00 AM' },
        { id: '3', name: 'Chemistry', teacher: 'Dr. Emily Brown', room: 'Lab 2', schedule: 'Tue, Thu • 11:30 AM' },
        { id: '4', name: 'History', teacher: 'Mr. Robert Smith', room: 'Room 204', schedule: 'Tue, Thu • 01:30 PM' },
        { id: '5', name: 'Physical Education', teacher: 'Coach Mike', room: 'Gym', schedule: 'Wed • 02:00 PM' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Classes</h1>
          <p className="text-slate-500">View your current class schedule and course details.</p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {cls.room}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900">{cls.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{cls.teacher}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 pt-4 border-t border-slate-100">
                  <Clock size={16} className="text-slate-400" />
                  <span>{cls.schedule}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
