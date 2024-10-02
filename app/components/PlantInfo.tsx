"use client";

interface PlantInfoProps {
  info: {
    name: string;
    scientificName: string;
    family: string;
    type: string;
    careLevel: string;
    description: string;
  };
}

export default function PlantInfo({ info }: PlantInfoProps) {
  return (
    <div className="mt-6 p-4 bg-green-100 rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        {info.name || "Unknown Plant"}
      </h2>
      <ul className="space-y-2">
        <li>
          <strong>Scientific Name:</strong> {info.scientificName || "Unknown"}
        </li>
        <li>
          <strong>Family:</strong> {info.family || "Unknown"}
        </li>
        <li>
          <strong>Type:</strong> {info.type || "Unknown"}
        </li>
        <li>
          <strong>Care Level:</strong> {info.careLevel || "Unknown"}
        </li>
      </ul>
      <p className="mt-4 text-sm text-green-700">
        {info.description || "No description available."}
      </p>
    </div>
  );
}
