"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit3,
  UserCircle,
  Cake,
  Users,
  Leaf,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  joinDate: string;
  avatarUrl?: string;
}

interface PlantIdentification {
  id: number;
  plantName: string;
  scientificName: string;
  identifiedAt: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plantIdentifications, setPlantIdentifications] = useState<
    PlantIdentification[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
    fetchPlantIdentifications();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlantIdentifications = async () => {
    try {
      const response = await fetch("/api/plant-identifications");
      if (response.ok) {
        const data: PlantIdentification[] = await response.json();
        console.log("Fetched plant identifications:", data);
        setPlantIdentifications(
          data.slice(-6).map((plant: any) => ({
            id: plant.id,
            plantName:
              plant.plant_name?.replace(/\*\*/g, "").trim() || "Unknown Plant",
            scientificName:
              plant.scientific_name?.replace(/\*\*/g, "").trim() ||
              "Scientific name not available",
            identifiedAt: plant.identified_at || "Date not available",
          }))
        );
      } else {
        console.error("Failed to fetch plant identifications");
      }
    } catch (error) {
      console.error("Error fetching plant identifications:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  const avatarSrc = profile.avatarUrl || "/images/default-avatar.jpg";

  const chartData = {
    labels: Array.from(
      new Set(
        plantIdentifications.map(
          (plant) =>
            plant.plantName?.replace(/\*\*/g, "").trim() || "Unknown Plant"
        )
      )
    ),
    datasets: [
      {
        label: "Number of Identifications per Plant",
        data: Array.from(
          new Set(
            plantIdentifications.map(
              (plant) =>
                plant.plantName?.replace(/\*\*/g, "").trim() || "Unknown Plant"
            )
          )
        ).map(
          (name) =>
            plantIdentifications.filter(
              (plant) =>
                (plant.plantName?.replace(/\*\*/g, "").trim() ||
                  "Unknown Plant") === name
            ).length
        ),
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Plant Identifications Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Identifications",
        },
      },
      x: {
        title: {
          display: true,
          text: "Plant Name",
        },
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="bg-green-500 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <Image
                src={avatarSrc}
                alt="User Avatar"
                width={120}
                height={120}
                className="rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          <div className="pt-20 px-8 pb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {profile.displayName || profile.username}
            </h1>
            <p className="text-gray-600 mb-6">@{profile.username}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileItem
                icon={<User className="text-green-500" />}
                label="Full Name"
                value={`${profile.firstName} ${profile.lastName}`}
              />
              <ProfileItem
                icon={<Mail className="text-green-500" />}
                label="Email"
                value={profile.email || "No email set"}
              />
              <ProfileItem
                icon={<UserCircle className="text-green-500" />}
                label="Username"
                value={profile.username}
              />
              <ProfileItem
                icon={<Cake className="text-green-500" />}
                label="Date of Birth"
                value={profile.dateOfBirth || "Not set"}
              />
              <ProfileItem
                icon={<Users className="text-green-500" />}
                label="Gender"
                value={profile.gender || "Not specified"}
              />
              <ProfileItem
                icon={<MapPin className="text-green-500" />}
                label="Location"
                value={profile.location || "Not set"}
              />
              <ProfileItem
                icon={<Calendar className="text-green-500" />}
                label="Join Date"
                value={
                  profile.joinDate
                    ? new Date(profile.joinDate).toLocaleDateString()
                    : "Not available"
                }
              />
            </div>
            <button className="mt-8 bg-green-500 text-white px-6 py-2 rounded-full flex items-center hover:bg-green-600 transition duration-300">
              <Edit3 className="mr-2" size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Plant Identification Dashboard */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Plant Identifications Dashboard
            </h2>
            {plantIdentifications.length > 0 ? (
              <>
                <div className="mb-8">
                  <Bar data={chartData} options={chartOptions} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plantIdentifications.map((plant) => (
                    <div key={plant.id} className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Leaf className="text-green-500 mr-2" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {plant.plantName || "Unknown Plant"}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {plant.scientificName ||
                          "Scientific name not available"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Identified on:{" "}
                        {plant.identifiedAt
                          ? new Date(plant.identifiedAt).toLocaleDateString()
                          : "Date not available"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-600">
                You haven't identified any plants yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-green-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
