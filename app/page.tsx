import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountBookLogo from "@/app/ui/account-logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-secondary p-4 md:h-52">
        <AccountBookLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-secondary px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl md:text-3xl md:leading-normal`}>
            <strong>Welcome to Account Book</strong>
          </p>
          <Button asChild>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  );
}
