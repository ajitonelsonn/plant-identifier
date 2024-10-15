import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../utils/db";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);

    // The token only contains userId, so we need to fetch the username from the database
    const result = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [payload.userId]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];

    return NextResponse.json({
      isAuthenticated: true,
      id: payload.userId,
      username: user.username,
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
