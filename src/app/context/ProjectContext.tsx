"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
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

  const getStorageKey = useCallback(() => `sidebar-projects-${year}-${month}`, [year, month]);

  const loadFromStorage = useCallback(() => {
    const saved = localStorage.getItem(getStorageKey());
    const parsed = saved ? (JSON.parse(saved) as ProjectData[]) : [];
    setSidebarProjectsState(parsed);
  }, [getStorageKey]);

  const persistToStorage = useCallback((projects: ProjectData[]) => {
    localStorage.setItem(getStorageKey(), JSON.stringify(projects));
  }, [getStorageKey]);

  const setSidebarProjects = useCallback((projects: ProjectData[]) => {
    setSidebarProjectsState(projects);
    persistToStorage(projects);
  }, [persistToStorage]);

  const removeProject = useCallback((projectKey: string) => {
    const updatedProjects = sidebarProjects
      .map((group) => ({
        ...group,
        projects: group.projects.filter((proj) => proj.projectKey !== projectKey),
      }))
      .filter((group) => group.projects.length > 0);

    setSidebarProjects(updatedProjects);
  }, [sidebarProjects, setSidebarProjects]);

  const allProjectKeys = sidebarProjects.flatMap((p) =>
    p.projects.map((proj) => proj.projectKey)
  );

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

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
