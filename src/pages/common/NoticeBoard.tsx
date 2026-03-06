import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Search, Calendar, Trash2, Edit2, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';
import { noticeService } from '../../api/services';

export const NoticeBoard = () => {
  const { user } = useAuthStore();
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.role === 'superadmin' || user?.role === 'schooladmin';

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getAll();
        setNotices(data);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical': return <AlertTriangle size={16} className="text-red-500" />;
      case 'High': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'Medium': return <Info size={16} className="text-blue-500" />;
      default: return <CheckCircle size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notice Board</h1>
          <p className="text-slate-500">Stay updated with the latest school announcements and events.</p>
        </div>
        {isAdmin && (
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Post Notice
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search notices..." className="pl-10" />
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {notices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {notice.title}
                        {getPriorityIcon(notice.priority)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Calendar size={12} />
                        <span>{notice.date}</span>
                        <span className="mx-1">•</span>
                        <Badge variant="neutral" className="text-[10px] px-1.5 py-0">{notice.category}</Badge>
                      </div>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {notice.content}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
