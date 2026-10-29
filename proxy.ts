import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isProtectedPage =
    pathname.startsWith("/watch-list") || pathname.startsWith("/movie");

  // If user is already logged in and tries to access /sign-in or /sign-up, redirect to home
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and tries to access a protected page, redirect to /sign-in
  if (isProtectedPage && !sessionCookie) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/watch-list/:path*",
    "/movie/:path*",
  ],
};
