"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Mail, Lock, User, MapPin, Calendar, Users } from "lucide-react";
import { AppError } from "../types/errors";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
    dateOfBirth: "",
    gender: "",
    location: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async () => {
    const response = await fetch("/api/check-availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(
        data.message || "Username or email is not available",
        "AVAILABILITY_CHECK_FAILED"
      );
    }
  };

  const sendOTP = async () => {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new AppError(
        data.message || "Failed to send OTP",
        "OTP_SEND_FAILED"
      );
    }

    setOtpSent(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!otpSent) {
        // First step: check availability and send OTP
        await checkAvailability();
        await sendOTP();
      } else {
        // Second step: verify OTP and complete registration
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            displayName: formData.displayName || null,
            dateOfBirth: formData.dateOfBirth || null,
            gender: formData.gender || null,
            location: formData.location || null,
            otp,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/login?registered=true");
        } else {
          throw new AppError(
            data.message || "Registration failed. Please try again.",
            "REGISTRATION_FAILED"
          );
        }
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      if (error instanceof AppError) {
        setError(error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <Leaf className="mx-auto h-12 w-auto text-green-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create Your PLANTIDEN Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our community of plant enthusiasts
            </p>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {!otpSent ? (
              <>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="flex items-center border border-gray-300 rounded-t-md">
                    <User className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="username"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Username (required)"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <Mail className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Email address (required)"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <Lock className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Password (required)"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <User className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="firstName"
                      type="text"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="First Name (optional)"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <User className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="lastName"
                      type="text"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Last Name (optional)"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <User className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="displayName"
                      type="text"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Display Name (optional)"
                      value={formData.displayName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <Calendar
                      className="absolute ml-3 text-gray-400"
                      size={18}
                    />
                    <input
                      name="dateOfBirth"
                      type="date"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Date of Birth (optional)"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <Users className="absolute ml-3 text-gray-400" size={18} />
                    <select
                      name="gender"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender (optional)</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-b-md">
                    <MapPin className="absolute ml-3 text-gray-400" size={18} />
                    <input
                      name="location"
                      type="text"
                      className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                      placeholder="Location (optional)"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP sent to your email
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Leaf
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                {isLoading
                  ? "Processing..."
                  : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 transition duration-150 ease-in-out"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/plant-background.jpg"
          alt="Plant background"
          layout="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-75 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-5xl font-bold mb-4">PLANTIDEN</h1>
          <p className="text-center text-xl max-w-md">
            Join our thriving community of plant enthusiasts. Identify, learn,
            and share your passion for plants!
          </p>
        </div>
      </div>
    </div>
  );
}
