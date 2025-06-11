import { Modal } from "@/app/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { InputField } from "@/app/components/ui/InputField";
import React from "react";

type Props = {
  open: boolean;
  formData: { username: string; email: string; password: string; role: string };
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export function AddUserModal({ open, onClose, formData, onChange, onSubmit }: Props) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Krijo user te ri"
      footer={<Button onClick={onSubmit}>Shto</Button>}
    >
      <p className="mb-4 text-left text-[#244B77] text-md">
        Plotësoni fushat përkatëse për të krijuar një user të ri dhe vendosni një password të sigurt.
      </p>
      <div className="space-y-4 flex flex-wrap gap-2">
        <InputField label="Emri i plote:" name="username" value={formData.username} onChange={onChange} placeholder="Shembull: Andi Lazaj" />
        <InputField label="Email:" name="email" value={formData.email} onChange={onChange} placeholder="Shembull: andi@example.com" />
        <InputField label="Password:" name="password" value={formData.password} onChange={onChange} type="password" placeholder="Shembull: ********"/>
        <InputField label="Roli:" name="role" value={formData.role} onChange={onChange} placeholder="Shembull: Dev" />
      </div>
    </Modal>
  );
}
