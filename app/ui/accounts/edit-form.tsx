import { updateAccount } from "@/app/lib/actions/accounts/actions";
import { Account } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AccountStatusType, PaymentType } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

export default function Form({
  bookId,
  customerId,
  account,
}: {
  bookId: number;
  customerId: number;
  account: Account;
}) {
  const updateAccountWithId = updateAccount.bind(null, account.id);
  return (
    <form action={updateAccountWithId}>
      <div className="rounded-md bg-secondary/40 p-4 md:p-8">
        <div className="hidden mb-4">
          <Label htmlFor="bookId" className="mb-2 block text-sm font-medium">
            Book Id
          </Label>
          <Input
            id="bookId"
            name="bookId"
            type="number"
            className=""
            defaultValue={bookId}
            required
          />
        </div>
        <div className="hidden mb-4">
          <Label
            htmlFor="customerId"
            className="mb-2 block text-sm font-medium"
          >
            Customer Id
          </Label>
          <Input
            id="customerId"
            name="customerId"
            type="number"
            className=""
            defaultValue={customerId}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter Amount"
            className="remove-arrow"
            defaultValue={account.amount}
            min={1}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="openeddate"
            className="mb-2 block text-sm font-medium"
          >
            Opened Date
          </Label>
          <Input
            id="openeddate"
            name="openedAt"
            type="date"
            placeholder="Enter account opened date"
            className="invert-cal-color"
            defaultValue={format(account.openedAt, "yyyy-MM-dd")}
            max={format(new Date(), "yyyy-MM-dd")}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="duedate" className="mb-2 block text-sm font-medium">
            Due Date
          </Label>
          <Input
            id="duedate"
            name="dueDate"
            type="date"
            placeholder="Enter account due date"
            defaultValue={format(account.dueDate, "yyyy-MM-dd")}
            className="invert-cal-color"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </Label>
          <RadioGroup id="status" name="status" defaultValue={account.status}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={AccountStatusType.OPEN} id="open" />
              <Label htmlFor="open">Open</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={AccountStatusType.CLOSED} id="closed" />
              <Label htmlFor="closed">Closed</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="paymenttype"
            className="mb-2 block text-sm font-medium"
          >
            Payment Type
          </Label>
          <RadioGroup
            id="paymenttype"
            name="paymentType"
            defaultValue={account.paymentType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PaymentType.CASH} id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={PaymentType.UPI} id="upi" />
              <Label htmlFor="upi">UPI</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link
            href={`/books/${bookId}/dashboard/customers/${customerId}/accounts`}
          >
            Cancel
          </Link>
        </Button>
        <Button type="submit">Edit Account</Button>
      </div>
    </form>
  );
}
