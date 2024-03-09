import { deleteTransaction } from "@/app/lib/actions/transactions/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export function AddTransaction({
  bookId,
  customerId,
  accountId,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
}) {
  return (
    <Button asChild>
      <Link
        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions/create`}
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Add Transaction</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateTransaction({
  bookId,
  customerId,
  accountId,
  transactionId,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
  transactionId: number;
}) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link
        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions/${transactionId}`}
      >
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteTransaction({
  bookId,
  customerId,
  accountId,
  transactionId,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
  transactionId: number;
}) {
  const deleteTransactionWithId = deleteTransaction.bind(
    null,
    bookId,
    customerId,
    accountId,
    transactionId
  );
  return (
    <>
      <form action={deleteTransactionWithId}>
        <Button
          variant={"destructive"}
          className="rounded-md border p-2"
          type="submit"
        >
          <div>
            <span className="sr-only">Delete Transaction</span>
            <TrashIcon className="w-5" />
          </div>
        </Button>
      </form>
    </>
  );
}
