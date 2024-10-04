import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Token verification failed");
  }
}

// List of specific files allowed without authentication
const ALLOWED_FILES = ["/plant-background.jpg"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to specific files without authentication
  if (ALLOWED_FILES.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow access to Next.js specific files
  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.log("Token verification failed, redirecting to login", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
