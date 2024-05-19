'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Suspense>
      <input
        className="w-96 p-3 border shadow-sm rounded-lg my-2"
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Søk etter parti..."
      />
    </Suspense>
  );
}
