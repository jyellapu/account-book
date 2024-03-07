import { getCardData } from "@/app/lib/actions/dashboard/actions";
import { formatCurrency } from "@/app/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BanknoteIcon,
  ClockIcon,
  CreditCardIcon,
  UsersIcon,
} from "lucide-react";

export const iconMap = {
  collected: BanknoteIcon,
  pending: ClockIcon,
  accounts: CreditCardIcon,
  customers: UsersIcon,
};

export default async function CardWrapper({ bookId }: { bookId: number }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const {
    totalCustomers,
    totalOpenAccounts,
    totalAmountCollected,
    totalAmountPending,
  } = await getCardData(bookId);
  return (
    <>
      <InfoCard
        title="Collected"
        value={formatCurrency(totalAmountCollected)}
        iconType="collected"
      ></InfoCard>
      <InfoCard
        title="Pending"
        value={formatCurrency(totalAmountPending)}
        iconType="pending"
      ></InfoCard>
      <InfoCard
        title="Total Open Accounts"
        value={totalOpenAccounts}
        iconType="accounts"
      ></InfoCard>
      <InfoCard
        title="Total Customers"
        value={totalCustomers}
        iconType="customers"
      ></InfoCard>
    </>
  );
}

export function InfoCard({
  title,
  value,
  iconType,
}: {
  title: string;
  value: number | string;
  iconType: "collected" | "pending" | "accounts" | "customers";
}) {
  const Icon = iconMap[iconType];
  return (
    <Card className="bg-secondary rounded-xl p-2 shadow-sm">
      <CardHeader className="p-4">
        <CardTitle className="">
          <div className="flex">
            {Icon ? <Icon className="h-5 w-5" /> : null}
            <h3 className="ml-2 text-sm font-normal tracking-wide">{title}</h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="truncate rounded-xl bg-background">
        <p className="truncate rounded-xl px-4 py-8 text-center text-xl font-medium">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
