import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  School,
  Users,
  CreditCard,
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


const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (

  <Card className="p-6">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-sm font-medium text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold text-slate-900 mt-1">
          {value}
        </h3>

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

          <span className="text-slate-400 text-xs ml-2">
            vs last month
          </span>

        </div>

      </div>

      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
        <Icon size={24} />
      </div>

    </div>

  </Card>

);


export const SuperAdminDashboard = () => {

  const [stats, setStats] = useState({
    totalSchools: 0,
    activeSubs: 0,
    totalRevenue: 0,
    newRequests: 0,

    trendSchools: 0,
    trendActive: 0,
    trendRevenue: 0,
    trendRequests: 0
  });

  const [recentSchools, setRecentSchools] = useState([]);

  const [revenueData, setRevenueData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await axios.get(
          "/api/dashboard/superadmin"
        );
        // debug kar ne ke liye
        console.log("DATA:", res.data);

        // ✅ SAFE STATS
        setStats({
          totalSchools: res.data.totalSchools || 0,
          activeSubs: res.data.activeSubs || 0,
          totalRevenue: res.data.totalRevenue || 0,
          newRequests: res.data.newRequests || 0,

          trendSchools: res.data.trendSchools || 0,
          trendActive: res.data.trendActive || 0,
          trendRevenue: res.data.trendRevenue || 0,
          trendRequests: res.data.trendRequests || 0
        });

        // ✅ SAFE recent schools 
        setRecentSchools(res.data.recentSchools || []);

        // simple chart data fallback
        setRevenueData([
          { name: "Jan", revenue: 2000 },
          { name: "Feb", revenue: 3500 },
          { name: "Mar", revenue: 4200 },
          { name: "Apr", revenue: 5200 },
          { name: "May", revenue: 6100 },
          { name: "Jun", revenue: 7200 }
        ]);

        setSchoolData([
          { name: "Jan", schools: 5 },
          { name: "Feb", schools: 8 },
          { name: "Mar", schools: 12 },
          { name: "Apr", schools: 15 },
          { name: "May", schools: 18 },
          { name: "Jun", schools: 20 }
        ]);

      } catch (error) {

        console.log("Dashboard error:", error);

      }

    };

    fetchDashboard();

  }, []);



  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Platform Overview
        </h1>

        <p className="text-slate-500">
          Welcome to the QodeMatrix control center.
        </p>

      </div>



      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Schools"
          value={stats.totalSchools}
          icon={School}
          trend="up"
          trendValue={`${stats.trendSchools}%`}
        />

        <StatCard
          title="Active Subs"
          value={stats.activeSubs}
          icon={Activity}
          trend="up"
          trendValue={`${stats.trendActive}%`}
        />

        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={CreditCard}
          trend="up"
          trendValue={`${stats.trendRevenue}%`}
        />

        <StatCard
          title="New Requests"
          value={stats.newRequests}
          icon={Users}
          trend="down"
          trendValue={`${stats.trendRequests}%`}
        />

      </div>



      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card
          title="Revenue Growth"
          subtitle="Monthly subscription revenue overview"
        >

          <div className="h-[300px] mt-4">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </Card>



        <Card
          title="School Registrations"
          subtitle="New schools onboarded per month"
        >

          <div className="h-[300px] mt-4">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={schoolData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="schools" fill="#4f46e5" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>



      {/* RECENT SCHOOLS TABLE */}

      <Card
        title="Recent School Registrations"
        subtitle="Latest schools added to the platform"
      >

        <Table headers={['School Name', 'Location', 'Plan', 'Status', 'Registered Date']}>

          {(recentSchools || []).map((school: any, i: number) => (

            <TableRow key={i}>

              <TableCell className="font-medium">
                {school.name}
              </TableCell>

              <TableCell>
                {school.address}
              </TableCell>

              <TableCell className="text-slate-500">
                {new Date(school.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>

                <Badge
                  variant={
                    school.status === "Active"
                      ? "success"
                      : school.status === "Pending"
                        ? "warning"
                        : "danger"
                  }
                >

                  {school.status}

                </Badge>

              </TableCell>

              <TableCell className="text-slate-500">
                {new Date(school.registeredDate).toLocaleDateString()}
              </TableCell>

            </TableRow>

          ))}

        </Table>

      </Card>


    </div>

  );

};