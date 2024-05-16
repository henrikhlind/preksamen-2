const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const poststedResponse = await Promise.all([
    prisma.poststed.upsert({
      where: { postnr: '0161' },
      update: {},
      create: {
        sted: 'Oslo',
        postnr: '0161',
      },
    }),
    prisma.poststed.upsert({
      where: { postnr: '0028' },
      update: {},
      create: {
        sted: 'Oslo',
        postnr: '0028',
      },
    }),
    prisma.poststed.upsert({
      where: { postnr: '0159' },
      update: {},
      create: {
        sted: 'Oslo',
        postnr: '0159',
      },
    }),
    prisma.poststed.upsert({
      where: { postnr: '0180' },
      update: {},
      create: {
        sted: 'Oslo',
        postnr: '0180',
      },
    }),
    prisma.poststed.upsert({
      where: { postnr: '0653' },
      update: {},
      create: {
        sted: 'Oslo',
        postnr: '0653',
      },
    }),
  ]);
  const partiResponse = await Promise.all([
    prisma.parti.upsert({
      where: { id: 1 },
      update: {},
      create: {
        navn: 'Høyre',
        adresse: 'Stortingsgata 20',
        postnr: '0161',
        epost: 'info@hoyre.no',
      },
    }),
    prisma.parti.upsert({
      where: { id: 2 },
      update: {},
      create: {
        navn: 'Arbeiderpartiet',
        adresse: 'Youngstorget 2A',
        postnr: '0028',
        epost: 'post@arbeiderpartiet.no',
      },
    }),
    prisma.parti.upsert({
      where: { id: 3 },
      update: {},
      create: {
        navn: 'Fremskrittspartiet',
        adresse: 'Karl Johans Gate 25',
        postnr: '0159',
        epost: 'frp@frp.no',
      },
    }),
    prisma.parti.upsert({
      where: { id: 4 },
      update: {},
      create: {
        navn: 'Senterpartiet',
        adresse: 'Akersgata 51',
        postnr: '0180',
        epost: 'epost@sp.no',
      },
    }),
    prisma.parti.upsert({
      where: { id: 5 },
      update: {},
      create: {
        navn: 'Sosialistisk Venstreparti',
        adresse: 'Hagegata 22',
        postnr: '0653',
        epost: 'post@sv.no ',
      },
    }),
  ]);
  console.log({ poststedResponse, partiResponse });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
