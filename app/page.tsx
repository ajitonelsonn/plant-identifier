"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Layers, Grid, Sliders, Palette, FileText } from "lucide-react";
import PlantInfo from "./components/PlantInfo";
import ImageUpload from "./components/ImageUpload";

interface PlantInfoData {
  name: string;
  scientificName: string;
  family: string;
  type: string;
  careLevel: string;
  description: string;
}

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<PlantInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setIsLoading(true);
    setUploadedImage(URL.createObjectURL(imageFile));
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/identify-plant", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to identify plant");
      }

      const data: PlantInfoData = await response.json();
      setPlantInfo(data);
    } catch (error) {
      console.error("Error identifying plant:", error);
      alert("Failed to identify plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-5xl font-bold text-center text-green-400 mb-8">
          Plant Identifier
        </h1>
        <p className="text-center text-gray-300 text-lg mb-8">
          Upload an image or capture a photo of a plant and let our AI identify
          it for you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <ImageUpload
              onImageUpload={handleImageUpload}
              isLoading={isLoading}
            />

            {uploadedImage && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Uploaded Image:
                </h3>
                <div className="relative h-64 w-full">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded plant"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
                <p className="mt-4 text-lg font-semibold text-green-400">
                  Identifying plant...
                </p>
              </div>
            ) : plantInfo ? (
              <PlantInfo info={plantInfo} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Camera size={64} className="mb-4" />
                <p className="text-xl font-semibold">
                  Upload or capture an image to get started
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Capture or Upload",
                description:
                  "Take a photo or upload an image of the plant you want to identify",
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "AI Analysis",
                description:
                  "Our advanced AI analyzes the image to identify the plant",
              },
              {
                icon: <Grid className="w-8 h-8" />,
                title: "Get Results",
                description:
                  "Receive detailed information about the identified plant",
              },
              {
                icon: <Sliders className="w-8 h-8" />,
                title: "Care Instructions",
                description:
                  "Learn how to properly care for your identified plant",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Visual Recognition",
                description:
                  "Our AI can recognize various plant features and colors",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Detailed Information",
                description:
                  "Get scientific names, family, and other botanical details",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center"
              >
                <div className="bg-green-400 rounded-full p-3 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p>
              Plant Identifier uses advanced AI technology to help you identify
              and learn about various plant species quickly and accurately.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-green-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-green-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p>Email: info@plantidentifier.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
