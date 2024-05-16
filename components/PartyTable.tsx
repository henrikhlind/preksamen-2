import PartyButton from './PartyButton';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function PartyTable(props: any) {
  const parties = await prisma.parti.findMany({
    where: {
      OR: [
        { navn: { contains: props.query, mode: 'insensitive' } },
        { adresse: { contains: props.query, mode: 'insensitive' } },
        { epost: { contains: props.query, mode: 'insensitive' } },
      ],
    },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="border shadow-sm rounded-lg">
      <table className="table-fixed">
        <thead className="border-b">
          <tr className="*:p-4">
            <th className="w-20">#</th>
            <th className="w-42">Navn</th>
            <th className="w-76">Adresse</th>
            <th className="w-20 ">E-post</th>
            <th className="w-42 "></th>
          </tr>
        </thead>
        <tbody>
          {parties.length === 0 ? (
            <tr className="*:p-4 hover:bg-gray-100/40 transition-all duration-100">
              <td></td>
              <td>Fant ingen partier</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            parties.map(async (party: any) => {
              const postal = await prisma.poststed.findFirst({ where: { postnr: party.postnr } });
              const fullPostal = (postal ? postal.postnr : '') + ' ' + (postal ? postal.sted : '');
              return (
                <tr className="*:p-4 hover:bg-gray-100/40 transition-all duration-100">
                  <td>{party.id}</td>
                  <td>{party.navn}</td>
                  <td>{party.adresse + ', ' + fullPostal}</td>
                  <td>{party.epost}</td>
                  <td>
                    <PartyButton party={party} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
