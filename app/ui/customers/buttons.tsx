import { deleteCustomer } from "@/app/lib/actions/customers/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "../client-buttons";

export function AddCustomer({ bookId }: { bookId: number }) {
  return (
    <Button asChild>
      <Link
        href={`/books/${bookId}/dashboard/customers/create`}
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Add Customer</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateCustomer({
  bookId,
  customerId,
}: {
  bookId: number;
  customerId: number;
}) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link href={`/books/${bookId}/dashboard/customers/${customerId}`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteCustomer({
  bookId,
  customerId,
}: {
  bookId: number;
  customerId: number;
}) {
  const deleteCustomerWithId = deleteCustomer.bind(null, bookId, customerId);
  return <DeleteButton action={deleteCustomerWithId} />;
}
