import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    //allow the request if the following is true

    const { pathname } = req.nextUrl;

    //   return to dashboard if user has token and try to git into login page

    if (token && pathname.includes("/login")) {
      return NextResponse.redirect("/");
    }

    //   1 - its a request for next-auth session & provider fetching
    //   2 - the token exists

    if (pathname.includes("/api/auth") || token) {
      return NextResponse.next();
    }

    //   Redirect to login if they dont have token AND are requesting a protected route

    if (!token && pathname !== "/login") {
      return NextResponse.redirect("/login");
    }
  } catch {}
}
