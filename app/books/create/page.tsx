"use client";

import { addBook } from "@/app/lib/actions/books/actions";
import AccountBookLogo from "@/app/ui/account-logo";
import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addBook, initialState);
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start bg-secondary text-secondary-foreground rounded-md p-4 md:h-40"
        href="/books"
      >
        <div className="w-full">
          <AccountBookLogo />
        </div>
      </Link>
      <div className="w-full p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className={`${lusitana.className} text-xl`}>Add Account Book</h1>
        </div>
        <form action={dispatch}>
          <div className="rounded-md bg-secondary/40 p-4 md:p-8">
            <div className="mb-4">
              <Label
                htmlFor="firstname"
                className="mb-2 block text-sm font-medium"
              >
                Account Book Name
              </Label>
              <Input
                id="book name"
                name="name"
                type="text"
                placeholder="Enter account book name"
                className=""
                required
              />
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.message && (
                <>
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{state.message}</p>
                </>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button asChild variant="secondary">
              <Link href="/books">Cancel</Link>
            </Button>
            <Button type="submit">Add Book</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
