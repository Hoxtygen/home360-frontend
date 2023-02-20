import { verifyAuth } from "lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export class AuthError extends Error {}
export default async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new AuthError("Missing user token");
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
  matcher: ["/api/listing/create", "/api/user/listings", "/api/user/users"],
};
