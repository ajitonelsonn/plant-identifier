"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Layers,
  Grid,
  Sliders,
  Palette,
  FileText,
  Linkedin,
  Facebook,
  Github,
} from "lucide-react";
import PlantInfo from "./components/PlantInfo";
import ImageUpload from "./components/ImageUpload";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

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

  const handleImageCapture = async (imageFile: File) => {
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
        <section className="mb-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
            About the Author
          </h2>
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 relative">
              <Image
                src="/ajito.jpg"
                alt="ajito"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                Ajito Nelson
              </h3>
              <p className="text-gray-300 mb-4">
                Ajito Nelson is a dedicated Big Data Engineer and Machine
                Learning enthusiast with expertise in handling complex datasets
                and extracting actionable insights. Currently working at Viettel
                Timor (TELEMOR), he is passionate about leveraging AI and Big
                Data technologies to drive impactful decision-making. Ajito
                continuously explores cutting-edge advancements in technology to
                enhance his skills and contribute to the ever-evolving tech
                landscape.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/kharu.kharu89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ajitonelson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/ajitonelsonn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
