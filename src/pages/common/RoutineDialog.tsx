import { useState } from "react";
import { Button } from '../../components/ui/Button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle
} from "../../components/ui/Dialog";

export const RoutineDialog = ({ classData }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!classData?.routine) return null;

  const firstDay = Object.keys(classData.routine || {})[0];
  const timeSlots = firstDay
    ? Object.keys(classData.routine[firstDay] || {})
    : [];
  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Routine
      </Button>

      <Dialog open={isOpen} onClose={setIsOpen} size="4xl">
        <DialogTitle>
          Class Routine ({classData?.name}-{classData?.section})
        </DialogTitle>

        <DialogDescription>
          Weekly timetable
        </DialogDescription>

        <DialogBody>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Day</th>
                  {timeSlots.map((time) => (
                    <th key={time} className="p-3 border text-center">
                      {time}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Object.entries(classData.routine).map(
                  ([day, timings]: any) => (
                    <tr key={day} className="hover:bg-gray-50">

                      <td className="p-3 border font-medium bg-gray-50">
                        {day}
                      </td>

                      {timeSlots.map((time, i) => (
                        <td key={i} className="p-2 border text-center">
                          <div className="bg-indigo-50 text-indigo-700 rounded-md px-2 py-1 text-sm">
                            {timings[time]?.subject || "-"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        </DialogBody>

        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};