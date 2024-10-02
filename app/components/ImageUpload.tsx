import React, { useState, useRef } from "react";
import { Upload, Camera } from "lucide-react";

interface ImageUploadProps {
  onImageCapture: (file: File) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

export default function ImageUpload({
  onImageCapture,
  isLoading,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate the width and height, constraining the proportions
          if (width > height) {
            if (width > 1000) {
              height = Math.round((height * 1000) / width);
              width = 1000;
            }
          } else {
            if (height > 1000) {
              width = Math.round((width * 1000) / height);
              height = 1000;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              }
            },
            "image/jpeg",
            0.7
          ); // Adjust quality here (0.7 = 70% quality)
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file: File) => {
    let processedFile = file;
    if (file.size > MAX_FILE_SIZE) {
      processedFile = await resizeImage(file);
    }
    onImageCapture(processedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition duration-300 ${
          dragActive ? "bg-gray-700" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-green-400" />
          <p className="mb-2 text-sm text-green-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-green-500">
            PNG, JPG or GIF (MAX. 1MB, will be resized if larger)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
          ref={fileInputRef}
          accept="image/*"
          disabled={isLoading}
        />
      </label>

      <button
        onClick={handleCameraCapture}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        <Camera className="w-5 h-5 mr-2" />
        Capture from Camera
      </button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={cameraInputRef}
        onChange={handleChange}
        disabled={isLoading}
      />
    </div>
  );
}
