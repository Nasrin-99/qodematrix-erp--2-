import React from "react";

export const RoutineSelector = ({
  routine,
  selectedSlots,
  setSelectedSlots
}: any) => {

  if (!routine) return null;

  const timeSlots = Object.keys(routine[Object.keys(routine)[0]] || {});

  const handleClick = (day: string, time: string, subject: string) => {
    const key = `${day}-${time}`;

    setSelectedSlots((prev: any[]) => {
      const exists = prev.find((s) => s.key === key);

      if (exists) {
        return prev.filter((s) => s.key !== key);
      } else {
        return [...prev, { key, day, time, subject }];
      }
    });
  };

  return (
    <div className="overflow-x-auto border rounded-xl mt-4">
      <table className="w-full text-sm border-collapse">

        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Day</th>
            {timeSlots.map((t) => (
              <th key={t} className="p-2 border text-center">{t}</th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {Object.entries(routine).map(([day, timings]: any) => (
            <tr key={day}>
              <td className="border p-2 font-medium bg-gray-50">{day}</td>

              {timeSlots.map((time) => {
                const selected = selectedSlots.some(
                  (s: any) => s.day === day && s.time === time
                );

                return (
                  <td
                    key={time}
                    onClick={() => handleClick(day, time, timings[time]?.subject)}
                    className={`border p-2 text-center cursor-pointer ${selected
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {timings[time]?.subject || "-"}
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