import { getFilteredTransactions } from "@/app/lib/actions/transactions/actions";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteTransaction, UpdateTransaction } from "./buttons";

export default async function TransactionTable({
  bookId,
  customerId,
  accountId,
  currentPage,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
  currentPage: number;
}) {
  const transactions = await getFilteredTransactions(
    bookId,
    customerId,
    accountId,
    currentPage
  );
  return (
    <div className="md:block mt-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Created By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToLocal(transaction.date)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>{transaction.paymentType}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {transaction.createdByStaff
                        ? transaction.createdByStaff.firstName +
                          " " +
                          transaction.createdByStaff?.lastName
                        : "--"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2 md:gap-4">
                        <UpdateTransaction
                          bookId={bookId}
                          customerId={customerId}
                          accountId={accountId}
                          transactionId={transaction.id}
                        />
                        <DeleteTransaction
                          bookId={bookId}
                          customerId={customerId}
                          accountId={accountId}
                          transactionId={transaction.id}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
