// import { deleteInvoice } from '@/app/lib/actions';
import { deleteCustomer } from "@/app/lib/actions/customer/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export function AddCustomer() {
  return (
    <Button asChild>
      <Link
        href="/dashboard/customers/create"
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Add Customer</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateCustomer({ id }: { id: number }) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link href={`/dashboard/customers/${id}`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteCustomer({ id }: { id: number }) {
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
  return (
    <>
      <form action={deleteCustomerWithId}>
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
