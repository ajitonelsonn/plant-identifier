"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Modal from "../components/Modal";
import { Leaf, Mail, Lock, User, MapPin, Calendar, Users } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
    dateOfBirth: "",
    gender: "",
    location: "",
  });
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setModalInfo({
          isOpen: true,
          title: "Congratulations!",
          message: "Registration successful! Click OK to proceed to login.",
          type: "success",
        });
      } else {
        setModalInfo({
          isOpen: true,
          title: "Registration Failed",
          message: data.message || "Registration failed. Please try again.",
          type: "error",
        });
      }
    } catch {
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    }
  };

  const closeModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
    if (modalInfo.type === "success") {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 to-green-100">
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        title={modalInfo.title}
        message={modalInfo.message}
        type={modalInfo.type}
      />
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <Leaf className="mx-auto h-12 w-auto text-green-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create Your PLANTIDEN Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our community of plant enthusiasts
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex items-center border border-gray-300 rounded-t-md">
                <User className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <Mail className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <Lock className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <User className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="firstName"
                  type="text"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <User className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="lastName"
                  type="text"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <User className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="displayName"
                  type="text"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Display Name"
                  value={formData.displayName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <Calendar className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="dateOfBirth"
                  type="date"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center border border-gray-300">
                <Users className="absolute ml-3 text-gray-400" size={18} />
                <select
                  name="gender"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
              <div className="flex items-center border border-gray-300 rounded-b-md">
                <MapPin className="absolute ml-3 text-gray-400" size={18} />
                <input
                  name="location"
                  type="text"
                  className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Leaf
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 transition duration-150 ease-in-out"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/plant-background.jpg"
          alt="Plant background"
          layout="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-75 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-5xl font-bold mb-4">PLANTIDEN</h1>
          <p className="text-center text-xl max-w-md">
            Join our thriving community of plant enthusiasts. Identify, learn,
            and share your passion for plants!
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              <span>Identify plants instantly</span>
            </li>
            <li className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span>Connect with plant lovers</span>
            </li>
            <li className="flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              <span>Learn about plant care</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
