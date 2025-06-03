"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";
import { useDayHoliday } from "@/app/hooks/useDayHoliday";

export default function TopBar() {
  const { month, year } = useCalendar();
  const [days, setDays] = useState<string[]>([]);

  const today = new Date();
  const isToday = (day: string) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === parseInt(day)
    );
  };

  useEffect(() => {
    const daysArray = getDaysInMonth(year, month);
    setDays(daysArray);
  }, [month, year]);

  return (
    <div className="flex bg-gray-100 items-center border-t border-b sticky h-9">
      {days.map((day) => {
        const dayNumber = parseInt(day);
        const { isHoliday } = useDayHoliday(year, month, dayNumber);

        const weekendClass = isWeekend(year, month, dayNumber) ? "bg-gray-300" : "";
        const holidayClass = isHoliday ? "bg-green-100" : "";
        const todayClass = isToday(day)
          ? "bg-blue-100 text-blue-700 font-extrabold border-blue-500"
          : "";

        return (
          <div
            key={day}
            className={`border-gray-300 w-9 h-9 flex justify-center items-center border-l font-semibold ${weekendClass} ${holidayClass} ${todayClass}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
