"use client";

import { useCallback, useState } from "react";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { useCalendar } from "@/app/context/CalendarContext";
import { isWeekend } from "@/app/utils/dateUtils";
import { normalizeProjectKey } from "@/app/utils/normalizeProjectKey";
import { useHolidayInfo } from "@/app/hooks/useHolidayInfo";
import { WorkHoursModal } from "@/app/components/WorkHoursModal";
import { DayBoxProps } from "@/types/workDay";

export default function WorkDay({ date, projectKey, userId }:DayBoxProps) {
  const { year, month } = useCalendar();
  const day = parseInt(date.split("-")[2], 10);
  const { isHoliday, holidayTitle } = useHolidayInfo(year, month, day);
  const isWeekendDay = isWeekend(year, month, day);

  const { workHours, setWorkHoursForProject, reloadWorkHours } = useWorkHours();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedKey = normalizeProjectKey(projectKey);
  const dayData = workHours[date]?.[userId]?.[normalizedKey] || { hours: 0, note: "" };

  const projectId = parseInt(projectKey.split("-")[1], 10);
  const isoDate = new Date(`${date}T00:00:00Z`).toISOString();

  const handleSave = async (hours: number, note: string) => {
    await setWorkHoursForProject(date, userId, projectKey, hours, note);
    await fetch("/api/workhours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: isoDate, hours, note, userId: parseInt(userId, 10), projectId }),
    });
    reloadWorkHours(userId, month + 1, year);
  };

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
