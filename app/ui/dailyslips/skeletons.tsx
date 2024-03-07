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

export function DailySlipsTableSkeleton() {
  return (
    <div className="md:block mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of transactions</TableCaption>
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
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
    </TableRow>
  );
}
