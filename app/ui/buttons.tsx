import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export function BackButton({ href }: { href: Url }) {
  return (
    <Button asChild variant={"link"}>
      <Link
        href={href}
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon className="h-5" />
        <span className="sr-only">Go Back</span>
      </Link>
    </Button>
  );
}
