import { useEffect, useState } from "react";
import { fetchHolidays, HolidayData } from "@/app/lib/api/bankHolidays";
import { isHoliday } from "@/app/utils/dateUtils";

export const useHolidayInfo = (year: number, month: number, day: number) => {
  const [holidays, setHolidays] = useState<HolidayData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHolidays();
        setHolidays(data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    })();
  }, []);

  const holiday = holidays.find((h) => isHoliday(year, month, day, h.date));
  return { isHoliday: Boolean(holiday), holidayTitle: holiday?.title ?? "" };
};
