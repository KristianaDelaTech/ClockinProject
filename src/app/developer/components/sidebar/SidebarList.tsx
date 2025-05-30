import { ProjectData } from "@/types/project";
import SidebarItem from "./SidebarItem";

interface SidebarListProps {
  sidebarProjects: ProjectData[];
}

export default function SidebarList({ sidebarProjects }: SidebarListProps) {
  if (sidebarProjects.length === 0) {
    return <p className="text-center text-gray-500 p-4">Nuk ka projekte</p>;
  }

  return (
    <div className="overflow-auto">
      <div className="h-9 flex justify-center font-semibold text-[#244B77] items-center border-b">Projektet</div>
      {sidebarProjects.map(({ company, projects }) => (
        <SidebarItem key={company} company={company} projects={projects} />
      ))}
    </div>
  );
}