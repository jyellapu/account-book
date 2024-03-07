import { Account } from "@/app/lib/definitions";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AccountStatusType } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { DeleteAccount, UpdateAccount } from "./buttons";

export default function AccountCard({
  bookId,
  customerId,
  account,
}: {
  bookId: number;
  customerId: number;
  account: Account;
}) {
  return (
    <div className="w-full rounded-md p-4 bg-background mb-6 hover:bg-secondary/80">
      <Link
        href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${account.id}/transactions`}
      >
        <div className="flex items-center justify-between border-b-2 border-muted-foreground pb-4">
          <div>
            <div className="mb-2 flex flex-col items-center">
              <p className="text-sm text-muted-foreground">{"Opened Date"}</p>
              <p>{formatDateToLocal(account.openedAt)}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-medium">
              {formatCurrency(account.amount)}
            </p>
            <Badge
              className={clsx({
                "mt-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
                  account.status === AccountStatusType.CLOSED,
              })}
            >
              {account.status}
            </Badge>
          </div>
        </div>
      </Link>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-sm text-muted-foreground">{"Due Date"}</p>
          <p>{formatDateToLocal(account.dueDate)}</p>
        </div>
        <div className="flex justify-end gap-2 md:gap-4">
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
      </div>
    </div>
  );
}
