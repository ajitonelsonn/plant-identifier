"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-green-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Plant Identifier 🇹🇱
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="/" className="hover:text-green-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-green-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-200">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-green-200">
              Plant Gallery
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
