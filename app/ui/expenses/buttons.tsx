import { deleteExpense } from "@/app/lib/actions/expenses/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export function AddExpense({ bookId }: { bookId: number }) {
  return (
    <Button asChild>
      <Link
        href={`/books/${bookId}/dashboard/expenses/create`}
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Add Expense</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateExpense({
  bookId,
  expenseId,
}: {
  bookId: number;
  expenseId: number;
}) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link href={`/books/${bookId}/dashboard/expenses/${expenseId}`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteExpense({
  bookId,
  expenseId,
}: {
  bookId: number;
  expenseId: number;
}) {
  const deleteExpenseWithId = deleteExpense
    .bind(null, bookId)
    .bind(null, expenseId);
  return (
    <>
      <form action={deleteExpenseWithId}>
        <Button
          variant={"destructive"}
          className="rounded-md border p-2"
          type="submit"
        >
          <div>
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </div>
        </Button>
      </form>
    </>
  );
}
