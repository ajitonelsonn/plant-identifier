import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../utils/db";

// Function to verify JWT and extract user ID
async function getUserIdFromToken(token: string): Promise<number | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as number;
  } catch (error) {
    console.error("Failed to verify token:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const userId = await getUserIdFromToken(token.value);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const result = await pool.query(
      "SELECT id, plant_name, scientific_name, identified_at FROM plant_identifications WHERE user_id = $1 ORDER BY identified_at DESC LIMIT 10",
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "No plant identifications found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Failed to fetch plant identifications:", error);
    return NextResponse.json(
      { error: "Invalid token or database error", details: error.message },
      { status: 500 }
    );
  }
}
