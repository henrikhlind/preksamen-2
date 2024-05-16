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
