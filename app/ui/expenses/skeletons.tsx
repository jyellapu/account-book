import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ExpenseTableSkeleton() {
  return (
    <div className="md:block mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of expenses</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="h-4 w-[75px]" />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="h-4 w-[75px]" />
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-2 md:gap-4">
          <Skeleton className="h-4 w-[25px]" />
          <Skeleton className="h-4 w-[25px]" />
        </div>
      </TableCell>
    </TableRow>
  );
}
