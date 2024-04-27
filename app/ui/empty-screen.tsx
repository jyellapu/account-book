import { FileX } from "lucide-react";
import { lusitana } from "./fonts";

export function EmptyScreen({ headline }: { headline: string }) {
  return (
    <div className="md:block mt-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle h-[400px]">
        <div className="rounded-md bg-secondary/40 p-2 h-full">
          <div className="flex flex-col gap-4 items-center justify-center h-full">
            <FileX className="w-[60px] h-[60px] rounded-full bg-secondary p-4"></FileX>
            <h2 className={`${lusitana.className} text-xl text-bg-secondary`}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
