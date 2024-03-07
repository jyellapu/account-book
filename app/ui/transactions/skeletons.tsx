import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CreditCardIcon } from "lucide-react";

export function TransactionsTableSkeleton() {
  return (
    <div className="md:block mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="min-w-full md:table">
            <Table>
              <TableCaption>List of transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
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
      <TableCell className="text-center">
        <div className="flex justify-center gap-2 md:gap-4">
          <Skeleton className="h-4 w-[25px]" />
          <Skeleton className="h-4 w-[25px]" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function AccountDetailsCardSkeleton() {
  return (
    <Card className="mt-6 md:mt-4 mb-6 md:mb-6">
      <CardHeader className="border-b-2 p-4 bg-secondary">
        <CardTitle className="">
          <div className="flex">
            <CreditCardIcon className="h-5 w-5" />
            <h3 className="ml-2 text-sm font-normal tracking-wide">
              {"Account details"}
            </h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center justify-between gap-4 mt-2">
          <div>
            <div className="flex flex-col items-left ">
              <p className="text-sm text-muted-foreground">{"Opened Date"}</p>
              <p>
                <Skeleton className="h-4 w-[50px] mt-2" />
              </p>
            </div>
          </div>
          <div className=" flex flex-col items-left">
            <p className="text-sm text-muted-foreground">{"Total Amount"}</p>
            <p>
              <Skeleton className="h-4 w-[50px] mt-2" />
            </p>
          </div>

          <div className=" flex flex-col items-left">
            <p className="text-sm text-muted-foreground">{"Amount Paid"}</p>
            <p>
              <Skeleton className="h-4 w-[50px] mt-2" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
