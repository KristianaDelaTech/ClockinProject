"use client";
import React from "react";
import TopBar from "./TopBar";
import WorkDay from "./WorkDay";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth } from "@/app/utils/dateUtils";
import { useProjects } from "@/app/context/ProjectContext";
import { Project } from "@/types/project";
import { usePathname } from "next/navigation";

function formatDate(year: number, month: number, day: string) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export default function Calendar() {
  const { year, month } = useCalendar();
  const pathname = usePathname();

  const userId = pathname.split("/")[2];
  const daysArray = getDaysInMonth(year, month);
  const { sidebarProjects } = useProjects();

  return (
    <div>
      <TopBar />
      <div className="flex flex-col bg-gray-100">
        {sidebarProjects.map((companyBlock) => (
          <React.Fragment key={companyBlock.company}>
            {/* Company label row */}
            <div className="flex items-center h-9 px-2 font-semibold bg-gray-200 border-gray-300" />
            {/* Project rows */}
            {companyBlock.projects.map((proj: Project) => (
              <div className="flex" key={proj.projectKey}>
                {daysArray.map((day) => {
                  const date = formatDate(year, month, day);
                  return (
                    <WorkDay
                      key={`${proj.projectKey}-${day}`}
                      date={date}
                      projectKey={proj.projectKey}
                      userId={userId}
                    />
                  );
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
