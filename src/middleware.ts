import { NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_PATHS = ["/login", "/signup", "/admin/login", "/api/auth"];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  if (isPublic) return NextResponse.next();

  const user = req.auth?.user;

  if (pathname.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      const loginUrl = new URL("/admin/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const loginUrl = new URL("/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/auth/:path*"],
};
