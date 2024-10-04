"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        <div className="w-1/2 relative">
          <Image
            src="/plant-background.jpg"
            alt="Plant background"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-green-900 bg-opacity-70 flex flex-col justify-center items-center text-white p-8">
            <div className="text-4xl font-bold mb-4 flex items-center">
              PLANTIDEN
              <svg
                className="w-8 h-8 ml-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7,17.5C7,16.12 8.12,15 9.5,15C10.88,15 12,16.12 12,17.5C12,18.88 10.88,20 9.5,20C8.12,20 7,18.88 7,17.5M16.5,15C17.88,15 19,16.12 19,17.5C19,18.88 17.88,20 16.5,20C15.12,20 14,18.88 14,17.5C14,16.12 15.12,15 16.5,15M16.5,3C19.58,3 22,5.42 22,8.5C22,11.58 19.58,14 16.5,14C13.42,14 11,11.58 11,8.5C11,5.42 13.42,3 16.5,3M7.5,3C10.58,3 13,5.42 13,8.5C13,11.58 10.58,14 7.5,14C4.42,14 2,11.58 2,8.5C2,5.42 4.42,3 7.5,3Z" />
              </svg>
            </div>
            <p className="text-center text-sm">
              Join our community of plant enthusiasts and start identifying
              plants today!
            </p>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-green-800 mb-2">
            Sign Up
          </h2>
          <p className="text-gray-600 mb-8">Create your Planto account</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}