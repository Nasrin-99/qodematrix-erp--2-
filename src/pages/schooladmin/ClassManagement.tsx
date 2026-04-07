import React, { useState, useEffect } from 'react';
import { Plus, Users, Trash2, Edit2 } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Modal } from '../../components/ui/Modal';

import { classService, studentService } from '../../api/services';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";

export const ClassManagement = () => {

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  // 🔥 ROUTINE STATES
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [timeSlots, setTimeSlots] = useState([
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "12:00", end: "01:00" },
  ]);
  const [routine, setRoutine] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);
  const [editClass, setEditClass] = useState<any>(null);
  const [schedule, setSchedule] = useState<
    { time: string; subject: string; class: string }[]
  >([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await classService.getAll(); // classes with routine

      const classes = res?.data || [];

      const today = new Date().toLocaleString("en-US", {
        weekday: "long"
      });

      let todaySchedule: {
        time: string;
        subject: string;
        class: string;
      }[] = [];

      classes.forEach((cls: any) => {
        const dayRoutine = cls.routine?.[today];
        if (dayRoutine) {
          Object.entries(dayRoutine as Record<string, any>).forEach(([time, data]) => {
            if (data?.subject) {
              todaySchedule.push({
                time,
                subject: data.subject,   // 🔥 FIX
                class: `${cls.name}-${cls.section}`
              });
            }
          });
        }
      });

      setSchedule(todaySchedule);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDeleteClass = async (classId: string) => {
    try {
      if (!confirm("Are you sure you want to delete this class?")) return;

      await classService.delete(classId);

      setClasses((prev) => prev.filter((cls) => cls._id !== classId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ================= FETCH STUDENTS (for routine) =================
  const fetchStudents = async () => {
    try {
      const res = await studentService.getAll(); // 👈 ensure this exists
      setStudents(res?.data || res || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH =================
  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await classService.getAll();
      setClasses(res?.data || res || []);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= ROUTINE =================
  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const handleSlotChange = (index: number, field: "start" | "end", value: string) => {
    const updated = [...timeSlots];
    if (!updated[index]) return;

    updated[index] = {
      ...updated[index],
      [field]: value
    };

    setTimeSlots(updated);
  };

  const handleRoutineChange = (day: string, time: string, value: string) => {
    setRoutine((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: {
          subject: value   // 🔥 FIX
        }
      },
    }));
  };

  // ================= CREATE =================
  const handleSaveClass = async () => {
    try {
      if (!className || !section) {
        alert("All fields required ❗");
        return;
      }

      if (editClass) {
        // 🔥 UPDATE
        await classService.update(editClass._id, {
          name: className,
          section,
          routine,
        });
      } else {
        // 🔥 CREATE
        await classService.create({
          name: className,
          section,
          schoolId: (user as any)?.schoolId || (user as any)?._id,
          routine,
        });
      }

      // RESET
      setIsModalOpen(false);
      setClassName("");
      setSection("");
      setRoutine({});
      setTimeSlots([
        { start: "09:00", end: "10:00" }
      ]);
      setEditClass(null);

      fetchClasses();

    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed ❌");
    }
  };
  // ================= EDIT =================
  const handleEditClass = (cls: any) => {
    setEditClass(cls);

    // Prefill inputs
    setClassName(cls.name);
    setSection(cls.section);

    // 🔥 Routine bhi fill karo
    const monday = cls.routine?.Monday || {};

    const slots = Object.keys(monday).map((t) => {
      const parts = t.split(" - ");

      return {
        start: parts[0] || "",
        end: parts[1] || ""
      };
    });

    setTimeSlots(
      slots.length ? slots : [{ start: "09:00", end: "10:00" }]
    );

    setIsModalOpen(true);
  };

  // ================= UI =================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Class Directory</h2>
          <p className="text-slate-500 text-sm">
            Select a class to view student records and attendance.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={16} /> Add Class
        </Button>
      </div>

      {/* SEARCH */}
      <Input placeholder="Search classes..." />

      {/* LOADING */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {classes.map((cls) => {
            const classNameFull = `${cls.name}-${cls.section}`;

            return (
              <div
                key={cls._id}
                onClick={() => navigate(`/schooladmin/students/${cls._id}`)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-xl cursor-pointer transition-all group relative overflow-hidden"
              >

                {/* DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClass(cls._id);
                  }}
                  className="absolute top-3 right-3 z-10 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
                {/* EDIT BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClass(cls);
                  }}
                  className="absolute top-3 right-12 z-10 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Edit2 size={16} />
                </button>

                {/* BG ICON */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10">
                  <Users className="w-24 h-24 text-indigo-600" />
                </div>

                {/* TOP */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Users className="w-6 h-6" />
                  </div>

                  <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    {cls.avgAttendance || 90}% Att.
                  </span>
                </div>

                {/* INFO */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Grade {classNameFull}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {cls.studentCount || 0} Students Enrolled
                  </p>
                </div>

                <div className="mt-4 text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100">
                  View Details →
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Class"
        size="xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveClass}>
              {editClass ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">

          <Input
            placeholder="Class (e.g. 10)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <Input
            placeholder="Section (A/B)"
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
          />

          {/* ROUTINE */}
          <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Class Routine</h3>
              <Button size="sm" onClick={addTimeSlot}>+ Add Time</Button>
            </div>

            <div className="overflow-auto border rounded-xl">

              <table className="min-w-full border-collapse text-sm">

                <thead>
                  <tr>
                    <th>Day</th>

                    {timeSlots.map((slot, index) => (
                      <th key={index}>
                        <div className="flex gap-1 items-center">

                          {/* START */}
                          <input
                            type="time"
                            value={slot.start}
                            onChange={(e) =>
                              handleSlotChange(index, "start", e.target.value)
                            }
                            className="border p-1 rounded"
                          />

                          <span>-</span>

                          {/* END */}
                          <input
                            type="time"
                            value={slot.end}
                            onChange={(e) =>
                              handleSlotChange(index, "end", e.target.value)
                            }
                            className="border p-1 rounded"
                          />

                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td className="p-2 border font-medium">{day}</td>

                      {timeSlots.map((slot, index) => {
                        const formatTime = (t: string) => {
                          const [h, m] = t.split(":");
                          let hour = parseInt(h);
                          if (isNaN(hour)) return "";
                          const ampm = hour >= 12 ? "PM" : "AM";
                          hour = hour % 12 || 12;
                          return `${hour.toString().padStart(2, "0")}:${m} ${ampm}`;
                        };

                        const timeKey = `${formatTime(slot.start)} - ${formatTime(slot.end)}`; // 🔥 yahi fix hai

                        return (
                          <td key={index} className="p-1 border">
                            <Input
                              placeholder="Subject"
                              value={routine?.[day]?.[timeKey]?.subject || ""}
                              onChange={(e) =>
                                handleRoutineChange(day, timeKey, e.target.value)
                              }
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>
      </Modal>

    </div>
  );
};