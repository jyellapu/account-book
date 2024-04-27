import { getCustomerAccountById } from "@/app/lib/actions/accounts/actions";
import { getCustomerById } from "@/app/lib/actions/customers/actions";
import {
  getCustomerPaidAmount,
  getTransactionPages,
} from "@/app/lib/actions/transactions/actions";
import { BackButton } from "@/app/ui/buttons";
import { EmptyScreen } from "@/app/ui/empty-screen";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import AccountDetailsCard from "@/app/ui/transactions/account-details-card";
import { AddTransaction } from "@/app/ui/transactions/buttons";
import {
  AccountDetailsCardSkeleton,
  TransactionsTableSkeleton,
} from "@/app/ui/transactions/skeletons";
import TransactionTable from "@/app/ui/transactions/transactions-table";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    bookId: number;
    customerId: number;
    accountId: number;
  };
  searchParams?: {
    page?: number;
  };
}) {
  const bookId = Number(params.bookId);
  const customerId = Number(params.customerId);
  const accountId = Number(params.accountId);
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTransactionPages(bookId, customerId, accountId);
  const customer = await getCustomerById(bookId, customerId);
  const account = await getCustomerAccountById(bookId, customerId, accountId);
  const totalAmountPaid = await getCustomerPaidAmount(
    bookId,
    customerId,
    accountId
  );
  return (
    <div className="w-full">
      <div className="flex w-full items-center">
        <BackButton
          href={`/books/${bookId}/dashboard/customers/${customerId}/accounts`}
        />
        <h1
          className={`${lusitana.className} text-xl whitespace-nowrap truncate`}
        >
          {customer?.firstName ? customer.firstName + "'s" : ""} Account
          Transactions
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <AddTransaction
          bookId={bookId}
          customerId={customerId}
          accountId={accountId}
        />
      </div>
      <Suspense
        key={`${bookId}-${customerId}-${accountId}-account-details`}
        fallback={<AccountDetailsCardSkeleton />}
      >
        <AccountDetailsCard
          account={account}
          totalAmountPaid={totalAmountPaid}
        />
      </Suspense>
      <Suspense
        key={`${bookId}-${customerId}-${accountId}-transaction-table`}
        fallback={<TransactionsTableSkeleton />}
      >
        {!totalPages ? (
          <EmptyScreen headline="There are no transactions"></EmptyScreen>
        ) : (
          <TransactionTable
            bookId={bookId}
            customerId={customerId}
            accountId={accountId}
            currentPage={currentPage}
          ></TransactionTable>
        )}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
