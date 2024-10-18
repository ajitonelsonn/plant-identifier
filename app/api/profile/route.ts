import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../utils/db";

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

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);

    const body = await request.json();
    if (body.confirmDelete !== "delete") {
      return NextResponse.json(
        { error: "Invalid confirmation" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Delete related records in plant_identifications
      await client.query(
        "DELETE FROM plant_identifications WHERE user_id = $1",
        [payload.userId]
      );

      // Delete user
      await client.query("DELETE FROM users WHERE id = $1", [payload.userId]);

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    // Clear the authentication cookie
    const response = NextResponse.json({
      message: "Account deleted successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token.value, secret);

    const { firstName, lastName, displayName, dateOfBirth, gender, location } =
      await req.json();

    // Update user profile
    const result = await pool.query(
      `UPDATE users 
       SET first_name = $1, last_name = $2, 
           display_name = $3, date_of_birth = $4, gender = $5, location = $6
       WHERE id = $7
       RETURNING *`,
      [
        firstName,
        lastName,
        displayName,
        dateOfBirth,
        gender,
        location,
        payload.userId,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = result.rows[0];

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        displayName: updatedUser.display_name,
        dateOfBirth: updatedUser.date_of_birth,
        gender: updatedUser.gender,
        location: updatedUser.location,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
