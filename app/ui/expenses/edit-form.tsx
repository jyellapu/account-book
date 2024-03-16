"use client";
import { State, updateExpense } from "@/app/lib/actions/expenses/actions";
import { Expense } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../client-buttons";

export default function Form({
  bookId,
  expense,
}: {
  bookId: number;
  expense: Expense;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateExpenseWithId = updateExpense.bind(null, expense.id);
  const [state, dispatch] = useFormState(updateExpenseWithId, initialState);
  return (
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
            className="invert-cal-color"
            defaultValue={format(expense.date, "yyyy-MM-dd")}
            max={format(new Date(), "yyyy-MM-dd")}
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
            defaultValue={expense.name}
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
            className="remove-arrow"
            min={0}
            defaultValue={expense.amount}
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
        <SubmitButton text="Edit Expense" />
      </div>
    </form>
  );
}
