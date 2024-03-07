import { Customer } from "@/app/lib/definitions";
import { defaultAvatarUrl } from "@/app/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DeleteCustomer, UpdateCustomer } from "./buttons";

export default function CustomerCard({
  bookId,
  customer,
}: {
  bookId: number;
  customer: Customer;
}) {
  const fullName = customer.firstName + " " + customer.lastName;
  return (
    <div className="w-full rounded-md p-4 bg-secondary mb-2 md:mb-4 hover:bg-secondary/80">
      <div className="flex items-center justify-between gap-1">
        <div className="flex-grow">
          <Link
            href={`/books/${bookId}/dashboard/customers/${customer.id}/accounts`}
          >
            <div className="flex items-center">
              <Avatar className="mr-4 border border-background">
                <AvatarImage src={defaultAvatarUrl(fullName)}></AvatarImage>
              </Avatar>
              <p>{fullName}</p>
            </div>
          </Link>
        </div>
        <div className="flex justify-end gap-2 md:gap-4">
          <UpdateCustomer bookId={bookId} customerId={customer.id} />
          <DeleteCustomer bookId={bookId} customerId={customer.id} />
        </div>
      </div>
    </div>
  );
}
