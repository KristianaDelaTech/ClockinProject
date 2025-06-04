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
import { useAbsenceContext } from "@/app/context/AbsencesContext";
import { useIsAbsentDay } from "@/app/hooks/useIsAbsentDay";

export default function WorkDay({ date, projectKey, userId }: DayBoxProps) {
  const { year, month } = useCalendar();
  const day = parseInt(date.split("-")[2], 10);
  const isWeekendDay = isWeekend(year, month, day);
  const [absences, absenceLoading] = useAbsenceContext();
  const { workHours, setWorkHoursForProject, reloadWorkHours } = useWorkHours();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, isHoliday, holidayTitle } = useDayHoliday(year, month, day);
  console.log(date, "date in workday");
  const { isAbsentDay, absenceType } = useIsAbsentDay(absences, date);
  const normalizedKey = normalizeProjectKey(projectKey);
  const dayData = getDayData(workHours, date, userId, normalizedKey);
  if (loading) return null;
  if (absenceLoading) return null;
  const handleSave = useSaveWorkHours({
    date,
    userId,
    projectKey,
    reloadWorkHours,
    setWorkHoursForProject,
    month,
    year,
  });

  const title = isAbsentDay
    ? absenceType
    : isHoliday
    ? holidayTitle
    : undefined;
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        title={title ?? undefined}
        className={`relative w-9 h-9 flex items-center justify-center text-sm cursor-pointer border-r border-b border-gray-300
    ${
      isHoliday
        ? "bg-green-100"
        : isAbsentDay
        ? "bg-orange-100"
        : isWeekendDay
        ? "bg-gray-100"
        : "bg-white hover:bg-gray-100"
    }
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
