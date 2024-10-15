"use client";

import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-300"></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300"></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              3. Data Security
            </h2>
            <p className="text-gray-300"></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              4. Your Rights
            </h2>
            <p className="text-gray-300"></p>
          </section>

          <p className="text-gray-300">
            This privacy policy was last updated on 10 3, 2024. We may update
            this policy from time to time, so please review it periodically.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
