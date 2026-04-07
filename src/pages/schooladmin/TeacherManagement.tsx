import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { teacherService, classService,assignTeacher  } from '../../api/services';
import { RoutineSelector } from "../schooladmin/RoutineSelector";


export const TeacherManagement = () => {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  // ================= FETCH =================
  const fetchTeachers = async () => {
    const res = await teacherService.getAll();
    console.log("TEACHERS:", res);
    setTeachers(res.data || []);
  };

  const fetchClasses = async () => {
    const res = await classService.getAll();
    setClassList(res || []);
  };

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  // ================= CREATE =================
  const handleCreateTeacher = async () => {
  try {

    console.log("🔥 FINAL ASSIGNMENTS:", assignments);
    const res = await teacherService.create({
      name,
      experience,
      email,
      phone,
      assignments,
      schoolId: localStorage.getItem("schoolId")
    });

    console.log("🔥 SENDING DATA:", res);

    const teacherId = res.data._id;



      console.log("✅ TEACHER CREATED:", teacherId);

    // 🔥 ASSIGN TEACHER TO CLASS ROUTINE
    for (const a of assignments) {
      for (const slot of a.slots) {

         console.log("🔥 ASSIGN CALL:", {
          classId: a.classId,
          day: slot.day,
          time: slot.time,
          subject: slot.subject,
          teacherId
        });


        await assignTeacher({
          classId: a.classId,
          day: slot.day,
          time: slot.time,
          subject: slot.subject, // ✅ VERY IMPORTANT
          teacherId
        });

      }
    }

    alert("Teacher + Assignment Done ✅");

    setShowModal(false);
    setName("");
    setExperience("");
    setEmail("");
    setPhone("");
    setAssignments([]);

    fetchTeachers();

  } catch (err) {
    console.log(err);
    alert("Error ❌");
  }
};
  // ================= CLASS SELECT =================
  const handleClassSelect = (classId: string) => {
    const cls = classList.find((c: any) => c._id === classId);

    console.log("🔥 SELECTED CLASS:", cls);
    setSelectedClass(cls);
    setSelectedSlots([]);
  };

  // ================= ADD CLASS ASSIGNMENT =================
const handleAddClassAssignment = () => {
  if (!selectedClass || selectedSlots.length === 0) return;

  console.log("🔥 SELECTED SLOTS:", selectedSlots);

  setAssignments((prev) => [
    ...prev,
    {
      classId: selectedClass._id,
      name: selectedClass.name,
      section: selectedClass.section,
      slots: selectedSlots
    }
  ]);

  setSelectedSlots([]);
};

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("Delete teacher?")) return;
    await teacherService.delete(id);
    fetchTeachers();
  };

  // ================= UI =================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Staff Faculty</h2>
          <p className="text-sm text-slate-500">Manage teachers</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      {/* CARD GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {teachers.map((t) => (
          <div key={t._id} className="bg-white p-6 rounded-xl shadow border relative">

            {/* DELETE */}
            <button
              onClick={() => handleDelete(t._id)}
              className="absolute top-3 right-3 text-red-400"
            >
              <Trash2 size={16} />
            </button>

            {/* AVATAR */}
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
              {t.name?.charAt(0)}
            </div>

            {/* NAME */}
            <h3 className="text-center font-bold mt-3">{t.name}</h3>

            {/* EXPERIENCE */}
            <div className="text-center text-sm mt-2 text-slate-500">
              {t.experience}
            </div>

            {/* CONTACT */}
            <div className="mt-3 text-center text-xs">
              <p>{t.email}</p>
              <p>{t.phone}</p>
            </div>

            {/* ASSIGNMENTS */}
            <div className="mt-4 text-xs text-slate-600">
              {t.assignments?.map((a: any, i: number) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-indigo-600">
                    {a.name}-{a.section}
                  </p>

                  {a.slots?.map((s: any, j: number) => (
                    <p key={j}>
                      {s.day} {s.time} → {s.subject}
                    </p>
                  ))}
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[500px] space-y-4">

            <h2 className="font-bold text-lg">Add Teacher</h2>

            {/* BASIC INPUT */}
            <input
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* CLASS SELECT */}
            <select
              className="border p-2 w-full"
              onChange={(e) => handleClassSelect(e.target.value)}
            >
              <option>Select Class</option>
              {classList.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}-{c.section}
                </option>
              ))}
            </select>

            {/* ROUTINE SELECTOR */}
            {selectedClass && (
              <RoutineSelector
                routine={selectedClass.routine}
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
              />
            )}

            {/* ADD CLASS */}
            <button
              onClick={handleAddClassAssignment}
              className="text-indigo-600 text-sm"
            >
              + Add Class Assignment
            </button>

            {/* SHOW ADDED */}
            {assignments.map((a, i) => (
              <div key={i} className="bg-gray-100 p-2 rounded text-xs">
                {a.name}-{a.section} ({a.slots.length} slots)
              </div>
            ))}

            {/* ACTION */}
            <div className="flex gap-2">
              <button
                onClick={handleCreateTeacher}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};