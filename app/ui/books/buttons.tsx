import { deleteBook } from "@/app/lib/actions/books/actions";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "../client-buttons";

export function AddBook() {
  return (
    <Button asChild>
      <Link
        href="/books/create"
        className="flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="hidden md:block">Create New Book</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateBook({ id }: { id: number }) {
  return (
    <Button className="rounded-md border p-2" variant="default" asChild>
      <Link href={`/books/${id}`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteBook({ id }: { id: number }) {
  const deleteBookWithId = deleteBook.bind(null, id);
  return <DeleteButton action={deleteBookWithId} />;
}
