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
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

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
  avatarUrl?: string; // Add this line for future use
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
