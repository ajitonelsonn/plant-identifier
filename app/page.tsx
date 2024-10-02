"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-green-800 text-white p-4">
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

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-5xl font-bold text-center text-green-800 mb-2">
            Plant Identifier
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Upload an image of a plant and let our AI identify it for you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageUpload
                onImageUpload={handleImageUpload}
                isLoading={isLoading}
              />

              {uploadedImage && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Uploaded Image:
                  </h3>
                  <div className="relative h-64 w-full">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded plant"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                  <p className="mt-4 text-lg font-semibold text-green-600">
                    Identifying plant...
                  </p>
                </div>
              ) : plantInfo ? (
                <PlantInfo info={plantInfo} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg
                    className="w-24 h-24 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xl font-semibold">
                    Upload an image to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white hover:text-green-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
