import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-green-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Plant Identifier 🇹🇱
        </Link>
        <ul className="flex space-x-4">
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
        </ul>
      </div>
    </nav>
  );
}
