"use client";

import React from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Terms of Service
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By accessing or using Plant Identifier, you agree to be bound by
              these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              2. Use of Service
            </h2>
            <p className="text-gray-300">
              You may use Plant Identifier for personal, non-commercial
              purposes. You must not use the service for any illegal or
              unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              3. User Content
            </h2>
            <p className="text-gray-300">
              You retain all rights to any content you submit, post or display
              on or through Plant Identifier. By submitting content, you grant
              us a worldwide, non-exclusive license to use, reproduce, and
              distribute that content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              4. Disclaimer of Warranties
            </h2>
            <p className="text-gray-300">
              Plant Identifier is provided "as is" without any warranties,
              expressed or implied. We do not guarantee the accuracy of plant
              identifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-300">
              Plant Identifier shall not be liable for any indirect, incidental,
              special, consequential or punitive damages resulting from your use
              of the service.
            </p>
          </section>

          <p className="text-gray-300">
            These Terms of Service were last updated on Oct 3, 2024. We reserve
            the right to update or change these terms at any time.
          </p>
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
}
