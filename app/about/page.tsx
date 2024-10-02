"use client";

import React from "react";
import Link from "next/link";
import { Info, Leaf, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <nav className="bg-green-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Plant Identifier
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

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          About Plant Identifier
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Info className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Our Mission
            </h2>
            <p className="text-gray-300">
              Plant Identifier aims to connect people with nature by making
              plant identification accessible and enjoyable for everyone.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Leaf className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Technology
            </h2>
            <p className="text-gray-300">
              We use advanced AI and machine learning algorithms to accurately
              identify plants from images.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Users className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Community
            </h2>
            <p className="text-gray-300">
              Join our growing community of plant enthusiasts, gardeners, and
              nature lovers from around the world.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Our Story</h2>
          <p className="text-gray-300 mb-4">
            Plant Identifier was founded in 2024 by a group of botanists and
            tech enthusiasts who wanted to make plant identification more
            accessible to everyone. Our team combines expertise in botany,
            artificial intelligence, and user experience design to create a
            powerful yet easy-to-use plant identification tool.
          </p>
          <p className="text-gray-300">
            Whether you're a seasoned gardener, a curious hiker, or someone who
            just appreciates the beauty of plants, Plant Identifier is here to
            help you learn more about the flora around you. Join us in our
            mission to foster a deeper connection between people and the natural
            world!
          </p>
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
}
