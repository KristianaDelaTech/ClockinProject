"use client";

import { useState } from "react";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { useCalendar } from "@/app/context/CalendarContext";
import { isWeekend } from "@/app/utils/dateUtils";
import { normalizeProjectKey } from "@/app/utils/normalizeProjectKey";
import { WorkHoursModal } from "@/app/components/WorkHoursModal";
import { DayBoxProps } from "@/types/workDay";
import { useDayHoliday } from "@/app/hooks/useDayHoliday";
import { getDayData } from "@/app/hooks/getDayData";
import { useSaveWorkHours } from "@/app/hooks/useSaveWorkHours";

export default function WorkDay({ date, projectKey, userId }: DayBoxProps) {
  const { year, month } = useCalendar();
  const day = parseInt(date.split("-")[2], 10);
  const isWeekendDay = isWeekend(year, month, day);

  const { workHours, setWorkHoursForProject, reloadWorkHours } = useWorkHours();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, isHoliday, holidayTitle } = useDayHoliday(year, month, day);
  if (loading) return null;

  const normalizedKey = normalizeProjectKey(projectKey);
  const dayData = getDayData(workHours, date, userId, normalizedKey);

  const handleSave = useSaveWorkHours({
    date,
    userId,
    projectKey,
    reloadWorkHours,
    setWorkHoursForProject,
    month,
    year,
  });

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        title={holidayTitle}
        className={`relative w-9 h-9 flex items-center justify-center text-sm cursor-pointer border-r border-b border-gray-300
          ${isHoliday ? "bg-green-100" : isWeekendDay ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
        `}
      >
        {dayData.hours ? Number(dayData.hours).toFixed(2) : ""}
        {dayData.note && (
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-l-[10px] border-b-green-500 border-l-transparent" />
        )}
      </div>

      <WorkHoursModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialHours={dayData.hours?.toString() ?? ""}
        initialNote={dayData.note ?? ""}
      />
    </>
  );
}
