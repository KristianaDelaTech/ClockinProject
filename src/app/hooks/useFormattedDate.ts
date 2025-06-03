import { useEffect, useState } from "react";

export const useFormattedDate = (month: number, year: number) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatted = new Date(year, month - 1).toLocaleDateString("sq-AL", {
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);
  }, [month, year]);

  return formattedDate;
};
