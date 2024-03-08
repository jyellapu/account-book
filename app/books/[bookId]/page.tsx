import { getBookById } from "@/app/lib/actions/books/actions";
import AccountBookLogo from "@/app/ui/account-logo";
import Form from "@/app/ui/books/edit-form";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    bookId: number;
  };
}) {
  const bookId = Number(params.bookId);
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start bg-secondary text-secondary-foreground rounded-md p-4 md:h-40"
        href="/books"
      >
        <div className="w-full">
          <AccountBookLogo />
        </div>
      </Link>
      <div className="w-full p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className={`${lusitana.className} text-xl`}>Edit Account Book</h1>
        </div>
        <Form book={book}></Form>
      </div>
    </div>
  );
}
