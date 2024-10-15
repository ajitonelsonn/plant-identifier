import { NextResponse } from "next/server";
import { pool } from "../../utils/db";

export async function POST(req: Request) {
  const { username, email } = await req.json();

  try {
    // Check if user already exists
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "Username or email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Username and email are available",
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
