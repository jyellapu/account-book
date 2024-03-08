import { BackButton } from "@/app/ui/buttons";
import CardWrapper from "@/app/ui/dashboard/cards";
import { CardWrapperSkeleton } from "@/app/ui/dashboard/skeletons";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";

export default function Page({ params }: { params: { bookId: number } }) {
  const bookId = Number(params.bookId);
  return (
    <main>
      <div className="flex items-center mb-4">
        <BackButton href={`/books`} />
        <h1 className={`${lusitana.className} text-xl`}>Dashboard</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense key={bookId} fallback={<CardWrapperSkeleton />}>
          <CardWrapper bookId={bookId}></CardWrapper>
        </Suspense>
      </div>
    </main>
  );
}
