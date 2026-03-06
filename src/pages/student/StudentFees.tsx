import React, { useState, useEffect } from 'react';
import { CreditCard, Download, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const StudentFees = () => {
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocking some fee data for the student
    setTimeout(() => {
      setFees([
        { id: '1', title: 'Tuition Fee - Feb 2024', amount: 1200, status: 'Paid', date: '2024-02-10' },
        { id: '2', title: 'Library Fee - Q1 2024', amount: 150, status: 'Paid', date: '2024-01-15' },
        { id: '3', title: 'Sports Fee - Annual', amount: 300, status: 'Paid', date: '2024-01-15' },
        { id: '4', title: 'Tuition Fee - Mar 2024', amount: 1200, status: 'Pending', date: '-' },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fee Status</h1>
          <p className="text-slate-500">View and pay your school fees and invoices.</p>
        </div>
        <Button size="sm" className="gap-2">
          <CreditCard size={16} /> Pay Outstanding
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-indigo-600 text-white">
          <p className="text-indigo-100 text-sm font-medium">Total Paid</p>
          <h3 className="text-3xl font-bold mt-1">$1,650</h3>
          <p className="text-indigo-200 text-xs mt-2">This session</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Outstanding</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">$1,200</h3>
          <p className="text-amber-600 text-xs mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> Due in 15 days
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Next Payment</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">$1,200</h3>
          <p className="text-slate-400 text-xs mt-2">March 15, 2024</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Description', 'Amount', 'Status', 'Payment Date', 'Actions']}>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium text-slate-900">{fee.title}</TableCell>
                <TableCell className="font-semibold">${fee.amount}</TableCell>
                <TableCell>
                  <Badge variant={
                    fee.status === 'Paid' ? 'success' : 'warning'
                  }>
                    {fee.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">{fee.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600 gap-2">
                    <Download size={14} /> Receipt
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};
