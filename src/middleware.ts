import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_COOKIE!)?.value;
  const allowedPagesCookie = request.cookies.get(
    process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE!
  )?.value;

  const allowedPages: string[] = allowedPagesCookie ? JSON.parse(allowedPagesCookie) : [];
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ['/login', '/forgot-password', '/otp', '/reset-password'];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(allowedPages[0] || '/', request.url));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && !isPublicRoute && allowedPages.length > 0 && !allowedPages.includes(pathname)) {
    return NextResponse.redirect(new URL(allowedPages[0], request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
