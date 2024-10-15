import { NextResponse } from "next/server";
import { pool } from "../../utils/db";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
    const otp = generateOTP();

    await pool.query(
      "INSERT INTO otp_codes (email, code, expires_at) VALUES ($1, $2, NOW() + INTERVAL '15 minutes')",
      [email, otp]
    );

    // Read the email template
    const templatePath = path.join(
      process.cwd(),
      "email-templates",
      "otp-template.html"
    );
    let emailTemplate = await fs.readFile(templatePath, "utf8");

    // Replace the OTP placeholder
    emailTemplate = emailTemplate.replace("{OTP}", otp);

    await transporter.sendMail({
      from: '"PLANTIDEN" <noreply@plantiden.com>',
      to: email,
      subject: "Your PLANTIDEN Registration OTP",
      html: emailTemplate,
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
