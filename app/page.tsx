"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Layers, Grid, Sliders, Palette, FileText } from "lucide-react";
import PlantInfo from "./components/PlantInfo";
import ImageUpload from "./components/ImageUpload";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

interface PlantInfoData {
  id: number;
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

  const handleImageCapture = async (imageFile: File) => {
    setIsLoading(true);
    setUploadedImage(URL.createObjectURL(imageFile));
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/identify-plant", {
        method: "POST",
        body: formData,
        credentials: "include",
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
      <Navigation />

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
              onImageCapture={handleImageCapture}
              isLoading={isLoading}
            />

            {uploadedImage && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Captured/Uploaded Image:
                </h3>
                <div className="relative h-64 w-full">
                  <Image
                    src={uploadedImage}
                    alt="Captured/Uploaded plant"
                    fill
                    style={{ objectFit: "cover" }}
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
                <p className="text-xl font-semibold text-center">
                  Capture or upload an image to get started
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
                title: "Capture/Upload Image",
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
      <Footer />
    </div>
  );
}
