import { defaultAvatarUrl } from "@/app/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Book } from "@/app/lib/definitions";
import Link from "next/link";
import { DeleteBook, UpdateBook } from "./buttons";

export default function AccountBookCard({ book }: { book: Book }) {
  return (
    <div className="w-full rounded-md p-4 bg-secondary mb-2 md:mb-4 hover:bg-secondary/80">
      <div className="flex items-center justify-between gap-1">
        <div className="flex-grow">
          <Link href={`/books/${book.id}/dashboard`}>
            <div className="flex items-center">
              <Avatar className="mr-4 border border-background">
                <AvatarImage src={defaultAvatarUrl(book.name)}></AvatarImage>
              </Avatar>
              <p>{book.name}</p>
            </div>
          </Link>
        </div>
        <div className="flex justify-end gap-2 md:gap-4">
          <UpdateBook id={book.id} />
          <DeleteBook id={book.id} />
        </div>
      </div>
    </div>
  );
}
