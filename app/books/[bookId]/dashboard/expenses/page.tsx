import { getExpensePages } from "@/app/lib/actions/expenses/actions";
import { AddExpense } from "@/app/ui/expenses/buttons";
import ExpenseTable from "@/app/ui/expenses/expense-table";
import { ExpenseTableSkeleton } from "@/app/ui/expenses/skeletons";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import { DatePickerWithRange } from "@/app/ui/search-by-date";
import { Suspense } from "react";
import { DateRange } from "react-day-picker";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    bookId: number;
  };
  searchParams?: {
    page?: number;
    startDate?: string;
    endDate?: string;
  };
}) {
  const bookId = Number(params.bookId);
  const currentPage = Number(searchParams?.page) || 1;
  const date: DateRange = {
    from: new Date(searchParams?.startDate || new Date()),
    to: new Date(searchParams?.endDate || new Date()),
  };
  const totalPages = await getExpensePages(bookId, date);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Expenses</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4 md:mt-8">
        <DatePickerWithRange></DatePickerWithRange>
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
