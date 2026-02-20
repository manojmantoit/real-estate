import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const auth = req.cookies.get("auth")?.value;
  const { pathname } = req.nextUrl;

  const isPublic = pathname.startsWith("/login") || pathname.startsWith("/api/auth");
  if (!auth && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
