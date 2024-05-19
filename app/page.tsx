import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import PartyTable from '@/components/PartyTable';
import { Suspense } from 'react';
import KommuneSelect from '@/components/KommuneSelect';

export default async function Home({ searchParams }: { searchParams?: any }) {
  const query = searchParams?.query || '';
  const kommune = searchParams?.kommune || 'Fredrikstad';

  const votes = await prisma.stemme.findMany();

  return (
    <Suspense fallback={<p>Laster inn...</p>}>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-xl font-semibold my-2">Landsvisning</h1>
        <Suspense fallback={<p>Henter data...</p>}>
          <PartyTable query={query} />
        </Suspense>

        <h1 className="text-xl font-semibold mt-8 mb2">Kommunevisning</h1>

        <KommuneSelect votes={votes} />

        <Suspense fallback={<p>Henter data...</p>}>
          <PartyTable query={query} kommune={kommune} />
        </Suspense>
      </main>
    </Suspense>
  );
}
