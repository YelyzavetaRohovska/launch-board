import CardsList from "@/components/CardsList";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Fetch from "@/services/fetch";
import { Suspense } from "react";

interface HomeProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Home({
  searchParams
}: HomeProps) {
  const query = searchParams?.query ?? "";
  const page = Number(searchParams?.page) ?? 1;
  const limit = 20;

  const {data} = await Fetch.getPaginatedData("https://api.spacexdata.com/v5/launches/query", {
    options: { limit: 0 },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-4">
      <h1 className="text-3xl">Launches</h1>
      <Search />
      <Suspense key={page + query} fallback={<p>Loading...</p>}>
        <CardsList limit={limit} page={page} searchQuery={query}/>
      </Suspense>
      <Pagination totalPages={data?.totalDocs || 1} limit={limit}/>
    </main>
  );
}
