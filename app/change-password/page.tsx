"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: "New passwords do not match",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalInfo({
          isOpen: true,
          title: "Success",
          message: "Password changed successfully",
          type: "success",
        });
      } else {
        throw new Error(data.error || "Failed to change password");
      }
    } catch (error) {
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: error instanceof Error ? error.message : "An error occurred",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
    if (modalInfo.type === "success") {
      router.push("/profile");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Change Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={isLoading}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={handleModalClose}
        title={modalInfo.title}
        message={modalInfo.message}
        type={modalInfo.type}
      />
    </div>
  );
}
