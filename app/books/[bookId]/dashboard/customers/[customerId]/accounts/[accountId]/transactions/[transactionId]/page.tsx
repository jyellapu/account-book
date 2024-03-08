import { getTransactionById } from "@/app/lib/actions/transactions/actions";
import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/transactions/edit-form";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    bookId: number;
    customerId: number;
    accountId: number;
    transactionId: number;
  };
}) {
  const bookId = Number(params.bookId);
  const customerId = Number(params.customerId);
  const accountId = Number(params.accountId);
  const transactionId = Number(params.transactionId);
  const transaction = await getTransactionById(
    bookId,
    customerId,
    accountId,
    transactionId
  );
  if (!transaction) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Edit Transaction</h1>
      </div>
      <Form
        bookId={bookId}
        customerId={customerId}
        accountId={accountId}
        transaction={transaction}
      ></Form>
    </div>
  );
}
