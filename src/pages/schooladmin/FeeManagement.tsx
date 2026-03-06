import React, { useState, useEffect } from 'react';
import { CreditCard, Search, Download, Filter, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const FeeManagement = () => {
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFees([
        { id: '1', name: 'Alex Johnson', class: '10-A', amount: 1200, status: 'Paid', date: '2024-02-10' },
        { id: '2', name: 'Sarah Miller', class: '10-A', amount: 1200, status: 'Pending', date: '-' },
        { id: '3', name: 'James Wilson', class: '10-A', amount: 1200, status: 'Overdue', date: '-' },
        { id: '4', name: 'Emily Davis', class: '10-A', amount: 1200, status: 'Paid', date: '2024-02-12' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fees Management</h1>
          <p className="text-slate-500">Manage student fee payments and invoices.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={16} /> Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-indigo-600 text-white">
          <p className="text-indigo-100 text-sm font-medium">Total Collected</p>
          <h3 className="text-3xl font-bold mt-1">$45,200</h3>
          <p className="text-indigo-200 text-xs mt-2">This month</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Pending Payments</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">$12,800</h3>
          <p className="text-amber-600 text-xs mt-2">14 students pending</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Overdue Amount</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">$3,400</h3>
          <p className="text-red-600 text-xs mt-2">High priority</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by student name..." 
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Student Name', 'Class', 'Amount', 'Status', 'Payment Date', 'Actions']}>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium text-slate-900">{fee.name}</TableCell>
                <TableCell>{fee.class}</TableCell>
                <TableCell className="font-semibold">${fee.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    fee.status === 'Paid' ? 'success' : 
                    fee.status === 'Overdue' ? 'danger' : 'warning'
                  }>
                    {fee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">{fee.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};

import { Plus } from 'lucide-react';
