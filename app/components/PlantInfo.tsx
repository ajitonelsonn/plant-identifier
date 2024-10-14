"use client";

import React, { useState, useEffect, useCallback } from "react";

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
  const [careTips, setCareTips] = useState<string>("");

  const fetchCareTips = useCallback(async () => {
    try {
      const response = await fetch("/api/generate-care-tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantName: info.name,
          careLevel: info.careLevel,
          plantType: info.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch care tips");
      }

      const data = await response.json();
      setCareTips(data.careTips);
    } catch (error) {
      console.error("Error fetching care tips:", error);
      setCareTips("Unable to fetch care tips at this time.");
    }
  }, [info]);

  useEffect(() => {
    fetchCareTips();
  }, [fetchCareTips]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-green-400 mb-4">
        {info.name || "Unknown Plant"}
      </h2>
      <p className="text-gray-300 mb-6">
        {info.description || "No description available."}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <InfoItem label="Scientific Name" value={info.scientificName} />
        <InfoItem label="Family" value={info.family} />
        <InfoItem label="Type" value={info.type} />
        <InfoItem label="Care Level" value={info.careLevel} />
      </div>

      <div className="bg-green-900 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-green-300 mb-2">Care Tips</h3>
        <p className="text-green-100">{careTips || "Loading care tips..."}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-700 rounded-lg p-3">
      <p className="text-green-300 font-semibold mb-1">{label}</p>
      <p className="text-white">{value || "Unknown"}</p>
    </div>
  );
}
