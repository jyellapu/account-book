import { updateTransaction } from "@/app/lib/actions/transactions/actions";
import { Transaction } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import Link from "next/link";

export default function Form({
  bookId,
  customerId,
  accountId,
  transaction,
}: {
  bookId: number;
  customerId: number;
  accountId: number;
  transaction: Transaction;
}) {
  const updateTransactionWithId = updateTransaction.bind(null, transaction.id);
  return (
    <form action={updateTransactionWithId}>
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
          <Label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Customer Id
          </Label>
          <Input
            id="customer"
            name="customerId"
            type="number"
            className=""
            defaultValue={customerId}
            required
          />
        </div>
        <div className="hidden mb-4">
          <Label htmlFor="account" className="mb-2 block text-sm font-medium">
            Account Id
          </Label>
          <Input
            id="account"
            name="accountId"
            type="number"
            className=""
            defaultValue={accountId}
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
            defaultValue={transaction.amount}
            min={1}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder="Enter transaction date"
            className="invert-cal-color"
            defaultValue={format(transaction.date, "yyyy-MM-dd")}
            max={format(new Date(), "yyyy-MM-dd")}
            required
          />
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
            defaultValue={transaction.paymentType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CASH" id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="UPI" id="upi" />
              <Label htmlFor="upi">UPI</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link
            href={`/books/${bookId}/dashboard/customers/${customerId}/accounts/${accountId}/transactions`}
          >
            Cancel
          </Link>
        </Button>
        <Button type="submit">Edit Transaction</Button>
      </div>
    </form>
  );
}
