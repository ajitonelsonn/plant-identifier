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

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow access to all pages without authentication
  if (!token) {
    return NextResponse.next();
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.log("Token verification failed", error);
    // Instead of redirecting, we'll just clear the invalid token
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
