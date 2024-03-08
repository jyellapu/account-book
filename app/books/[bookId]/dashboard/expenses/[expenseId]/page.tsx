import { getExpenseById } from "@/app/lib/actions/expenses/actions";
import Form from "@/app/ui/expenses/edit-form";
import { lusitana } from "@/app/ui/fonts";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    bookId: number;
    expenseId: number;
  };
}) {
  const bookId = Number(params.bookId);
  const expenseId = Number(params.expenseId);
  const expense = await getExpenseById(bookId, expenseId);

  if (!expense) {
    notFound();
  }
  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-xl`}>Edit Expense</h1>
      </div>
      <Form bookId={bookId} expense={expense}></Form>
    </div>
  );
}
