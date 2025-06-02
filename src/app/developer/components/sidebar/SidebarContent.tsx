
import { Button } from "@/components/ui/button";
import SidebarList from "./SidebarList";
import { ProjectData } from "@/types/project";

export default function SidebarContent  ({ sidebarProjects, openModal }: { sidebarProjects: ProjectData[], openModal: () => void }) {
    return(
  <aside className="w-64 bg-[#E3F0FF] shadow-md border-[#244B77] flex flex-col justify-between align-center">
    <SidebarList sidebarProjects={sidebarProjects} />
    <Button className="w-fit m-auto" onClick={openModal}>Shto të ri</Button>
  </aside>
)
};
