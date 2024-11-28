import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/esa", "/admin", "/app/:path*"], // Routes that require authentication and role checking
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const userRole = token?.role;

  if (req.url.includes("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  if (req.url.includes("/esa") && userRole !== "user" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}
