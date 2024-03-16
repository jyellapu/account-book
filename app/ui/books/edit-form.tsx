"use client";
import { State, updateBook } from "@/app/lib/actions/books/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@prisma/client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/ui/client-buttons";
import { AlertCircleIcon } from "lucide-react";

export default function Form({ book }: { book: Book }) {
  const initialState: State = { message: null, errors: {} };
  const updateBookWithId = updateBook.bind(null, book.id);
  const [state, dispatch] = useFormState(updateBookWithId, initialState);
  return (
    <form action={dispatch}>
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
          <Link href="/books">Cancel</Link>
        </Button>
        <SubmitButton text={"Edit Book"} />
      </div>
    </form>
  );
}
