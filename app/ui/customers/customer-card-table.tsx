import { getFilteredCustomers } from "@/app/lib/actions/customer/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DeleteCustomer, UpdateCustomer } from "./buttons";
import { AVATAR_FALLBACK } from "@/app/lib/constants";
import { defaultAvatarUrl } from "@/app/lib/utils";

export default async function CustomerCardTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
  const customers = await getFilteredCustomers(query, currentPage);
  console.log(customers);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          <div className="md2:hidden">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="w-full rounded-md p-4 bg-secondary cursor-pointer mb-2 md:mb-4 hover:bg-secondary/80"
              >
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <Link href="/">
                      <div className="flex items-center">
                        <Avatar className="mr-4 border border-background">
                          <AvatarImage
                            src={defaultAvatarUrl(
                              customer.firstName + " " + customer.lastName
                            )}
                          ></AvatarImage>
                          {/* <AvatarFallback></AvatarFallback> */}
                        </Avatar>
                        <p>{customer.firstName + " " + customer.lastName}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex justify-end gap-2 md:gap-4">
                    <UpdateCustomer id={customer.id} />
                    <DeleteCustomer id={customer.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
