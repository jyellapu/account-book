import { updateBook } from "@/app/lib/actions/books/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@prisma/client";
import Link from "next/link";

export default function Form({ book }: { book: Book }) {
  const updateBookWithId = updateBook.bind(null, book.id);
  return (
    <form action={updateBookWithId}>
      <div className="rounded-md bg-secondary/40 p-4 md:p-8">
        <div className="mb-4">
          <Label htmlFor="firstname" className="mb-2 block text-sm font-medium">
            Account Book Name
          </Label>
          <Input
            id="book name"
            name="name"
            type="text"
            placeholder="Enter account book name"
            className=""
            defaultValue={book.name}
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/books">Cancel</Link>
        </Button>
        <Button type="submit">Edit Book</Button>
      </div>
    </form>
  );
}
