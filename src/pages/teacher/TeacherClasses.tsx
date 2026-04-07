import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

import { getMyClasses } from '../../api/services';
import { useNavigate } from "react-router-dom";

export const TeacherClasses = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // 🔥 FETCH DATA
  // ===============================
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await getMyClasses();
      console.log("API DATA:", data);
      setClasses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Classes</h1>
        <p className="text-slate-500 mt-1">
          Manage your assigned classes and schedules
        </p>
      </div>

      {/* 🔥 SEARCH */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Search classes..."
            className="pl-10 rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* 🔥 LOADING */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {classes.map((cls) => {

            // ===============================
            // 🔥 REMOVE DUPLICATE SLOTS
            // ===============================
            const uniqueSlots = Array.from(
              new Map(
                (cls.slots || []).map((slot: any) => [
                  `${slot.day}-${slot.time}-${slot.subject}`,
                  slot
                ])
              ).values()
            );

            // ===============================
            // 🔥 SORT BY TIME
            // ===============================
            uniqueSlots.sort((a: any, b: any) =>
              a.time.localeCompare(b.time)
            );

            return (
              <Card
                key={cls.classId}
                className="cursor-pointer group rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6">

                  {/* 🔥 HEADER */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <BookOpen size={22} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Class {cls.name}-{cls.section}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Assigned Schedule
                        </p>
                      </div>
                    </div>

                    {/* 👉 NAVIGATION */}
                    <ChevronRight
                      className="text-slate-400 group-hover:translate-x-1 transition cursor-pointer"
                      onClick={() =>
                        navigate(`/teacher/classes/${cls.classId}/students`)
                      }
                    />

                  </div>

                  {/* 🔥 SLOTS */}
                  <div className="space-y-2 mt-4">
                    {uniqueSlots.length > 0 ? (
                      uniqueSlots.map((slot: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800">
                              {slot.subject}
                            </span>
                            <span className="text-xs text-slate-500">
                              {slot.day}
                            </span>
                          </div>

                          <span className="text-xs font-medium text-indigo-600">
                            {slot.time}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400">
                        No schedule assigned
                      </p>
                    )}
                  </div>

                </div>
              </Card>
            );
          })}

        </div>
      )}
    </div>
  );
};