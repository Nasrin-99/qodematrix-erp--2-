import React, { useEffect, useState } from "react";
import { Send, UserCheck } from "lucide-react";
import { teacherService } from "../../api/services";
import API from "../../api/services"; // 🔥 IMPORTANT
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export const AttendanceManagement = () => {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");



  const fetchHistory = async () => {
    try {
      const res = await API.get("/attendance/teacher");

      console.log("📦 HISTORY:", res.data);

      setHistory(res.data.data || []);

    } catch (err) {
      console.log(err);
    }
  };


  // ===============================
  // 🔥 FETCH TEACHERS
  // ===============================
  useEffect(() => {
    fetchTeachers();
    fetchHistory();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await teacherService.getAll();

      console.log("📦 TEACHERS:", res);

      setTeachers(res.data || []);

      // 🔥 default all present
      const defaultData: any = {};
      res.data?.forEach((t: any) => {
        defaultData[t._id] = "present";
      });

      setAttendance(defaultData);

    } catch (err) {
      console.log("❌ ERROR:", err);
    }
  };

  // ===============================
  // 🔥 SET ALL PRESENT
  // ===============================
  const setAllPresent = () => {
    const data: any = {};
    teachers.forEach((t) => (data[t._id] = "present"));
    setAttendance(data);
  };

  // ===============================
  // 🔥 CHANGE STATUS
  // ===============================
  const handleChange = (id: string, status: string) => {
    setAttendance({ ...attendance, [id]: status });
  };

  // ===============================
  // 🔥 SUBMIT (MAIN LOGIC 🚀)
  // ===============================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const records = Object.keys(attendance).map((teacherId) => ({
        teacherId,
        status: attendance[teacherId].toLowerCase(), // 🔥 important
      }));

      console.log("📤 SEND DATA:", records);

      await API.post("/attendance/teacher", {
        records,
      });

      alert("Attendance Submitted ✅");

    } catch (err: any) {
      console.log("❌ SUBMIT ERROR:", err);
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/attendance/teacher/${editingId}`, {
        status: editStatus.toLowerCase()
      });

      alert("Updated ✅");

      setEditingId(null);
      fetchHistory(); // refresh

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <UserCheck className="text-indigo-600" />
            Staff Attendance Register
          </h1>
          <p className="text-slate-500 text-sm">
            Mark daily attendance for all teaching faculty.
          </p>
        </div>

        <div className="bg-slate-100 border border-slate-200 px-4 py-1 rounded-lg text-sm font-medium">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* CARD */}
      <Card className="p-0 overflow-hidden rounded-xl shadow-sm border border-slate-200">

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b">
          <h3 className="font-semibold text-slate-700">Faculty List</h3>

          <button
            onClick={setAllPresent}
            className="text-indigo-600 text-sm font-semibold hover:underline"
          >
            Set All Present
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Teacher Name</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {teachers.map((t, index) => (
              <tr key={t._id} className="hover:bg-slate-50 transition">

                {/* NAME */}
                <td className="px-6 py-4 font-medium text-slate-800">
                  {t.name}
                </td>

                {/* ID */}
                <td className="px-6 py-4 text-slate-500 text-xs">
                  T{String(index + 1).padStart(3, "0")}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-8">

                    {/* PRESENT */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`att-${t._id}`}
                        className="accent-green-600"
                        checked={attendance[t._id] === "present"}
                        onChange={() => handleChange(t._id, "present")}
                      />
                      <span className="text-green-700 font-medium">
                        Present
                      </span>
                    </label>

                    {/* ABSENT */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`att-${t._id}`}
                        className="accent-red-600"
                        checked={attendance[t._id] === "absent"}
                        onChange={() => handleChange(t._id, "absent")}
                      />
                      <span className="text-red-600 font-medium">
                        Absent
                      </span>
                    </label>

                    {/* LATE */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`att-${t._id}`}
                        className="accent-yellow-500"
                        checked={attendance[t._id] === "late"}
                        onChange={() => handleChange(t._id, "late")}
                      />
                      <span className="text-yellow-600 font-medium">
                        Late
                      </span>
                    </label>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end border-t bg-slate-50">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-md"
          >
            <Send size={14} />
            {loading ? "Submitting..." : "Submit Register"}
          </Button>
        </div>

      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Today's Attendance</h3>

        {history.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-2 text-sm"
          >

            {/* NAME + DATE */}
            <div>
              <p className="font-medium">{item.teacherId?.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>

            {/* STATUS */}
            {editingId === item._id ? (
              <div className="flex gap-2">

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>

                <button
                  onClick={handleUpdate}
                  className="text-green-600 text-xs"
                >
                  Save
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                <span className="capitalize">{item.status}</span>

                {/* 🔥 EDIT BUTTON */}
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setEditStatus(item.status);
                  }}
                  className="text-indigo-600 text-xs"
                >
                  Edit
                </button>

              </div>
            )}

          </div>
        ))}
      </Card>

    </div>
  );
};