"use client";

import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PhoneIcon,
  KeyIcon,
  AlertCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions/auth/actions";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-secondary px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="mobilenumber"
            >
              Mobile Number
            </label>
            <div className="relative">
              <Input
                className="pl-10 remove-arrow"
                id="mobilenumber"
                type="number"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                required
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input
                className="pl-10"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <AlertCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
    </Button>
  );
}
