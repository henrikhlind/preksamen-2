import PartyTable from '@/components/PartyTable';
import SearchInput from '@/components/SearchInput';
import { Suspense } from 'react';

export default function Home({ searchParams }: { searchParams?: any }) {
  const query = searchParams?.query || '';
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SearchInput />
      <Suspense fallback={<p>Henter data...</p>}>
        <PartyTable query={query} />
      </Suspense>
    </main>
  );
}
