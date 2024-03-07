import { getDailySlip } from "@/app/lib/actions/dailyslips/actions";
import { formatCurrency } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DailySlipsTable({
  bookId,
  date,
  currentPage,
}: {
  bookId: number;
  date: string;
  currentPage: number;
}) {
  const transactions = await getDailySlip(bookId, date, currentPage);
  return (
    <div className="md:block mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of transaction</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Payment Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {transaction.account.customer.firstName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {transaction.paymentType}
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
