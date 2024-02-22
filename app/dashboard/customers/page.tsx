import Search from "@/app/ui/search";
import { AddCustomer } from "@/app/ui/customers/buttons";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import CustomerCardTable from "@/app/ui/customers/customer-card-table";
import Pagination from "@/app/ui/pagination";
import { getCustomersPages } from "@/app/lib/actions/customer/actions";
import { CustomerCardTableSkeleton } from "@/app/ui/customers/skeletons";

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
  const totalPages = await getCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <AddCustomer />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<CustomerCardTableSkeleton />}
      >
        <CustomerCardTable
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
