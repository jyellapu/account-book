import { getCustomerAccountById } from "@/app/lib/actions/accounts/actions";
import Form from "@/app/ui/accounts/edit-form";
import { lusitana } from "@/app/ui/fonts";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    bookId: number;
    customerId: number;
    accountId: number;
  };
}) {
  const bookId = Number(params.bookId);
  const customerId = Number(params.customerId);
  const accountId = Number(params.accountId);
  const account = await getCustomerAccountById(bookId, customerId, accountId);
  if (!account) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Edit Account</h1>
      </div>
      <Form bookId={bookId} customerId={customerId} account={account}></Form>
    </div>
  );
}
