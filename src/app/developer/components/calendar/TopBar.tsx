"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";
import { useDayHoliday } from "@/app/hooks/useDayHoliday";
import { useIsAbsentDay } from "@/app/hooks/useIsAbsentDay";
import { useAbsenceContext } from "@/app/context/AbsencesContext";

export default function TopBar() {
  const { month, year } = useCalendar();
  const [days, setDays] = useState<string[]>([]);
  const [absences, absenceLoading] = useAbsenceContext();

  const today = new Date();
  const isToday = (day: string) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === parseInt(day, 10)
    );
  };

  useEffect(() => {
    setDays(getDaysInMonth(year, month));
  }, [month, year]);

  if (absenceLoading) return null;

  return (
    <div className="flex bg-gray-100 items-center border-t border-b sticky h-9">
      {days.map((day) => {
        const dayNumber = parseInt(day, 10);
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;

        const { isHoliday, holidayTitle } = useDayHoliday(year, month, dayNumber);
        const { isAbsentDay, absenceType } = useIsAbsentDay(absences, date);

        const weekendClass = isWeekend(year, month, dayNumber) ? "bg-gray-300" : "";
        const holidayClass = isHoliday ? "bg-green-100" : "";
        const absenceClass = isAbsentDay ? "bg-orange-100" : "";
        const todayClass = isToday(day)
          ? "bg-blue-100 text-blue-700 font-extrabold border-blue-500"
          : "";

        const tooltip = [holidayTitle, absenceType && `Absence: ${absenceType}`]
          .filter(Boolean)
          .join(" | ");

        return (
          <div
            key={day}
            title={tooltip}
            className={`border-gray-300 w-9 h-9 flex justify-center items-center border-l font-semibold ${weekendClass} ${holidayClass} ${todayClass} ${absenceClass}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
