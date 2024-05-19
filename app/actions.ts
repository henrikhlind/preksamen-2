'use server';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { login } from './lib';
import { revalidatePath } from 'next/cache';

export async function authenticate(prevState: any, formdata: FormData) {
  if (formdata.get('password') === 'eksamen') {
    login(Math.floor(Math.random() * 9000000000) + 1000000000);
    return {
      message: 'Logget inn',
      success: true,
    };
  } else {
    return {
      message: 'Feil passord',
      success: false,
    };
  }
}

export async function changeParty(prevState: any, formdata: FormData) {
  try {
    console.log(formdata.get('email'), formdata.get('postal'), formdata.get('address'), formdata.get('id'));

    await prisma.parti.update({
      where: {
        id: Number(formdata.get('id')),
      },
      data: {
        epost: formdata.get('email') as string,
        postnr: formdata.get('postal') as string,
        adresse: formdata.get('address') as string,
      },
    });

    revalidatePath('/');

    return {
      message: 'Parti endret',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Kunne ikke endre parti',
      success: false,
    };
  }
}

function checkValidPersonNr(personNr: string) {
  if (personNr.length === 11 && !isNaN(Number(personNr))) {
    let nrs = personNr.split('').map(Number);
    let k1 = 11 - ((3 * nrs[0] + 7 * nrs[1] + 6 * nrs[2] + 1 * nrs[3] + 8 * nrs[4] + 9 * nrs[5] + 4 * nrs[6] + 5 * nrs[7] + 2 * nrs[8]) % 11);
    let k2 = 11 - ((5 * nrs[0] + 4 * nrs[1] + 3 * nrs[2] + 2 * nrs[3] + 7 * nrs[4] + 6 * nrs[5] + 5 * nrs[6] + 4 * nrs[7] + 3 * nrs[8] + 2 * k1) % 11);

    if (k1 === 11) k1 = 0;
    if (k2 === 11) k2 = 0;

    return k1 < 10 && k2 < 10 && k1 == nrs[9] && k2 == nrs[10] ? true : false;
  }
}

export async function vote(prevState: any, formdata: FormData) {
  try {
    if (!checkValidPersonNr(formdata.get('personnr') as string)) {
      return {
        message: 'Ugyldig personnummer',
        success: false,
      };
    }

    if (await prisma.stemme.findFirst({ where: { personNr: formdata.get('personnr') as string } })) {
      return {
        message: 'Du har allerede stemt',
        success: false,
      };
    }

    await prisma.stemme.create({
      data: {
        personNr: formdata.get('personnr') as string,
        partiId: Number(formdata.get('id')),
        kommune: formdata.get('kommune') as string,
      },
    });

    revalidatePath('/');

    return {
      message: 'Stemme registrert',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Kunne ikke registrere stemme',
      success: false,
    };
  }
}
