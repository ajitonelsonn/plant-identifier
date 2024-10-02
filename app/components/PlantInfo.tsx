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
    <div className="mt-6 p-6 bg-green-100 rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        {info.name || "Unknown Plant"}
      </h2>

      <p className="text-lg text-green-700">
        {info.description || "No description available."}
      </p>

      <table className="w-full mt-4 border-collapse border border-green-300">
        <thead>
          <tr className="bg-green-200">
            <th className="p-2 text-left">Attribute</th>
            <th className="p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-green-300 font-semibold">
              Scientific Name
            </td>
            <td className="p-2 border border-green-300">
              {info.scientificName || "Unknown"}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-green-300 font-semibold">
              Family
            </td>
            <td className="p-2 border border-green-300">
              {info.family || "Unknown"}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-green-300 font-semibold">Type</td>
            <td className="p-2 border border-green-300">
              {info.type || "Unknown"}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-green-300 font-semibold">
              Care Level
            </td>
            <td className="p-2 border border-green-300">
              {info.careLevel || "Unknown"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-800 mb-2">
          Care Tips
        </h3>
        <p className="text-yellow-700">
          Based on the care level, remember to provide appropriate light, water,
          and nutrients for this plant. Always research specific care
          instructions for the best results.
        </p>
      </div>
    </div>
  );
}
