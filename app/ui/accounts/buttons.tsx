import { deleteAccount } from "@/app/lib/actions/accounts/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export function AddAccount({
  bookId,
  customerId,
}: {
  bookId: number;
  customerId: number;
}) {
  return (
    <Button asChild>
      <Link
        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/create`}
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Add Account</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateAccount({
  bookId,
  customerId,
  accountId,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
}) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link
        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}`}
      >
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteAccount({
  bookId,
  customerId,
  accountId,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
}) {
  const deleteAccountWithId = deleteAccount
    .bind(null, bookId)
    .bind(null, customerId)
    .bind(null, accountId);
  return (
    <>
      <form action={deleteAccountWithId}>
        <Button
          variant={"destructive"}
          className="rounded-md border p-2"
          type="submit"
        >
          <div>
            <span className="sr-only">Close Account</span>
            <TrashIcon className="w-5" />
          </div>
        </Button>
      </form>
    </>
  );
}
