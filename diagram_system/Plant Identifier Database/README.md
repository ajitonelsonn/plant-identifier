# Plant Identifier Database

This is an overview of the database structure for the Plant Identifier application. The database is designed to support user management, plant identification tracking, and secure authentication processes.

![Entity Relationship Diagram](/diagram_system/Plant%20Identifier%20Database/Entity_Relationship_Diagram.png)

## Database Schema

The database consists of four main tables:

1. `users`
2. `plant_identifications`
3. `otp_codes`
4. `password_reset_otps`

### Entity-Relationship Diagram

Here's a simplified representation of the database structure:

```
USERS ||--o{ PLANT_IDENTIFICATIONS
USERS ||--o{ OTP_CODES
USERS ||--o{ PASSWORD_RESET_OTPS
```

This diagram shows that:

- A User can have multiple Plant Identifications
- A User can have multiple OTP Codes
- A User can have multiple Password Reset OTPs

## Table Descriptions

### Users

The `users` table stores information about registered users of the Plant Identifier application.

Key fields:

- `id`: Primary key
- `username`: Unique username for the user
- `email`: Unique email address
- `password_hash`: Hashed password for security
- `first_name`, `last_name`, `display_name`: User's name information
- `date_of_birth`, `gender`, `location`: Additional user details
- `avatar_url`: URL to user's profile picture
- `bio`: User's biography or description
- `created_at`, `updated_at`: Timestamps for record creation and last update
- `last_login`: Timestamp of the user's last login

### Plant Identifications

The `plant_identifications` table records the plants identified by users.

Key fields:

- `id`: Primary key
- `user_id`: Foreign key referencing the `users` table
- `plant_name`: Name of the identified plant
- `scientific_name`: Scientific name of the plant
- `family`: Plant family
- `care_level`: Required care level for the plant
- `description`: Additional details about the plant
- `identified_at`: Timestamp of when the plant was identified

### OTP Codes

The `otp_codes` table manages one-time password codes for user authentication.

Key fields:

- `id`: Primary key
- `email`: User's email address
- `code`: The OTP code
- `created_at`: Timestamp of when the OTP was created
- `expires_at`: Timestamp of when the OTP expires

### Password Reset OTPs

The `password_reset_otps` table handles one-time password codes specifically for password reset requests.

Key fields:

- `id`: Primary key
- `email`: User's email address
- `otp`: The OTP code for password reset
- `created_at`: Timestamp of when the reset OTP was created
- `expires_at`: Timestamp of when the reset OTP expires

## Indexes

To optimize query performance, the following indexes are created:

- `idx_users_username` on `users(username)`
- `idx_users_email` on `users(email)`
- `idx_plant_identifications_user_id` on `plant_identifications(user_id)`
- `idx_otp_codes_email_expires` on `otp_codes(email, expires_at)`
- `idx_password_reset_otps_email_expires` on `password_reset_otps(email, expires_at)`

## Triggers and Functions

The database includes triggers and functions to:

1. Automatically update the `updated_at` column when a record is modified in the `users` and `plant_identifications` tables.
2. Automatically delete expired OTPs from both `otp_codes` and `password_reset_otps` tables.

These ensure data integrity and clean up expired records without manual intervention.

## Security Considerations

- Passwords are stored as hashes, not plain text, in the `users` table.
- OTP codes have expiration times to limit their validity period.
- Unique constraints on `username` and `email` in the `users` table prevent duplicate registrations.
