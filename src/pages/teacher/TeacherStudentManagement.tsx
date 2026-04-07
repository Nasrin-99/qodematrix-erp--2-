import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from "../../store/authStore";
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableRow, TableCell } from '../../components/ui/Table';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { RoutineDialog } from "../common/RoutineDialog";
import { studentService, teacherService } from '../../api/services';
import { useParams, useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;


export const TeacherStudentManagement = () => {

  const { id: selectedClassId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);
  const [classData, setClassData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  // ✅ ATTENDANCE
  const [showAttendance, setShowAttendance] = useState(false);
  const [attendance, setAttendance] = useState<any>({});

  // ================= FETCH =================
  useEffect(() => {
    fetchStudents();
    fetchClassDetails();
  }, [selectedClassId]);

  const fetchStudents = async () => {
    const res = await studentService.getByClass(selectedClassId!);
    setStudents(res || []);
    setIsLoading(false);
  };

  const fetchClassDetails = async () => {
    const res = await teacherService.getMyClasses();
    const found = res.find(
      (cls: any) => cls._id?.toString() === selectedClassId
    );
    setClassData(found);
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    await studentService.delete(id);
    fetchStudents();
  };

  // ================= ATTENDANCE =================
  const handleAttendanceChange = (id: string, status: string) => {
    setAttendance({
      ...attendance,
      [id]: status
    });
  };

  const handleSubmitAttendance = async () => {
    try {
      console.log("📤 ATTENDANCE:", attendance);

      // 🔥 convert object → array format (backend ke liye)
      const records = Object.keys(attendance).map((studentId) => ({
        studentId,
        status: attendance[studentId]
      }));

      console.log("🔥 RECORDS:", records);

     const res = await fetch(`${API_URL}/attendance/student`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          classId: selectedClassId,
          subject: "General", // change if needed
          time: "09:00-10:00", // slot
          records
        })
      });

      const data = await res.json();

      console.log("✅ RESPONSE:", data);

      alert("Attendance Saved ✅");

      setShowAttendance(false);

    } catch (err) {
      console.log("❌ ERROR:", err);
      alert("Error saving attendance ❌");
    }
  };

  
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-sm">

        <span
          onClick={() => navigate("/teacher/classes")}
          className="cursor-pointer text-indigo-600 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Classes
        </span>

        <span>/</span>

        <span>
          Grade {classData?.name}-{classData?.section}
        </span>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <Button onClick={() => setShowAttendance(true)}>
          Attendance
        </Button>

        <RoutineDialog classData={classData} />

        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Student
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table headers={['Student', 'Class', 'Parent', 'Phone', 'Action']}>

            {students.map((s) => (
              <TableRow key={s._id}>

                <TableCell>{s.name}</TableCell>
                <TableCell>{s.classId?.name}-{s.classId?.section}</TableCell>
                <TableCell>{s.parentName}</TableCell>
                <TableCell>{s.phone}</TableCell>

                <TableCell>
                  <Button onClick={() => handleDelete(s._id)}>
                    <Trash2 size={14} />
                  </Button>
                </TableCell>

              </TableRow>
            ))}

          </Table>
        )}
      </Card>

      {/* ================= ATTENDANCE MODAL ================= */}
      {showAttendance && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[750px] rounded-2xl overflow-hidden shadow-xl">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Mark Attendance</h2>
                <p className="text-sm opacity-90">
                  Grade {classData?.name}-{classData?.section} • {new Date().toDateString()}
                </p>
              </div>

              <button
                onClick={() => setShowAttendance(false)}
                className="text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="grid grid-cols-4 text-sm font-semibold text-gray-600">
                <span>STUDENT NAME</span>
                <span className="text-center">PRESENT</span>
                <span className="text-center">ABSENT</span>
                <span className="text-center">LATE</span>
              </div>
            </div>

            {/* STUDENTS */}
            <div className="px-6 py-4 space-y-3 max-h-[300px] overflow-y-auto">

              {students.map((s) => (
                <div
                  key={s._id}
                  className="grid grid-cols-4 items-center bg-white border rounded-xl px-4 py-3"
                >

                  {/* NAME */}
                  <span className="font-medium">{s.name}</span>

                  {/* PRESENT */}
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      name={s._id}
                      checked={attendance[s._id] === "present"}
                      onChange={() => handleAttendanceChange(s._id, "present")}
                      className="h-5 w-5 accent-green-500"
                    />
                  </div>

                  {/* ABSENT */}
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      name={s._id}
                      checked={attendance[s._id] === "absent"}
                      onChange={() => handleAttendanceChange(s._id, "absent")}
                      className="h-5 w-5 accent-red-500"
                    />
                  </div>

                  {/* LATE */}
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      name={s._id}
                      checked={attendance[s._id] === "late"}
                      onChange={() => handleAttendanceChange(s._id, "late")}
                      className="h-5 w-5 accent-yellow-500"
                    />
                  </div>

                </div>
              ))}

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">

              <button className="text-sm text-gray-500">
                📩 Auto-notify parents of absentees
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAttendance(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitAttendance}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Submit Register
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}