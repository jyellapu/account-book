import { getDailySlipPages } from "@/app/lib/actions/dailyslips/actions";
import DailySlipsTable from "@/app/ui/dailyslips/dailyslips-table";
import { DailySlipsTableSkeleton } from "@/app/ui/dailyslips/skeletons";
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
  const currentPage = Number(searchParams?.page) || 1;
  const bookId = Number(params.bookId);
  const date = searchParams?.date || format(new Date(), "yyyy-MM-dd");
  const totalPages = await getDailySlipPages(bookId, date);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Daily slips</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <SearchByDate></SearchByDate>
      </div>
      <Suspense key={bookId} fallback={<DailySlipsTableSkeleton />}>
        <DailySlipsTable
          bookId={bookId}
          date={date}
          currentPage={currentPage}
        ></DailySlipsTable>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
