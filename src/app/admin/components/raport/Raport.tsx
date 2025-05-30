import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { User } from "@/types/user";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";

export default function Raport() {
    const [employee, setEmployee] = useState<{ users: User[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch("/api/user", { cache: "no-store" });
          const data = await res.json();
          setEmployee(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } catch (err) {
          console.error("Failed to fetch users:", err)

        }
      };
  
      fetchUser();
    }, []);

    if(isLoading) return <Spinner/>

  return (
    <section className="overflow-auto max-h-[450px]  2xl:max-h-[700px] pb-10 rounded-md">
      <table
        className="w-fit text-[#244B77] border-separate"
        style={{ borderSpacing: "10px" }} // Add spacing between cells
      >
        <thead className="bg-[#6C99CB] text-white">
          <tr className="text-left">
            <th className="px-4 py-2 w-16 rounded-sm">Nr</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Punonjesit</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Oret e punes</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Veprim</th>
          </tr>
        </thead>
        <tbody>
          {employee?.users.map((emp, index) => (
            <tr
              key={emp.id}
              className="border-t border-[#d1d1d1] font-semibold text-lg bg-[#E3F0FF]"
            >
              <td className="px-4 py-2 bg-[#244B77] text-white font-semibold rounded-sm text-xl">
                {index + 1}.
              </td>
              <td className="px-4 py-2 rounded-sm">{emp.username}</td>
              <td className="px-4 py-2 rounded-sm">22</td>
              <td className="px-4 py-2 rounded-sm">
                <Link href={`/developer/${emp.id}`}> 
                <Button
                  variant="secondary"
                  className="font-semibold w-full justify-start pl-10"
                >
                  Shiko oret
                </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </section>
  );
}
