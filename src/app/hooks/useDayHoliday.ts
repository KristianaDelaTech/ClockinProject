
import { isHoliday as checkHoliday } from "@/app/utils/dateUtils";
import { Holiday } from "@/types/holiday";

export function useDayHoliday(year: number, month: number, day: number, holidays: Holiday[]) {

  const holiday = holidays?.find((h) =>
    checkHoliday(year, month, day, h.date)
  );

  return {
    isHoliday: Boolean(holiday),
    holidayTitle: holiday?.title ?? "",
  };
}
