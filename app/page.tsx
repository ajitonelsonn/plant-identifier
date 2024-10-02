"use client";

import { useState } from "react";
import Image from "next/image";
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

  const handleImageUpload = async (imageFile: File) => {
    setIsLoading(true);
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
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-green-800">
        Plant Identifier
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
        {plantInfo && <PlantInfo info={plantInfo} />}
      </div>
    </main>
  );
}
