import {
  getExpensePages,
  getFilteredExpensesTotal,
} from "@/app/lib/actions/expenses/actions";
import { formatCurrency } from "@/app/lib/utils";
import { EmptyScreen } from "@/app/ui/empty-screen";
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
    from: new Date(
      new Date(searchParams?.startDate || new Date()).setUTCHours(0, 0, 0, 0)
    ),
    to: new Date(
      new Date(searchParams?.endDate || new Date()).setUTCHours(0, 0, 0, 0)
    ),
  };
  const totalPages = await getExpensePages(bookId, date);
  const expenseTotal = await getFilteredExpensesTotal(bookId, date);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Expenses</h1>
      </div>
      <div className="mt-4 md:mt-8 w-full">
        <p
          className={`${lusitana.className} text-center md:text-left`}
        >{`Total : ${formatCurrency(expenseTotal)}`}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 md:justify-end">
        <DatePickerWithRange></DatePickerWithRange>
        <AddExpense bookId={bookId} />
      </div>
      <Suspense key={bookId} fallback={<ExpenseTableSkeleton />}>
        {!totalPages ? (
          <EmptyScreen headline="There are no expenses"></EmptyScreen>
        ) : (
          <ExpenseTable
            bookId={bookId}
            date={date}
            currentPage={currentPage}
          ></ExpenseTable>
        )}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
