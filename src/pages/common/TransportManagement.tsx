import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Bus, Plus, Search, MapPin, User, Phone, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;


export const TransportManagement = () => {
  const { user } = useAuthStore();
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = user?.role === 'schooladmin';

  useEffect(() => {
    fetchTransportRoutes();
  }, []);

  const fetchTransportRoutes = async () => {
    setIsLoading(true);
    try {
      // Connecting to your backend dashboard or a specific transport endpoint
      const response = await axios.get(
        `${API_URL}/schools/transport/${user?.schoolId}`
      );
      setRoutes(response.data.data);
    } catch (error) {
      console.error("Error fetching transport data:", error);
      // Fallback to empty or mock if backend isn't ready
      setRoutes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter routes based on search input
  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header section remains the same */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport Management</h1>
          <p className="text-slate-500">Manage school bus routes and drivers.</p>
        </div>
        {isAdmin && (
          <Button size="sm" className="gap-2">
            <Plus size={16} /> Add New Route
          </Button>
        )}
      </div>

      {/* Stats Cards - These could also be fetched from /api/dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ... Stats cards ... */}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Search routes or drivers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Route Name', 'Bus Info', 'Driver Details', 'Capacity', 'Status', 'Actions']}>
            {filteredRoutes.map((route) => (
              <TableRow key={route.id || route._id}>
                {/* Table Cells remain the same, just using dynamic data */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-indigo-600" />
                    <span className="font-medium text-slate-900">{route.routeName}</span>
                  </div>
                </TableCell>
                <TableCell>{route.busNumber}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{route.driver}</div>
                  <div className="text-xs text-slate-500">{route.phone}</div>
                </TableCell>
                <TableCell>{route.capacity}</TableCell>
                <TableCell>
                  <Badge variant={route.status === 'Active' ? 'success' : 'warning'}>
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-indigo-600">View Stops</Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};