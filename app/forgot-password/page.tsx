// app/forgot-password/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "../components/Modal";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setModalInfo({
          isOpen: true,
          title: "OTP Sent",
          message:
            "An OTP has been sent to your email. Please check and enter it below.",
          type: "success",
        });
      } else {
        setModalInfo({
          isOpen: true,
          title: "Error",
          message: data.message || "Failed to send OTP. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalInfo({
          isOpen: true,
          title: "Success",
          message:
            "Password reset successful! You will be redirected to login.",
          type: "success",
        });
        setTimeout(() => {
          router.push("/login?resetSuccess=true");
        }, 3000);
      } else {
        setModalInfo({
          isOpen: true,
          title: "Error",
          message:
            data.message || "Failed to reset password. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setModalInfo({
        isOpen: true,
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Forgot Password
        </h2>
        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            {/* Email input field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* OTP and new password input fields */}
            <div>
              <label htmlFor="otp" className="block text-gray-700 mb-2">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Log In
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
