import { getCustomersPages } from "@/app/lib/actions/customers/actions";
import { AddCustomer } from "@/app/ui/customers/buttons";
import CustomerCardTable from "@/app/ui/customers/customer-card-table";
import { CustomerCardTableSkeleton } from "@/app/ui/customers/skeletons";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    bookId: number;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const bookId = Number(params.bookId);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getCustomersPages(bookId, query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <AddCustomer bookId={bookId} />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<CustomerCardTableSkeleton />}
      >
        <CustomerCardTable
          bookId={bookId}
          query={query}
          currentPage={currentPage}
        ></CustomerCardTable>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
