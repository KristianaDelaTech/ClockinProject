"use client";

import { useCallback, useEffect, useState } from "react";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { Button } from "@/components/ui/button";
import { Modal } from "@/app/components/ui/Modal";
import { isHoliday, isWeekend } from "@/app/utils/dateUtils";
import { useCalendar } from "@/app/context/CalendarContext";
import { fetchHolidays, HolidayData } from "@/app/lib/api/bankHolidays";
import { normalizeProjectKey } from "@/app/utils/normalizeProjectKey";

type DayBoxProps = {
  date: string;
  projectKey: string;
  userId: string;
};

export default function WorkDay({ date, projectKey, userId }: DayBoxProps) {
  const { month, year } = useCalendar();
  const day = parseInt(date.split("-")[2], 10);

  // Holidays state
  const [holidaysData, setHolidaysData] = useState<HolidayData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Input states for modal
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextAreaValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  // Weekend and holiday checks
  const isWeekendDay = isWeekend(year, month, day);
  const holiday = holidaysData.find((h) => isHoliday(year, month, day, h.date));
  const isHolidayDay = Boolean(holiday);
  const holidayTitle = holiday?.title ?? "";
 

  const normalizedProjectKey = normalizeProjectKey(projectKey);
  // Work hours from context
  const { workHours, setWorkHoursForProject, reloadWorkHours } = useWorkHours();
  const currentDayData = workHours[date]?.[userId] ?? {};
  const currentValue = currentDayData[normalizedProjectKey] ?? { hours: 0, note: "" };
  // Project id number extracted from projectKey string
  const projectId = parseInt(projectKey.split("-")[1], 10);
  const isoDate = new Date(`${date}T00:00:00Z`).toISOString();

  // Load holidays once on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHolidays();
        setHolidaysData(data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    })();
  }, []);

  // Open modal and set current input values from context
  const openModal = useCallback(() => {
    setInputValue(currentValue.hours?.toString() ?? "");
    setTextAreaValue(currentValue.note ?? "");
    setInputError(null);
    setIsModalOpen(true);
  }, [currentValue]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setInputError(null);
  }, []);

  // Save handler: validate input, update context and call API
  const handleSave = useCallback(async () => {
    const trimmed = inputValue.trim();
    const hours = trimmed === "" ? 0 : parseFloat(trimmed);

    if (isNaN(hours) || hours < 0 || hours % 0.25 !== 0) {
      setInputError("Only non-negative fractions of 0.25 are allowed");
      return;
    }

    const note = hours === 0 ? "" : textareaValue;

    // Update context state immediately
    await setWorkHoursForProject(date, userId, projectKey, hours, note);

    // Save to backend API
    try {
      const res = await fetch("/api/workhours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: isoDate,
          hours,
          note,
          userId: parseInt(userId, 10),
          projectId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save work hours.");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    reloadWorkHours(userId, month + 1, year);
    setIsModalOpen(false);
    setInputError(null);
  }, [inputValue, textareaValue, date, userId, projectKey, projectId, isoDate, setWorkHoursForProject]);

  return (
    <>
      <div
        onClick={openModal}
        title={holidayTitle}
        className={`relative w-9 h-9 flex items-center justify-center text-sm cursor-pointer border-r border-b border-gray-300
          ${isWeekendDay ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
          ${isHolidayDay ? "bg-green-100" : ""}
        `}
      >
        {/* Display hours with 2 decimals if > 0 */}
        {currentValue.hours ? Number(currentValue.hours).toFixed(2) : ""}

        {/* Show small green triangle in corner if there's a note */}
        {currentValue.note && (
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-l-[10px] border-b-green-500 border-l-transparent" />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Sheno oret e punes"
        footer={
          <Button onClick={handleSave} disabled={!!inputError}>
            Ruaj
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min={0}
            step={0.25}
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);

              const floatVal = parseFloat(val);
              if (val && (isNaN(floatVal) || floatVal < 0 || floatVal % 0.25 !== 0)) {
                setInputError("Only non-negative fractions of 0.25 are allowed");
              } else {
                setInputError(null);
              }
            }}
            placeholder="Sheno oret"
            className={`border rounded p-2 w-full ${
              inputError ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {inputError && <p className="text-red-600 text-sm -mt-2">{inputError}</p>}
          <textarea
            value={textareaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            placeholder="Sheno pershkrimin per oret e punes"
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </Modal>
    </>
 
  );}