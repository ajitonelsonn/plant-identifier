import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { pool } from "../../utils/db";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);

    const { currentPassword, newPassword } = await req.json();

    // Fetch the user's current password hash
    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [payload.userId]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    // Verify the current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      newPasswordHash,
      payload.userId,
    ]);

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while changing the password" },
      { status: 500 }
    );
  }
}
