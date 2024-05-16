import { NextRequest } from 'next/server';
import { getSession, updateSession } from '@/app/lib';

export async function middleware(request: NextRequest) {
  // await updateSession(request);
  //   const session = await getSession();
  //   if (!session && request.nextUrl.pathname !== '/') {
  //     return Response.redirect(new URL('/', request.url));
  //   }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
