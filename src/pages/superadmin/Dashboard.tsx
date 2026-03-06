import React from 'react';
import { 
  School, 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, schools: 24 },
  { name: 'Feb', revenue: 3000, schools: 28 },
  { name: 'Mar', revenue: 2000, schools: 32 },
  { name: 'Apr', revenue: 2780, schools: 35 },
  { name: 'May', revenue: 1890, schools: 40 },
  { name: 'Jun', revenue: 2390, schools: 45 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        <div className="flex items-center mt-2">
          {trend === 'up' ? (
            <span className="flex items-center text-emerald-600 text-xs font-medium">
              <ArrowUpRight size={14} className="mr-1" /> {trendValue}
            </span>
          ) : (
            <span className="flex items-center text-red-600 text-xs font-medium">
              <ArrowDownRight size={14} className="mr-1" /> {trendValue}
            </span>
          )}
          <span className="text-slate-400 text-xs ml-2">vs last month</span>
        </div>
      </div>
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

export const SuperAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500">Welcome to the QodeMatrix control center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Schools" value="124" icon={School} trend="up" trendValue="12%" />
        <StatCard title="Active Subs" value="98" icon={Activity} trend="up" trendValue="8%" />
        <StatCard title="Total Revenue" value="$42,500" icon={CreditCard} trend="up" trendValue="15%" />
        <StatCard title="New Requests" value="12" icon={Users} trend="down" trendValue="3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Growth" subtitle="Monthly subscription revenue overview">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="School Registrations" subtitle="New schools onboarded per month">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="schools" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Recent School Registrations" subtitle="Latest schools added to the platform">
        <Table headers={['School Name', 'Location', 'Plan', 'Status', 'Registered Date']}>
          {[
            { name: 'Greenwood International', loc: 'New York, NY', plan: 'Enterprise', status: 'Active', date: '2024-02-15' },
            { name: 'St. Marys Academy', loc: 'London, UK', plan: 'Basic', status: 'Pending', date: '2024-02-14' },
            { name: 'Oakridge High', loc: 'Toronto, CA', plan: 'Pro', status: 'Active', date: '2024-02-12' },
            { name: 'Global Public School', loc: 'Mumbai, IN', plan: 'Enterprise', status: 'Expired', date: '2024-02-10' },
          ].map((school, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{school.name}</TableCell>
              <TableCell>{school.loc}</TableCell>
              <TableCell>
                <Badge variant="info">{school.plan}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={school.status === 'Active' ? 'success' : school.status === 'Pending' ? 'warning' : 'danger'}>
                  {school.status}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-500">{school.date}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
};
