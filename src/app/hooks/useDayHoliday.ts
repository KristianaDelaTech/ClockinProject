// hooks/useDayHoliday.ts
import { useHolidayContext } from "@/app/context/HolidayContext";
import { isHoliday as checkHoliday } from "@/app/utils/dateUtils";

export function useDayHoliday(year: number, month: number, day: number) {
  const [holidays, loading] = useHolidayContext();

  const holiday = holidays.find((h) =>
    checkHoliday(year, month, day, h.date)
  );

  return {
    loading,
    isHoliday: Boolean(holiday),
    holidayTitle: holiday?.title ?? "",
  };
}
