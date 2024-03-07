import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { iconMap } from "./cards";

export function CardWrapperSkeleton() {
  return (
    <>
      <InfoCardSkeletion title="Collected" iconType="collected" />
      <InfoCardSkeletion title="Pending" iconType="pending" />
      <InfoCardSkeletion title="Accounts" iconType="accounts" />
      <InfoCardSkeletion title="Customers" iconType="customers" />
    </>
  );
}

function InfoCardSkeletion({
  title,
  iconType,
}: {
  title: string;
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
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="truncate rounded-xl bg-background">
        <div className="px-4 py-8 flex items-center justify-center">
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </CardContent>
    </Card>
  );
}
