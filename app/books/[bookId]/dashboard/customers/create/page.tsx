"use client";

import { addCustomer } from "@/app/lib/actions/customers/actions";
import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page({ params }: { params: { bookId: number } }) {
  const bookId = Number(params.bookId);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addCustomer, initialState);

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Add Customer</h1>
      </div>
      <form action={dispatch}>
        <div className="rounded-md bg-secondary/40 p-4 md:p-8">
          <div className="hidden mb-4">
            <Label htmlFor="bookId" className="mb-2 block text-sm font-medium">
              Book Id
            </Label>
            <Input
              id="bookId"
              name="bookId"
              type="number"
              className=""
              defaultValue={bookId}
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="firstname"
              className="mb-2 block text-sm font-medium"
            >
              First Name
            </Label>
            <Input
              id="firstname"
              name="firstName"
              type="text"
              placeholder="Enter customer's first name"
              className=""
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="secondname"
              className="mb-2 block text-sm font-medium"
            >
              Last Name
            </Label>
            <Input
              id="lastname"
              name="lastName"
              type="text"
              placeholder="Enter customer's last name"
              className=""
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="mobilenumber"
              className="mb-2 block text-sm font-medium"
            >
              Mobile Number
            </Label>
            <Input
              id="mobilenumber"
              name="mobileNumber"
              type="text"
              pattern="[0-9]{10}"
              placeholder="Enter customer's phone number"
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
            <Link href={`/books/${bookId}/dashboard/customers`}>Cancel</Link>
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </div>
  );
}
