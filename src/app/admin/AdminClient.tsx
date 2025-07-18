"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Raport from "./components/raport/Raport";
import Projects from "./components/projects/Projects";
import Users from "./components/users/Users";
import Absences from "./components/absences/Absences";
import Vocations from "./components/vocations/Vocations";
import ModifyAbsences from "./components/modify-absences/ModifyAbsences";
import { WorkHoursProvider } from "@/app/context/WorkHoursContext";
import { CalendarProvider } from "@/app/context/CalendarContext";
import { ProjectProvider } from "@/app/context/ProjectContext";

export default function AdminClient() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("raport");

  useEffect(() => {
    const tabParam = searchParams.get("tab") || "raport";
    setTab(tabParam);
  }, [searchParams]);

  return (
    <section className="m-10 h-[66vh]" style={{ fontFamily: "var(--font-anek-bangla)" }}>
      {tab === "raport" && (
        <CalendarProvider>
          <ProjectProvider>
            <WorkHoursProvider>
              <Raport />
            </WorkHoursProvider>
          </ProjectProvider>
        </CalendarProvider>
      )}
      {tab === "projects" && <Projects />}
      {tab === "users" && <Users />}
      {tab === "absences" && <Absences />}
      {tab === "modify-absences" && <ModifyAbsences />}
      {tab === "holidays" && <Vocations />}
    </section>
  );
}
