-- database_setup.sql

-- Create the database
CREATE DATABASE plant_identifier;

-- Connect to the database
\c plant_identifier

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    display_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    location VARCHAR(100),
    avatar_url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create plant_identifications table
CREATE TABLE plant_identifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plant_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100),
    family VARCHAR(100),
    care_level VARCHAR(50),
    description TEXT,
    identified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create OTP codes table
CREATE TABLE otp_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    CONSTRAINT unique_active_otp UNIQUE (email, code, expires_at),
    CONSTRAINT check_code_length CHECK (length(code) = 6),
    CONSTRAINT check_expiry_future CHECK (expires_at > created_at)
);

-- Create password reset OTPs table
CREATE TABLE password_reset_otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    CONSTRAINT unique_active_reset_otp UNIQUE (email, otp, expires_at)
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_plant_identifications_user_id ON plant_identifications(user_id);
CREATE INDEX idx_otp_codes_email_expires ON otp_codes (email, expires_at);
CREATE INDEX idx_password_reset_otps_email_expires ON password_reset_otps (email, expires_at);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plant_identifications_updated_at
BEFORE UPDATE ON plant_identifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a function to delete expired OTPs
CREATE OR REPLACE FUNCTION delete_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_codes WHERE expires_at < NOW();
  DELETE FROM password_reset_otps WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically delete expired OTPs
CREATE OR REPLACE FUNCTION trigger_delete_expired_otps()
RETURNS trigger AS $$
BEGIN
  PERFORM delete_expired_otps();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_expired_otps_trigger
AFTER INSERT ON otp_codes
EXECUTE FUNCTION trigger_delete_expired_otps();

CREATE TRIGGER delete_expired_reset_otps_trigger
AFTER INSERT ON password_reset_otps
EXECUTE FUNCTION trigger_delete_expired_otps();