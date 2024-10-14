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

-- Create index on users.username for faster lookups
CREATE INDEX idx_users_username ON users(username);

-- Create index on users.email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index on plant_identifications.user_id for faster lookups
CREATE INDEX idx_plant_identifications_user_id ON plant_identifications(user_id);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column for users
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a trigger to automatically update the updated_at column for plant_identifications
CREATE TRIGGER update_plant_identifications_updated_at
BEFORE UPDATE ON plant_identifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();