"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";

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
    <div className="flex bg-gray-100 overflow-auto items-center border-t-[1px]">
      {days.map((day) => {
        const weekendClass = isWeekend(year, month, parseInt(day)) ? "bg-gray-300" : "";
        const todayClass = isToday(day) ? "bg-blue-100 text-blue-700 font-extrabold border-blue-500" : "";

        return (
          <div
            key={day}
            className={`border-gray-300 w-10 h-10 flex justify-center items-center border-l font-semibold ${weekendClass} ${todayClass}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
