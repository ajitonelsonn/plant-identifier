import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);

    const result = await pool.query(
      "SELECT username, email, first_name, last_name, display_name, date_of_birth, gender, location, created_at FROM users WHERE id = $1",
      [payload.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    const userProfile = {
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      displayName: user.display_name,
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      location: user.location,
      joinDate: user.created_at,
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Error verifying token or fetching user data:", error);
    return NextResponse.json(
      { error: "Invalid token or database error" },
      { status: 401 }
    );
  }
}
