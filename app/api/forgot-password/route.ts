import { NextResponse } from "next/server";
import { pool } from "../../utils/db";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if the email exists in the database
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const otp = generateOTP();

    // Store OTP in database with expiration time (15 minutes)
    await pool.query(
      "INSERT INTO password_reset_otps (email, otp, expires_at) VALUES ($1, $2, NOW() + INTERVAL '15 minutes')",
      [email, otp]
    );

    const templatePath = path.join(
      process.cwd(),
      "email-templates",
      "forgot-password-template.html"
    );
    let emailTemplate = await fs.readFile(templatePath, "utf8");
    emailTemplate = emailTemplate.replace("{OTP}", otp);

    // Send OTP via email
    await transporter.sendMail({
      from: '"PLANTIDEN" <noreply@plantiden.com>',
      to: email,
      subject: "PLANTIDEN Password Reset",
      html: emailTemplate,
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
