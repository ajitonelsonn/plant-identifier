"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Get in Touch
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-6 h-6 text-green-400 mr-2" />
                <span>info@plantidentifier.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 h-6 text-green-400 mr-2" />
                <span>(+670) 456-7890</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-6 h-6 text-green-400 mr-2" />
                <span>Dili, Timor-Leste</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 rounded bg-gray-700"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
