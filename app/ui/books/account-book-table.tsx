import { getFilteredAccountBooks } from "@/app/lib/actions/books/actions";
import AccountBookCard from "./account-book-card";

export default async function AccountBookTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
  const books = await getFilteredAccountBooks(query, currentPage);
  console.log(books);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          {books.map((book) => (
            <div key={book.id}>
              <AccountBookCard book={book}></AccountBookCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
