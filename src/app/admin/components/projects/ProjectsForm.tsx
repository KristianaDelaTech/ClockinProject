import React from "react";
import { Button } from "@/components/ui/button";
import { FormData } from "@/types/project";

interface ProjectsFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ProjectsForm({
  formData,
  handleChange,
  handleSubmit,
}: ProjectsFormProps) {
  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="name" className="block text-md font-semibold text-[#244B77]">
          Emri i kompanise:
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="mt-1 block w-full border bg-[#E3F0FF] border-[#244B77] p-2"
          placeholder="Shembull: Omegaventus"
        />
      </div>

      <div>
        <label htmlFor="project" className="block text-md font-semibold text-[#244B77]">
          Emri i projektit:
        </label>
        <input
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          type="text"
          className="mt-1 block w-full border bg-[#E3F0FF] border-[#244B77] p-2"
          placeholder="Shembull: Website"
        />
      </div>
      <Button type="submit">Shto nje te ri</Button>
    </form>
  );
}
