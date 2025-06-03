import { useCalendar } from "@/app/context/CalendarContext";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { usePathname } from "next/navigation";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";
import { useDayHoliday } from "@/app/hooks/useDayHoliday";
import { useMemo, useState, useEffect } from "react";

export default function BottomBar() {
  const { month, year } = useCalendar();
  const { getTotalHoursForDay } = useWorkHours();
  const pathname = usePathname();
  const userId = useMemo(() => pathname?.split("/")[2] || "", [pathname]);
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    setDays(getDaysInMonth(year, month));
  }, [month, year]);

  return (
    <div className="flex items-center gap-1">
      {days.map((day) => {
        const dayNumber = parseInt(day);
        const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const totalHours = getTotalHoursForDay(formattedDate, userId);
        const isWeekendDay = isWeekend(year, month, dayNumber);

        const { isHoliday } = useDayHoliday(year, month, dayNumber);

        let bgColor = totalHours > 0 ? "bg-blue-100" : "bg-white";

        let borderColor = "border-gray-300";
        if (isHoliday) {
          borderColor = "border-green-400";
        } else if (isWeekendDay) {
          borderColor = "border-red-400";
        }

        return (
          <div
            key={day}
            title={formattedDate}
            className={`border-t-5 ${borderColor} w-8 h-6 flex justify-center items-center text-xs pt-1 ${bgColor}`}
          >
            {totalHours.toFixed(2)}
          </div>
        );
      })}
    </div>
  );
}
