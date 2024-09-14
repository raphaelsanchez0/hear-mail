import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the paths that should be protected
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If the path is protected and there is no token, redirect to the login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/dashboard", "/profile", "/settings"], // Only run on these paths
};
