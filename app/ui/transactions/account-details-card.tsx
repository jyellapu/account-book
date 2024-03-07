import { Account } from "@/app/lib/definitions";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";

export default async function AccountDetailsCard({
  account,
  totalAmountPaid,
}: {
  account?: Account | null;
  totalAmountPaid: number;
}) {
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
      <CardContent className="whitespace-nowrap overflow-x-auto">
        <div className="flex items-center justify-between gap-4 mt-2">
          <div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground ">{"Opened Date"}</p>
              <p>
                {account?.openedAt ? formatDateToLocal(account.openedAt) : "--"}
              </p>
            </div>
          </div>
          <div className=" flex flex-col items-center ">
            <p className="text-sm text-muted-foreground">{"Total Amount"}</p>
            <p>{account?.amount ? formatCurrency(account?.amount) : "--"}</p>
          </div>

          <div className=" flex flex-col items-center">
            <p className="text-sm text-muted-foreground">{"Amount Paid"}</p>
            <p>{formatCurrency(totalAmountPaid)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
