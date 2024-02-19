import { BookTextIcon } from "lucide-react";
import { lusitana } from "@/app/ui/fonts";

export default function AccountBookLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row gap-2 items-center leading-none`}
    >
      <BookTextIcon className="h-12 w-12" />
      <p className="text-[32px]">Account Book</p>
    </div>
  );
}
