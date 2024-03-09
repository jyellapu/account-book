import { getFilteredCustomerAccounts } from "@/app/lib/actions/accounts/actions";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountStatusType } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import AccountCard from "./account-card";
import { DeleteAccount, UpdateAccount } from "./buttons";

export default async function AccountsTable({
  bookId,
  customerId,
  currentPage,
}: {
  bookId: number;
  customerId: number;
  currentPage: number;
}) {
  const accounts = await getFilteredCustomerAccounts(
    bookId,
    customerId,
    currentPage
  );
  return (
    <div className="md:block mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="hidden min-w-full md:table">
            <Table>
              <TableCaption>Customer accounts</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Opened Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToLocal(account.openedAt)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Link
                        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${account.id}/transactions`}
                      >
                        {formatCurrency(account.amount)}
                      </Link>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToLocal(account.dueDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={clsx({
                          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
                            account.status === AccountStatusType.CLOSED,
                        })}
                      >
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{account.paymentType}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2 md:gap-4">
                        <UpdateAccount
                          bookId={bookId}
                          customerId={customerId}
                          accountId={account.id}
                        />
                        <DeleteAccount
                          bookId={bookId}
                          customerId={customerId}
                          accountId={account.id}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                bookId={bookId}
                customerId={customerId}
                account={account}
              ></AccountCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
