import {
  getDailySlipPages,
  getDailySlipTotal,
} from "@/app/lib/actions/dailyslips/actions";
import { formatCurrency } from "@/app/lib/utils";
import DailySlipsTable from "@/app/ui/dailyslips/dailyslips-table";
import { DailySlipsTableSkeleton } from "@/app/ui/dailyslips/skeletons";
import { EmptyScreen } from "@/app/ui/empty-screen";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import { DatePicker } from "@/app/ui/search-by-date";
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
  const currentPage = Number(searchParams?.page) || 1;
  const bookId = Number(params.bookId);
  const date = searchParams?.date || format(new Date(), "yyyy-MM-dd");
  const totalPages = await getDailySlipPages(bookId, date);
  const dailySlipTotal = await getDailySlipTotal(bookId, date);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Daily slips</h1>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-2 md:mt-8 md:flex-row md:justify-between ">
        <p className={`${lusitana.className}`}>{`Total : ${formatCurrency(
          dailySlipTotal
        )}`}</p>
        <DatePicker></DatePicker>
      </div>
      <Suspense key={bookId} fallback={<DailySlipsTableSkeleton />}>
        {!totalPages ? (
          <EmptyScreen headline="There are no transactions"></EmptyScreen>
        ) : (
          <DailySlipsTable
            bookId={bookId}
            date={date}
            currentPage={currentPage}
          ></DailySlipsTable>
        )}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
