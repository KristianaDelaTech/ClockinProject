"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { ProjectData } from "@/types/project";
import { useCalendar } from "./CalendarContext";

type ProjectContextType = {
  sidebarProjects: ProjectData[];
  setSidebarProjects: (projects: ProjectData[]) => void;
  allProjectKeys: string[];
  removeProject: (projectKey: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { month, year } = useCalendar();
  const [sidebarProjects, setSidebarProjectsState] = useState<ProjectData[]>([]);

  const fetchSidebarProjects = useCallback(async () => {
    try {
      const res = await fetch(`/api/sidebarProjects?month=${month}&year=${year}`);
      if (!res.ok) throw new Error("Failed to load sidebar projects");
      const data: ProjectData[] = await res.json();
      setSidebarProjectsState(data);
    } catch (error) {
      console.error("Error fetching sidebar projects:", error);
    }
  }, [month, year]);
console.log(sidebarProjects,"sidebarProjects")
  const setSidebarProjects = useCallback((projects: ProjectData[]) => {
    setSidebarProjectsState(projects);
    fetch("/api/sidebarProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, month, projects }),
    }).catch((err) => console.error("Error saving sidebar projects:", err));
  }, [month, year]);

  const removeProject = useCallback((projectKey: string) => {
    const updated = sidebarProjects
      .map(group => ({
        ...group,
        projects: group.projects.filter(p => p.projectKey !== projectKey),
      }))
      .filter(group => group.projects.length > 0);

    setSidebarProjects(updated);
  }, [sidebarProjects, setSidebarProjects]);

  const allProjectKeys = sidebarProjects?.flatMap(p =>
    p.projects?.map(proj => proj.projectKey)
  );

  useEffect(() => {
    fetchSidebarProjects();
  }, [fetchSidebarProjects]);

  return (
    <ProjectContext.Provider
      value={{
        sidebarProjects,
        setSidebarProjects,
        allProjectKeys,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
