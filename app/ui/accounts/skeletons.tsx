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

export function AccountTableSkeleton() {
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
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
                <TableRowSkeleton></TableRowSkeleton>
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden">
            <AccountCardsSkeleton />
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
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[40px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[40px]" />
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center gap-2 md:gap-4">
          <Skeleton className="h-4 w-[25px]" />
          <Skeleton className="h-4 w-[25px]" />
        </div>
      </TableCell>
    </TableRow>
  );
}

function AccountCardsSkeleton() {
  return (
    <>
      <AccountCardSkeletion />
      <AccountCardSkeletion />
      <AccountCardSkeletion />
      <AccountCardSkeletion />
      <AccountCardSkeletion />
    </>
  );
}

function AccountCardSkeletion() {
  return (
    <div className="w-full rounded-md p-4 bg-background mb-6 hover:bg-secondary/80">
      <div className="flex items-center justify-between border-b-2 border-muted-foreground pb-4">
        <div>
          <div className="mb-2 flex flex-col items-left">
            <p className="text-sm text-muted-foreground">{"Opened Date"}</p>
            <p>
              <Skeleton className="h-6 w-[50px] mt-2" />
            </p>
          </div>
        </div>
        <div>
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="mt-2 h-4 w-[50px]" />
        </div>
      </div>

      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div>
            <p className="text-sm text-muted-foreground">{"Due Date"}</p>
            <Skeleton className="h-6 w-[50px] mt-2" />
          </div>
        </div>
        <div className="flex justify-end gap-2 md:gap-4">
          <Skeleton className="h-4 w-[25px]" />
          <Skeleton className="h-4 w-[25px]" />
        </div>
      </div>
    </div>
  );
}
