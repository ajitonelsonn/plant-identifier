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
    <div className="bg-green-50 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        {info.name || "Unknown Plant"}
      </h2>

      <p className="text-gray-700 mb-6">
        {info.description || "No description available."}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="font-semibold text-green-700 mb-2">Scientific Name</h3>
          <p>{info.scientificName || "Unknown"}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="font-semibold text-green-700 mb-2">Family</h3>
          <p>{info.family || "Unknown"}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="font-semibold text-green-700 mb-2">Type</h3>
          <p>{info.type || "Unknown"}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="font-semibold text-green-700 mb-2">Care Level</h3>
          <p>{info.careLevel || "Unknown"}</p>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-md shadow">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">
          Care Tips
        </h3>
        <p className="text-yellow-700">
          Based on the {info.careLevel.toLowerCase()} care level, ensure you
          provide appropriate light, water, and nutrients. Research specific
          care instructions for the best results.
        </p>
      </div>
    </div>
  );
}
