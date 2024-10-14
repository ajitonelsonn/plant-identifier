"use client";

import React from "react";
import { Info, Leaf, Users } from "lucide-react";
import Navigation from "../components/Navigation";
import { Linkedin, Facebook, Github } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          About Plant Identifier
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Info className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Our Mission
            </h2>
            <p className="text-gray-300">
              Plant Identifier aims to connect people with nature by making
              plant identification accessible and enjoyable for everyone.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Leaf className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Technology
            </h2>
            <p className="text-gray-300">
              We use LLM Llama-3.2 and Next.js to create high-performance,
              accurate plant identification from images.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <Users className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-center mb-2">
              Community
            </h2>
            <p className="text-gray-300">
              Join me in building a community to collaboratively develop and
              enhance this application together.
            </p>
          </div>
        </div>
        <section className="mb-12 bg-gray-800 p-6 rounded-lg">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Our Story
            </h2>
            <p className="text-gray-300 mb-4">
              Plant Identifier was created in 2024 out of a personal need to
              better understand the plants around me. When I found it difficult
              to identify and learn about them, I decided to develop this app to
              help myself and others who share the same curiosity and love for
              nature.
            </p>
            <p className="text-gray-300">
              Our goal is to make plant identification easier for everyone,
              whether you&apos;re a nature enthusiast, a beginner, or simply
              someone who enjoys discovering the beauty of plants. Join us in
              exploring and deepening our connection with the natural world!
            </p>
          </div>
        </section>
        <section className="mb-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
            About the Author
          </h2>
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 relative">
              <Image
                src="/ajito.jpg"
                alt="ajito"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                Ajito Nelson
              </h3>
              <p className="text-gray-300 mb-4">
                Ajito Nelson is a dedicated Big Data Engineer and Machine
                Learning enthusiast with expertise in handling complex datasets
                and extracting actionable insights. Currently working at Viettel
                Timor (TELEMOR), he is passionate about leveraging AI and Big
                Data technologies to drive impactful decision-making. Ajito
                continuously explores cutting-edge advancements in technology to
                enhance his skills and contribute to the ever-evolving tech
                landscape.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/kharu.kharu89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ajitonelson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/ajitonelsonn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
}
