import { getCustomerById } from "@/app/lib/actions/customers/actions";
import Form from "@/app/ui/customers/edit-form";
import { lusitana } from "@/app/ui/fonts";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    bookId: number;
    customerId: number;
  };
}) {
  const bookId = Number(params.bookId);
  const customerId = Number(params.customerId);
  const customer = await getCustomerById(bookId, customerId);

  if (!customer) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Edit Customer</h1>
      </div>
      <Form bookId={bookId} customer={customer}></Form>
    </div>
  );
}
