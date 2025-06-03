

export type HolidayData = {
    title: string;
    date: string;
  };
  
  export const fetchHolidays = async (): Promise<HolidayData[]> => {
    // Simulate API delay
    return Promise.resolve([
      {
        date: "01-01-2025",
        title: "Festat e Vitit te Ri"
      },
      {
        date: "01-02-2025",
        title: "Festat e Vitit te Ri"
      },
      {
        date: "03-14-2025",
        title: "Dita e Verës"
      },
      {
        date: "03-22-2025",
        title: "Dita e Nevruzit"
      },
      {
        date: "03-30-2025",
        title: "Dita e Bajramit të Madh"
      },
      {
        date: "04-20-2025",
        title: "E Diela e Pashkëve Ortodokse"
      },
      {
        date: "06-06-2025",
        title: "E Diela e Pashkëve Ortodokse"
      },
    ]);
  };
  