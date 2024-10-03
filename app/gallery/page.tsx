"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../components/Navigation";

const plantGallery = [
  { id: 1, name: "Monstera Deliciosa", image: "/plants/monstera.jpg" },
  { id: 2, name: "Fiddle Leaf Fig", image: "/plants/fiddle-leaf-fig.jpg" },
  { id: 3, name: "Snake Plant", image: "/plants/snake-plant.jpg" },
  { id: 4, name: "Pothos", image: "/plants/pothos.jpg" },
  { id: 5, name: "ZZ Plant", image: "/plants/zz-plant.jpg" },
  { id: 6, name: "Aloe Vera", image: "/plants/aloe-vera.jpg" },
];

export default function PlantGallery() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Plant Gallery
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plantGallery.map((plant) => (
            <div
              key={plant.id}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-400">
                  {plant.name}
                </h2>
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
}
