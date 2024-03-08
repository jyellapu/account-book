"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";

export default function SearchByDate() {
  const [date, setDate] = React.useState<Date>(new Date());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch: SelectSingleEventHandler = (date?: Date) => {
    if (!date) return;
    setDate(date);
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
      params.set("page", "1");
    } else {
      params.delete("date");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSearch}
          // showOutsideDays={false}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
