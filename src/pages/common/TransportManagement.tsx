import React, { useState, useEffect } from 'react';
import { Bus, Plus, Search, MapPin, User, Phone, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';

export const TransportManagement = () => {
  const { user } = useAuthStore();
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.role === 'schooladmin';

  useEffect(() => {
    // Mock data for transport routes
    setTimeout(() => {
      setRoutes([
        { 
          id: '1', 
          routeName: 'Route A - North City', 
          busNumber: 'BUS-101', 
          driver: 'Robert Wilson', 
          phone: '+1 234-567-8901',
          capacity: '40/50',
          status: 'Active'
        },
        { 
          id: '2', 
          routeName: 'Route B - East Side', 
          busNumber: 'BUS-102', 
          driver: 'Michael Smith', 
          phone: '+1 234-567-8902',
          capacity: '32/50',
          status: 'Active'
        },
        { 
          id: '3', 
          routeName: 'Route C - South Park', 
          busNumber: 'BUS-103', 
          driver: 'David Brown', 
          phone: '+1 234-567-8903',
          capacity: '48/50',
          status: 'Maintenance'
        },
        { 
          id: '4', 
          routeName: 'Route D - West Hills', 
          busNumber: 'BUS-104', 
          driver: 'James Davis', 
          phone: '+1 234-567-8904',
          capacity: '25/50',
          status: 'Active'
        },
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport Management</h1>
          <p className="text-slate-500">Manage school bus routes, drivers and student transportation.</p>
        </div>
        {isAdmin && (
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Add New Route
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-indigo-600 text-white">
          <p className="text-indigo-100 text-sm font-medium">Active Routes</p>
          <h3 className="text-3xl font-bold mt-1">15</h3>
          <p className="text-indigo-200 text-xs mt-2">Covering entire city</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Total Students</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">450</h3>
          <p className="text-slate-400 text-xs mt-2">Using school transport</p>
        </Card>
        <Card className="p-6">
          <p className="text-slate-500 text-sm font-medium">Buses in Fleet</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">18</h3>
          <p className="text-emerald-600 text-xs mt-2 flex items-center gap-1">
            <CheckCircle size={12} /> 16 Operational
          </p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search routes or drivers..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Route Name', 'Bus Info', 'Driver Details', 'Capacity', 'Status', 'Actions']}>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <span className="font-medium text-slate-900">{route.routeName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Bus size={14} className="text-slate-400" />
                    <span>{route.busNumber}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <User size={14} className="text-slate-400" />
                      <span>{route.driver}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} className="text-slate-400" />
                      <span>{route.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} className="text-slate-400" />
                    <span>{route.capacity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={route.status === 'Active' ? 'success' : 'warning'}>
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600 gap-1">
                    <ChevronRight size={14} />
                    View Stops
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
