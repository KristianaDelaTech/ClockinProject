

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
        date: "02-01-2025",
        title: "Festat e Vitit te Ri"
      },
      {
        date: "14-03-2025",
        title: "Dita e Verës"
      },
      {
        date: "22-03-2025",
        title: "Dita e Nevruzit"
      },
      {
        date: "30-03-2025",
        title: "Dita e Bajramit të Madh"
      },
      {
        date: "20-04-2025",
        title: "E Diela e Pashkëve Ortodokse"
      }
    ]);
  };
  