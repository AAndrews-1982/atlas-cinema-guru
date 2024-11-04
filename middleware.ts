// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if:
  // 1. The token exists (user is authenticated)
  // 2. The request is for an API route that starts with '/api/auth' (used for login and logout)
  if (token || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  return NextResponse.redirect(new URL('/api/auth/signin', req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
};
