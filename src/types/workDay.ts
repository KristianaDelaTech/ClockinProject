export type DayBoxProps = {
  date: string;
  projectKey: string;
  userId: string;
};
export type DayWorkEntry = {
  hours: number;
  note?: string;
};

export type ProjectWorkData = {
  [projectKey: string]: DayWorkEntry;
};

export type UserWorkData = {
  [userId: string]: ProjectWorkData;
};

export type WorkHoursMap = {
  [date: string]: UserWorkData;
};


export interface UseSaveWorkHoursParams {
  date: string;
  userId: string;
  projectKey: string;
  month: number;
  year: number;
  reloadWorkHours: (userId: string, month: number, year: number) => void;
  setWorkHoursForProject: (
    date: string,
    userId: string,
    projectKey: string,
    hours: number,
    note: string
  ) => Promise<void>;
}

export type SaveWorkHoursHandler = (hours: number, note: string) => Promise<void>;
