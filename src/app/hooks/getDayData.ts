// utils/getDayData.ts
import { WorkHoursMap, DayWorkEntry } from "@/types/workDay";

export function getDayData(
  workHours: WorkHoursMap,
  date: string,
  userId: string,
  projectKey: string
): DayWorkEntry {
  const key = projectKey.toLowerCase().replace(/\s+/g, "-");
  return workHours[date]?.[userId]?.[key] ?? { hours: 0, note: "" };
}
