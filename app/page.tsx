import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col mb-16">
        <Link href="/accounts/1/parties/1/transactions">
          <div className="w-full flex justify-between items-center border rounded-xl p-4 mb-4">
            <div className="flex justify-center items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-md ml-4">Nanna</p>
            </div>
            <div className="flex flex-col">
              <p className="text-md">1,00,000</p>
              <p className="text-xs text-muted-foreground">30 Nov 23</p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
