"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import {
  DateRange,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";

export function DatePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const date = new Date(searchParams.get("date") || new Date());

  const handleSearch: SelectSingleEventHandler = (date?: Date) => {
    if (!date) return;
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
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const date: DateRange = {
    from: new Date(searchParams.get("startDate") || new Date()),
    to: new Date(searchParams.get("endDate") || new Date()),
  };

  const handleSearch: SelectRangeEventHandler = (date?: DateRange) => {
    console.log("inside handle search");
    if (!date) return;
    const params = new URLSearchParams(searchParams);
    if (date) {
      if (date.from) params.set("startDate", format(date.from, "yyyy-MM-dd"));
      if (date.to) params.set("endDate", format(date.to, "yyyy-MM-dd"));
      params.set("page", "1");
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }
    console.log("yjr");
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSearch}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
