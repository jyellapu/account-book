import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Link from "next/link";
import { Suspense } from "react";
import { getAccountBooksPages } from "../lib/actions/books/actions";
import AccountBookLogo from "../ui/account-logo";
import AccountBookTable from "../ui/books/account-book-table";
import { AddBook } from "../ui/books/buttons";
import { AccountBookCardTableSkeleton } from "../ui/books/skeletons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getAccountBooksPages(query);

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
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-xl`}>Account Books</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search account books..." />
          <AddBook />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<AccountBookCardTableSkeleton />}
        >
          <AccountBookTable
            query={query}
            currentPage={currentPage}
          ></AccountBookTable>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
