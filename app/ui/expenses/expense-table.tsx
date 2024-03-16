import { getFilteredExpenses } from "@/app/lib/actions/expenses/actions";
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
import { DeleteExpense, UpdateExpense } from "./buttons";
import { DateRange } from "react-day-picker";

export default async function ExpenseTable({
  bookId,
  date,
  currentPage,
}: {
  bookId: number;
  date: DateRange;
  currentPage: number;
}) {
  const expenses = await getFilteredExpenses(bookId, date, currentPage);
  return (
    <div className="md:block mt-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of expenses</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Expense</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatDateToLocal(expense.date)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {expense.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2 md:gap-4">
                        <UpdateExpense bookId={bookId} expenseId={expense.id} />
                        <DeleteExpense bookId={bookId} expenseId={expense.id} />
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
