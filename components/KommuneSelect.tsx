'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function KommuneSelect(props: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const votes = props.votes;

  function handleSelect(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('kommune', term);
    } else {
      params.delete('kommune');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="my-2 flex flex-col gap-1">
      <label htmlFor="kommune">Velg kommune</label>
      <select
        className="border rounded-lg p-2"
        name="kommune"
        id="kommune"
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
      >
        {votes.map((vote: any) => (
          <option key={vote.kommune} value={vote.kommune}>
            {vote.kommune}
          </option>
        ))}
      </select>
    </div>
  );
}
