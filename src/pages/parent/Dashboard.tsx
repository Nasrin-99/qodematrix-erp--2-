import React from 'react';
import { GraduationCap, Award, Calendar, Bell, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const ParentDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Parent Dashboard</h1>
        <p className="text-slate-500">Welcome back! Monitor your child's progress and school activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overall Grade</p>
              <h3 className="text-2xl font-bold text-slate-900">A- (3.8)</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance</p>
              <h3 className="text-2xl font-bold text-slate-900">94%</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Bell size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">New Notices</p>
              <h3 className="text-2xl font-bold text-slate-900">3</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Grades">
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', score: '92/100', grade: 'A', date: 'Feb 25, 2024' },
              { subject: 'English', score: '85/100', grade: 'B+', date: 'Feb 22, 2024' },
              { subject: 'Science', score: '88/100', grade: 'A-', date: 'Feb 20, 2024' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">{item.grade}</p>
                  <p className="text-[10px] text-slate-400">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-4">
            {[
              { title: 'Parent-Teacher Meeting', date: 'March 10, 2024', time: '04:00 PM', type: 'Meeting' },
              { title: 'Annual Sports Day', date: 'March 15, 2024', time: 'All Day', type: 'Event' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.date} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
