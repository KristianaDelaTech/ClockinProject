import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Sidebar from "../components/sidebar/Sidebar";
import { CalendarProvider } from "../../context/CalendarContext";
import { ProjectProvider } from "../../context/ProjectContext";
import { WorkHoursProvider } from "../../context/WorkHoursContext";
import SidebarHeader from "../components/sidebar/SidebarHeader";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import { HolidayProvider } from "@/app/context/HolidayContext";
import { UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AbsenceProvider } from "@/app/context/AbsencesContext";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const currentUserId = session.user?.id;
  let displayedUsername = session.user?.username || "User";
  let displayedRole = session.user?.role || "developer";

  // If viewing another user's page, fetch their info
  if (id !== currentUserId) {
    const otherUser = await db.user.findUnique({
      where: { id: Number(id) }, // Convert id to number if needed
      select: { username: true, role: true },
    });

    if (otherUser) {
      displayedUsername = otherUser.username || displayedUsername;
      displayedRole = otherUser.role || displayedRole;
    }
  }

  return (
    <HolidayProvider>
        <AbsenceProvider>
      <WorkHoursProvider>
        <ProjectProvider>
          <CalendarProvider>
            <section
              className="transition-opacity duration-300 2xl:mx-50 mt-11 min-h-screen w-auto"
              style={{ fontFamily: "var(--font-anek-bangla)" }}
            >
              <div className="flex justify-between mb-6 items-center">
                <h2
                  className="text-4xl sm:text-6xl text-[#244B77] text-center"
                  style={{ fontFamily: "var(--font-keania-one)" }}
                >
                  ClockIn
                </h2>
                <div className="user-name flex items-center">
                  <h4 className="text-[#116B16] font-semibold text-xl mr-10">
                    {displayedUsername} (
                    {displayedRole?.toLowerCase() === "admin"
                      ? "Admin"
                      : "Developer"}
                    )
                  </h4>
                  {displayedRole?.toLowerCase() === "admin" && (
                    <Link href="/admin">
                      <Button size="sm" className="mr-2">
                        <UserRoundPen />
                      </Button>
                    </Link>
                  )}
                  <SignOutButton />
                </div>
              </div>
              <SidebarHeader />
              <main className="2xl:w-fit flex">
                <Sidebar />
                {children}
              </main>
            </section>
          </CalendarProvider>
        </ProjectProvider>
      </WorkHoursProvider>
      </AbsenceProvider>
    </HolidayProvider>
  );
}
