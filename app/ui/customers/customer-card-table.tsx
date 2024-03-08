import { getFilteredCustomers } from "@/app/lib/actions/customers/actions";
import CustomerCard from "./customer-card";

export default async function CustomerCardTable({
  bookId,
  query,
  currentPage,
}: {
  bookId: number;
  query: string;
  currentPage: number;
}) {
  const customers = await getFilteredCustomers(bookId, query, currentPage);
  console.log(customers);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-md bg-secondary/40 p-2">
          {customers.map((customer) => (
            <div key={customer.id}>
              <CustomerCard bookId={bookId} customer={customer}></CustomerCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
