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
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-green-800">
          Plant Identifier
        </h1>
        <p className="text-center text-gray-600">
          Upload an image of a plant and let our AI identify it for you!
        </p>

        <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />

        {uploadedImage && (
          <div className="mt-6 flex justify-center">
            <Image
              src={uploadedImage}
              alt="Uploaded plant"
              width={300}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        {isLoading && (
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">
              Identifying plant...
            </p>
          </div>
        )}

        {plantInfo && <PlantInfo info={plantInfo} />}
      </div>
    </main>
  );
}
