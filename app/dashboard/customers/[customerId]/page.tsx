import { getCustomerById } from "@/app/lib/actions/customer/actions";
import Form from "@/app/ui/customers/edit-form";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    customerId: number;
  };
}) {
  console.log("id in customers is %d", params.customerId);
  const customer = await getCustomerById(params.customerId);
  console.log(customer);
  if (!customer) {
    notFound();
  }
  return <Form customer={customer}></Form>;
}
