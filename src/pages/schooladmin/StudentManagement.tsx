import React, { useState, useEffect } from 'react'; // 👉 React hooks (state + lifecycle)
import {
  Plus,
  Search,
  Edit2, // ❌ unused (use nahi ho raha)
  Trash2,
  Eye, // ❌ unused
  ArrowLeft
} from 'lucide-react'; // 👉 icons UI ke liye

import { useAuthStore } from "../../store/authStore"; // 👉 global auth state (user info)

// 👉 reusable UI components
import { Card } from '../../components/ui/Card'; // 👉 card layout
import { Button } from '../../components/ui/Button'; // 👉 button UI
import { Input } from '../../components/ui/Input'; // 👉 input fields
import { Table, TableRow, TableCell } from '../../components/ui/Table'; // 👉 table UI
import { Badge } from '../../components/ui/Badge'; // 👉 status badge
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'; // 👉 loading UI
import { RoutineDialog } from "../common/RoutineDialog";
// 👉 API services (backend call)
import { studentService } from '../../api/services'; // 👉 student APIs
import { useParams, useNavigate } from "react-router-dom"; // 👉 routing
import { classService } from '../../api/services'; // 👉 class APIs

export const StudentManagement = () => {

  // 👉 URL se class ID le rahe hai (/students/:id)
  const { id: selectedClassId } = useParams(); // 👉 current classId
  const { user } = useAuthStore(); // 👉 logged-in user
  console.log("🌐 URL CLASS ID:", selectedClassId); // 🔥 debug

  // ================= STATE =================
  const [students, setStudents] = useState<any[]>([]); // 👉 students list
  const [classData, setClassData] = useState<any>(null); // 👉 current class info
  const [isLoading, setIsLoading] = useState(true); // 👉 loader control
  const [showModal, setShowModal] = useState(false); // 👉 modal open/close

  // ================= FORM =================
  const [firstName, setFirstName] = useState(""); // 👉 first name input
  const [lastName, setLastName] = useState(""); // 👉 last name input
  const [email, setEmail] = useState(""); // 👉 email input
  const [parentName, setParentName] = useState(""); // 👉 parent name input
  const [phone, setPhone] = useState(""); // 👉 phone input

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      console.log("🔥 FETCH BY CLASS:", selectedClassId); // 👉 debug

      // 👉 backend se sirf is class ke students fetch
      const res = await studentService.getByClass(selectedClassId!);

      console.log("📦 CLASS STUDENTS:", res); // 👉 debug response

      setStudents(res || []); // 👉 state update

    } catch (err) {
      console.log("❌ ERROR:", err); // 👉 error log
    } finally {
      setIsLoading(false); // 👉 loading off
    }
  };

  // ================= FETCH CLASS DETAILS =================
  const fetchClassDetails = async () => {
    try {
      console.log("🔥 FETCH CLASS DETAILS");

      const res = await classService.getAll(); // 👉 sab classes fetch

      console.log("📦 ALL CLASSES:", res); // 👉 debug

      // 👉 selected class find (id match)
      const found = res.find(
        (cls: any) => cls._id?.toString() === selectedClassId
      );

      console.log("✅ FOUND CLASS:", found); // 👉 debug

      setClassData(found); // 👉 set class info

    } catch (err) {
      console.log("❌ CLASS FETCH ERROR:", err);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    console.log("🚀 COMPONENT MOUNTED");

    fetchStudents(); // 👉 students load
    fetchClassDetails(); // 👉 class load
  }, []); // ❌ dependency missing (selectedClassId change pe reload nahi hoga)

  // ================= FILTER =================
  const filteredStudents = selectedClassId
    ? students.filter(
      (s) => {
        console.log("🔍 CHECK STUDENT:", s); // 👉 debug each student
        return s.classId?._id === selectedClassId; // ❌ unnecessary (already backend filtered)
      }
    )
    : students;

  console.log("🎯 FILTERED STUDENTS:", filteredStudents); // 👉 debug

  // ================= CREATE =================
  const handleCreateStudent = async () => {
    try {
      console.log("🔥 CREATE STUDENT CLICK");

      // 👉 ensure class loaded
      if (!classData?._id) {
        console.log("❌ CLASS NOT LOADED:", classData);
        alert("Class not loaded ❌");
        return;
      }

      // 👉 payload send to backend
      const payload = {
        name: firstName + " " + lastName, // 👉 combine name
        email,
        parentName,
        phone,
        classId: selectedClassId, // 👉 main relation
        section: classData?.section, // 👉 class section
        schoolId: user?.schoolId // 👉 school reference
      };

      console.log("👤 USER:", user); // 👉 debug
      console.log("📤 CREATE PAYLOAD:", payload); // 👉 debug

      await studentService.create(payload); // 👉 API call

      alert("Student Created ✅");

      // 👉 reset form
      setShowModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setParentName("");
      setPhone("");

      fetchStudents(); // 👉 refresh list

    } catch (err: any) {
      console.log("❌ CREATE ERROR:", err);
      alert(err.response?.data?.message || "Failed ❌");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    console.log("🗑 DELETE CLICK:", id); // 👉 debug

    if (!confirm("Delete student?")) return; // 👉 confirm dialog

    await studentService.delete(id); // 👉 delete API
    fetchStudents(); // 👉 refresh
  };

  const navigate = useNavigate(); // 👉 navigation hook

  // ================= UI =================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm mb-4">

          {/* 🔙 BACK BUTTON */}
          <span
            onClick={() => navigate("/schooladmin/classes")} // 👉 go back
            className="flex items-center gap-1 text-indigo-600 cursor-pointer hover:underline"
          >
            <ArrowLeft size={16} />
            Classes
          </span>

          <span className="text-slate-400">/</span>

          {/* 👉 current class name */}
          <span className="bg-slate-100 px-2 py-1 rounded-md font-medium text-slate-700">
            Grade {classData?.name}-{classData?.section} {/* 👉 class display */}
          </span>

        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {classData
              ? `Grade ${classData.name}-${classData.section}`
              : "Students"}
          </h1>

          <p className="text-slate-500">
            {selectedClassId
              ? "Manage students, attendance, and fees"
              : "Manage student records"}
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <Button className="bg-green-600 text-white">Attendance</Button> {/* ❌ no action */}
        <RoutineDialog classData={classData} /> {/* 👉 routine modal */}
        <Button variant="outline">Fees</Button> {/* ❌ no action */}

        {/* 👉 modal open */}
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Student
        </Button>
      </div>

      {/* TABLE */}
      <Card className="p-0 overflow-hidden">

        {/* SEARCH */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search students..." className="pl-10" /> {/* ❌ no logic */}
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner /> // 👉 loader
        ) : (
          <Table headers={['Student', 'Class', 'Parent Name', 'Contact', 'Status', 'Actions']}>

            {filteredStudents.map((s) => ( // 👉 loop students
              <TableRow key={s._id}>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      {s.name?.charAt(0)} {/* 👉 avatar initial */}
                    </div>
                    <div>
                      <p>{s.name}</p>
                      <p className="text-xs">{s._id}</p> {/* ❌ raw id show */}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {s.classId?.name}-{s.classId?.section} {/* 👉 class info */}
                </TableCell>

                <TableCell>{s.parentName}</TableCell>
                <TableCell>{s.phone}</TableCell>

                <TableCell>
                  <Badge variant="success">Active</Badge> {/* ❌ static */}
                </TableCell>

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



      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">

            <h2>Add Student ({selectedClassId})</h2> {/* 👉 current class */}

            <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
            <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <Button onClick={handleCreateStudent}>Create</Button>
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};