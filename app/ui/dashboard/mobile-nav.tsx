import { BadgeIndianRupee, BookText, SquareUser } from "lucide-react";

export default function MobileNavigation() {
  return (
    <div className="bg-subtle w-full h-16 flex items-center justify-evenly border-t fixed bottom-0 left-0">
      <div className="flex flex-grow flex-col justify-center items-center ">
        <SquareUser className="mb-1" size={24} />
        <p className="text-sm text-center">Customers</p>
      </div>
      <div className="flex flex-grow flex-col justify-center items-center text-muted-foreground">
        <BadgeIndianRupee className="mb-1" size={24} />
        <p className="text-sm text-center">Expenses</p>
      </div>
      <div className="flex flex-grow flex-col justify-center items-center text-muted-foreground">
        <BookText className="mb-1" size={24} />
        <p className="text-sm text-center">DailySlips</p>
      </div>
    </div>
  );
}
