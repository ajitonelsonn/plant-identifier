import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "../../utils/db";

export async function POST(req: Request) {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    displayName,
    dateOfBirth,
    gender,
    location,
  } = await req.json();

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

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await pool.query(
      `INSERT INTO users (
        username, email, password_hash, first_name, last_name, 
        display_name, date_of_birth, gender, location
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        displayName,
        dateOfBirth,
        gender,
        location,
      ]
    );

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
