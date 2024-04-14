"use client";

import { State, addExpense } from "@/app/lib/actions/expenses/actions";
import { lusitana } from "@/app/ui/fonts";
import { SubmitButton } from "@/app/ui/client-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page({ params }: { params: { bookId: number } }) {
  const bookId = Number(params.bookId);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addExpense, initialState);
  const defaultExpenseDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Add Expense</h1>
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
            <Label htmlFor="date" className="mb-2 block text-sm font-medium">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              placeholder="Enter expense date"
              defaultValue={defaultExpenseDate}
              max={defaultExpenseDate}
              className="invert-cal-color"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-2 block text-sm font-medium">
              Expense
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter expense"
              className=""
              minLength={2}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Cost
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter cost"
              min={0}
              className="remove-arrow"
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
            <Link href={`/books/${bookId}/dashboard/expenses`}>Cancel</Link>
          </Button>
          <SubmitButton text={"Add Expense"} />
        </div>
      </form>
    </div>
  );
}
