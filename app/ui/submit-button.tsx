"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text }: { text: string | "Add" }) {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending}>
      {text}
    </Button>
  );
}
