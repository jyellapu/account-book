import { updateCustomer } from "@/app/lib/actions/customer/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// Todo: add customer definition to /lib/definitions
export default function Form({
  customer,
}: {
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
}) {
  console.log(customer);
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  return (
    <form action={updateCustomerWithId}>
      <div className="rounded-md bg-secondary/40 p-4 md:p-8">
        <div className="mb-4">
          <Label htmlFor="firstname" className="mb-2 block text-sm font-medium">
            First Name
          </Label>
          <Input
            id="firstname"
            name="firstName"
            type="text"
            placeholder="Enter customer's first name"
            className=""
            defaultValue={customer.firstName}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="secondname"
            className="mb-2 block text-sm font-medium"
          >
            Last Name
          </Label>
          <Input
            id="lastname"
            name="lastName"
            type="text"
            placeholder="Enter customer's last name"
            className=""
            defaultValue={customer.lastName}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="mobilenumber"
            className="mb-2 block text-sm font-medium"
          >
            Mobile Number
          </Label>
          <Input
            id="mobilenumber"
            name="mobileNumber"
            type="text"
            pattern="[0-9]{10}"
            placeholder="Enter customer's phone number"
            className=""
            defaultValue={customer.mobileNumber}
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/dashboard/customers">Cancel</Link>
        </Button>
        <Button type="submit">Edit customer</Button>
      </div>
    </form>
  );
}
