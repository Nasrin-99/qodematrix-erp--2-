import React from 'react';
import { BookOpen, Calendar, CheckSquare, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const TeacherDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Teacher Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your classes today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">My Classes</p>
              <h3 className="text-2xl font-bold text-slate-900">4</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckSquare size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Homework to Grade</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Upcoming Exams</p>
              <h3 className="text-2xl font-bold text-slate-900">2</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Today's Schedule">
          <div className="space-y-4">
            {[
              { time: '09:00 AM', subject: 'Mathematics', class: 'Class 10-A', room: 'Room 102' },
              { time: '11:30 AM', subject: 'Physics', class: 'Class 12-B', room: 'Lab 2' },
              { time: '02:00 PM', subject: 'Mathematics', class: 'Class 9-C', room: 'Room 204' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-center h-10 w-24 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                  <Clock size={14} className="mr-1" /> {item.time}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                  <p className="text-xs text-slate-500">{item.class} • {item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Announcements">
          <div className="space-y-4">
            {[
              { title: 'Staff Meeting', date: 'Today, 04:00 PM', desc: 'Monthly progress review meeting in the conference hall.' },
              { title: 'Sports Day Registration', date: 'Ends Tomorrow', desc: 'Please encourage students to register for track events.' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                  <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.date}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
