
export const getDaysInMonth = (year: number, month: number): string[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return day < 10 ? `0${day}` : `${day}`;
    });
  };
  
  export const isWeekend = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    return weekday === 0 || weekday === 6;
  };

export const parseDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

// Check if a given day is a holiday
export const isHoliday = (year: number, month: number, day: number, holiday: string): boolean => {
  const date = new Date(year, month, day);
  const holidayDate = parseDateString(holiday);
  return (
    date.getFullYear() === holidayDate.getFullYear() &&
    date.getMonth() === holidayDate.getMonth() &&
    date.getDate() === holidayDate.getDate()
  );
};

