import { NextResponse } from "next/server";
import { pool } from "../../utils/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    // Verify OTP
    const otpResult = await pool.query(
      "SELECT * FROM password_reset_otps WHERE email = $1 AND otp = $2 AND expires_at > NOW()",
      [email, otp]
    );

    if (otpResult.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update user's password
    await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [
      passwordHash,
      email,
    ]);

    // Delete used OTP
    await pool.query("DELETE FROM password_reset_otps WHERE email = $1", [
      email,
    ]);

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
