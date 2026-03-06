import React from 'react';
import { BookOpen, Calendar, Award, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const StudentDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500">Welcome back! Ready for another day of learning?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Today's Classes</p>
              <h3 className="text-2xl font-bold text-slate-900">6</h3>
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
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Grade Point</p>
              <h3 className="text-2xl font-bold text-slate-900">3.8</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="My Timetable">
          <div className="space-y-4">
            {[
              { time: '08:30 AM', subject: 'English Literature', teacher: 'Ms. Sarah Wilson' },
              { time: '10:00 AM', subject: 'Advanced Mathematics', teacher: 'Mr. John Doe' },
              { time: '11:30 AM', subject: 'Chemistry', teacher: 'Dr. Emily Brown' },
              { time: '01:30 PM', subject: 'History', teacher: 'Mr. Robert Smith' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-center h-10 w-24 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
                  <Clock size={14} className="mr-1" /> {item.time}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                  <p className="text-xs text-slate-500">{item.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Pending Homework">
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', title: 'Calculus Exercise 4.2', due: 'Tomorrow', priority: 'High' },
              { subject: 'Physics', title: 'Lab Report: Optics', due: 'In 3 days', priority: 'Medium' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-900">{item.subject}</h4>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>{item.priority} Priority</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{item.title}</p>
                <p className="text-[10px] text-slate-500 mt-1">Due: {item.due}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
