import { NextResponse } from "next/server";
import { pool } from "../../utils/db";
import nodemailer from "nodemailer";

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database with expiration time (15 minutes)
    await pool.query(
      "INSERT INTO otp_codes (email, code, expires_at) VALUES ($1, $2, NOW() + INTERVAL '15 minutes')",
      [email, otp]
    );

    // Send OTP via email
    await transporter.sendMail({
      from: '"PLANTIDEN" <noreply@plantiden.com>',
      to: email,
      subject: "Your PLANTIDEN Registration OTP",
      text: `Your OTP for PLANTIDEN registration is: ${otp}. This code will expire in 15 minutes.`,
      html: `<p>Your OTP for PLANTIDEN registration is: <strong>${otp}</strong></p><p>This code will expire in 15 minutes.</p>`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
