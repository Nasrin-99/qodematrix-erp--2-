import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { getStudentClasses } from '../../api/services';




// ✅ FIXED SORT
const sortTimes = (times: string[]) => {
  return times.sort((a, b) => {
    const getMinutes = (t: string) => {
      const [h, m] = t.split(" - ")[0].split(":").map(Number);
      return h * 60 + m;
    };
    return getMinutes(a) - getMinutes(b);
  });
};

// ✅ AM PM FORMAT
const formatTime = (timeRange: string) => {
  const [start, end] = timeRange.split(" - ");

  const convert = (time: string) => {
    let [hour, min] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  return `${convert(start)} - ${convert(end)}`;
};

// ===============================
// 🔥 TIMETABLE
// ===============================
const Timetable = ({ routine, teachers }: any) => {

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // ✅ FIXED TEACHER MATCH
  const getTeacherName = (day: string, time: string, subject: string) => {
    for (const teacher of teachers) {
      for (const assign of teacher.assignments || []) {
        for (const slot of assign.slots || []) {

          const dbSubject = slot.subject?.toLowerCase().trim();
          const uiSubject = subject?.toLowerCase().trim();

          if (
            slot.day === day &&
            slot.time === time &&
            dbSubject === uiSubject
          ) {
            return teacher.name;
          }
        }
      }
    }
    return null;
  };

  // ✅ FIXED TIME SORT
  const timeSlots = sortTimes(
    Array.from(
      new Set(
        days.flatMap(day => Object.keys(routine?.[day] || {}))
      )
    )
  );

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border border-gray-300 text-sm">

        {/* HEADER */}
        <thead className="bg-slate-100">
          <tr>
            <th className="border p-2 text-left">Day</th>
            {timeSlots.map((time) => (
              <th key={time} className="border p-2 text-center">
                {time}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="border p-2 font-semibold">{day}</td>

              {timeSlots.map((time) => {
                const slot = routine?.[day]?.[time];

                const subject =
                  typeof slot === "string"
                    ? slot
                    : slot?.subject || "";

                const teacherName = getTeacherName(day, time, subject);

                return (
                  <td key={time} className="border p-2 text-center">

                    {slot ? (
                      <div>

                        {/* SUBJECT */}
                        <div className="font-semibold text-indigo-600">
                          {subject.toUpperCase()}
                        </div>

                        {/* TEACHER */}
                        {teacherName && (
                          <div className="text-xs text-gray-500">
                            ({teacherName})
                          </div>
                        )}

                      </div>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}

                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

// ===============================
// 🔥 MAIN
// ===============================
export const StudentClasses = () => {

  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await getStudentClasses();

      setClasses(res.classData || []);
      setTeachers(res.teachers || []);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">My Classes</h1>
        <p className="text-slate-500">
          View your timetable with subjects and teachers.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">

          {classes.length > 0 ? (
            classes.map((cls: any) => (
              <Card key={cls._id} className="p-6">

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <BookOpen size={20} />
                  </div>

                  <h3 className="font-bold text-lg">
                    Class {cls.name}-{cls.section}
                  </h3>
                </div>

                <Timetable
                  routine={cls.routine}
                  teachers={teachers}
                />

              </Card>
            ))
          ) : (
            <div className="text-center text-gray-400 py-10">
              No classes found 📭
            </div>
          )}

        </div>
      )}
    </div>
  );
}