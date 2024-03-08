"use client";

import { State, addAccount } from "@/app/lib/actions/accounts/actions";
import { DEFAULT_DUE_DATE_INTERVAL_IN_DAYS } from "@/app/lib/constants";
import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AccountStatusType, PaymentType } from "@prisma/client";
import { format } from "date-fns";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Page({
  params,
}: {
  params: { bookId: number; customerId: number };
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addAccount, initialState);
  const today = new Date();
  const defaultOpenedDate = format(today, "yyyy-MM-dd");
  const defaultDueDate = format(
    new Date().setDate(today.getDate() + DEFAULT_DUE_DATE_INTERVAL_IN_DAYS),
    "yyyy-MM-dd"
  );
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Add Account</h1>
      </div>
      <form action={dispatch}>
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
              defaultValue={params.bookId}
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
              defaultValue={params.customerId}
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
              defaultValue={defaultOpenedDate}
              max={format(today, "yyyy-MM-dd")}
              className="invert-cal-color"
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
              defaultValue={defaultDueDate}
              type="date"
              placeholder="Enter account due date"
              className="invert-cal-color"
            />
          </div>
          <div className="hidden mb-4">
            <Label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </Label>
            <RadioGroup
              id="status"
              name="status"
              defaultValue={AccountStatusType.OPEN}
            >
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
              defaultValue={PaymentType.CASH}
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
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.message && (
              <>
                <AlertCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button asChild variant="secondary">
            <Link
              href={`/books/${params.bookId}/dashboard/customers/${params.customerId}/accounts`}
            >
              Cancel
            </Link>
          </Button>
          <Button type="submit">Add Account</Button>
        </div>
      </form>
    </div>
  );
}
