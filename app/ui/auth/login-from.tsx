"use client";

import { googleSignIn } from "@/app/lib/actions/auth/actions";
import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(googleSignIn, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-secondary px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-xl`}>
          Please sign in with Google to continue.
        </h1>
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      <div className="flex items-center justify-center gap-2">
        <FaGoogle></FaGoogle>
        Sign in with Google
        <ArrowRightIcon className="ml-auto h-5 w-5" />
      </div>
    </Button>
  );
}
