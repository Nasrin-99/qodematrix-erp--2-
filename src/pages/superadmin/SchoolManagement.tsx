import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Power,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

import { schoolService } from '../../api/services';

export const SchoolManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    schoolService.getAll().then(data => {
      setSchools(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Management</h1>
          <p className="text-slate-500">Manage all registered schools and their subscription status.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Start 10-Day Demo
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Register School
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search schools by name or ID..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['School Details', 'Subscription Plan', 'Status', 'Expiry Date', 'Actions']}>
            {schools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900">{school.name}</p>
                        {school.isDemo && (
                          <Badge variant="warning" className="text-[10px] py-0 px-1.5">DEMO</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{school.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={school.isDemo ? "warning" : "info"}>{school.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={school.status === 'Active' ? 'success' : 'neutral'}>
                    {school.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    <span>{school.expiry}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title="Login as Admin">
                      <ExternalLink size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className={school.status === 'Active' ? 'text-red-500' : 'text-emerald-500'}>
                      <Power size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New School"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Create School</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="School Name" placeholder="e.g. Springfield Elementary" />
          <Input label="Location" placeholder="e.g. Springfield, IL" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Subscription Plan</label>
              <select className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Basic Plan</option>
                <option>Pro Plan</option>
                <option>Enterprise Plan</option>
              </select>
            </div>
            <Input label="Admin Email" type="email" placeholder="admin@school.com" />
          </div>
          <Input label="Contact Number" placeholder="e.g. 8199824069" />
        </div>
      </Modal>
    </div>
  );
};
