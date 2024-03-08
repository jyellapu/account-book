import { Button } from "@/components/ui/button";
import { FrownIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FrownIcon className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested transaction.</p>
      <Button asChild>
        <Link href={`/books`} className="mt-4">
          Go Back
        </Link>
      </Button>
    </main>
  );
}
