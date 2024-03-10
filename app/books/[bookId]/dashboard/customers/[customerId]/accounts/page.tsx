import { getCustomerAccountPages } from "@/app/lib/actions/accounts/actions";
import { getCustomerById } from "@/app/lib/actions/customers/actions";
import AccountsTable from "@/app/ui/accounts/accounts-table";
import { AddAccount } from "@/app/ui/accounts/buttons";
import { AccountTableSkeleton } from "@/app/ui/accounts/skeletons";
import { BackButton } from "@/app/ui/buttons";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    bookId: number;
    customerId: number;
  };
  searchParams?: {
    page?: number;
  };
}) {
  const bookId = Number(params.bookId);
  const customerId = Number(params.customerId);
  const currentPage = Number(searchParams?.page) || 1;
  const customer = await getCustomerById(bookId, customerId);
  const totalPages = await getCustomerAccountPages(bookId, customerId);
  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <BackButton href={`/books/${bookId}/dashboard/customers/`} />
        <h1
          className={`${lusitana.className} text-xl whitespace-nowrap truncate`}
        >
          {customer?.firstName ? customer.firstName + "'s" : ""} Accounts
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <AddAccount bookId={bookId} customerId={params.customerId} />
      </div>
      <Suspense
        key={`${bookId}-${customerId}`}
        fallback={<AccountTableSkeleton />}
      >
        <AccountsTable
          bookId={bookId}
          customerId={customerId}
          currentPage={currentPage}
        ></AccountsTable>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
