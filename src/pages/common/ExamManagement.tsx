import React, { useState, useEffect } from "react";
import axios from "axios";
import {
FileSpreadsheet,
Plus,
Search,
Calendar,
Clock,
MapPin,
Award,
ChevronRight,
} from "lucide-react";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableRow, TableCell } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/loadingSpinner";
import { useAuthStore } from "../../store/authStore";

export const ExamManagement = () => {
const { user } = useAuthStore();

const [exams, setExams] = useState<any[]>([]);
const [filtered, setFiltered] = useState<any[]>([]);
const [search, setSearch] = useState("");

const [loading, setLoading] = useState(true);

const API = import.meta.env.VITE_API_URL + "/exams";

const isAdmin =
user?.role === "superadmin" ||
user?.role === "schooladmin" ||
user?.role === "teacher";

// ===============================
// FETCH EXAMS
// ===============================
const fetchExams = async () => {
try {
const res = await axios.get(API, {
headers: {
Authorization: `Bearer ${localStorage.getItem("token")}`,
},
});


  setExams(res.data);
  setFiltered(res.data);
} catch (err) {
  console.error("Fetch exams error", err);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchExams();
}, []);

// ===============================
// SEARCH FILTER
// ===============================
useEffect(() => {
const result = exams.filter((e) =>
e.title.toLowerCase().includes(search.toLowerCase())
);
setFiltered(result);
}, [search, exams]);

return ( <div className="space-y-6">


  {/* HEADER */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Exam Management
      </h1>
      <p className="text-slate-500">
        Manage exams and results
      </p>
    </div>

    {isAdmin && (
      <Button size="sm" className="gap-2">
        <Plus size={16} /> Schedule Exam
      </Button>
    )}
  </div>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <Card className="p-4 border-l-4 border-indigo-500">
      <p className="text-xs text-slate-500">Upcoming</p>
      <h3 className="text-2xl font-bold">
        {exams.filter(e => e.status === "Upcoming").length}
      </h3>
    </Card>

    <Card className="p-4 border-l-4 border-emerald-500">
      <p className="text-xs text-slate-500">Completed</p>
      <h3 className="text-2xl font-bold">
        {exams.filter(e => e.status === "Completed").length}
      </h3>
    </Card>

    <Card className="p-4 border-l-4 border-amber-500">
      <p className="text-xs text-slate-500">Total Exams</p>
      <h3 className="text-2xl font-bold">
        {exams.length}
      </h3>
    </Card>

  </div>

  {/* TABLE */}
  <Card className="p-0 overflow-hidden">

    {/* SEARCH */}
    <div className="p-4 border-b flex gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder="Search exams..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    {loading ? (
      <LoadingSpinner />
    ) : (
      <Table headers={["Title", "Class", "Date", "Room", "Status", "Action"]}>
        {filtered.map((exam) => (
          <TableRow key={exam._id}>
            <TableCell>{exam.title}</TableCell>
            <TableCell>{exam.className}</TableCell>

            <TableCell>
              <div className="text-xs space-y-1">
                <div className="flex gap-1 items-center">
                  <Calendar size={12} /> {exam.date}
                </div>
                <div className="flex gap-1 items-center text-slate-400">
                  <Clock size={12} /> {exam.time}
                </div>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex gap-1 items-center">
                <MapPin size={14} /> {exam.room}
              </div>
            </TableCell>

            <TableCell>
              <Badge
                variant={
                  exam.status === "Upcoming"
                    ? "info"
                    : "success"
                }
              >
                {exam.status}
              </Badge>
            </TableCell>

            <TableCell>
              <Button size="sm" variant="ghost">
                {exam.status === "Completed" ? (
                  <>
                    <Award size={14} /> Result
                  </>
                ) : (
                  <>
                    <ChevronRight size={14} /> View
                  </>
                )}
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
