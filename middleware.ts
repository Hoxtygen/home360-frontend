import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "lib";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(token).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/api/listing/create",
    "/api/listing/delete/(.*)",
    "/api/user/(.*)",
    // "/api/user/:path*"
  ],
};
