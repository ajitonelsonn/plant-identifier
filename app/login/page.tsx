"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "../components/Modal";
import { User, Lock, Leaf, Loader2 } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await loadUserData();
        router.push("/");
      } else {
        setModalInfo({
          isOpen: true,
          title: "Login Failed",
          message: data.message || "Invalid credentials. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: "Password or Username not correct. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserData = async () => {
    // Simulate loading user data for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const closeModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-400 to-blue-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="h-12 w-auto text-green-600" />
          <span className="ml-2 text-3xl font-bold text-green-600">
            PLANTIDEN
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
        <p className="text-gray-600 mb-8">
          Log in to your account to explore the world of plants
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Username"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Logging
                in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        title={modalInfo.title}
        message={modalInfo.message}
        type={modalInfo.type}
      />
    </div>
  );
}
