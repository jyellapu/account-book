import { getExpensePages } from "@/app/lib/actions/expenses/actions";
import { AddExpense } from "@/app/ui/expenses/buttons";
import ExpenseTable from "@/app/ui/expenses/expense-table";
import { ExpenseTableSkeleton } from "@/app/ui/expenses/skeletons";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import SearchByDate from "@/app/ui/search-by-date";
import { format } from "date-fns";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    bookId: number;
  };
  searchParams?: {
    page?: number;
    date?: string;
  };
}) {
  const bookId = Number(params.bookId);
  const currentPage = Number(searchParams?.page) || 1;
  const date = searchParams?.date || format(new Date(), "yyyy-MM-dd");
  const totalPages = await getExpensePages(bookId, date);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Expenses</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4 md:mt-8">
        <SearchByDate></SearchByDate>
        <AddExpense bookId={bookId} />
      </div>
      <Suspense key={bookId} fallback={<ExpenseTableSkeleton />}>
        <ExpenseTable
          bookId={bookId}
          date={date}
          currentPage={currentPage}
        ></ExpenseTable>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
