"use client";

import React from "react";
import Navigation from "../components/Navigation";

const faqs = [
  {
    question: "How accurate is Plant Identifier?",
    answer:
      "Plant Identifier uses advanced AI for high accuracy, but results may vary with image quality and plant rarity.",
  },
  {
    question: "What types of plants can be identified?",
    answer:
      "Using LLM Llama-2, Plant Identifier can recognize a wide range of plants, including flowers, trees, shrubs, cacti, and houseplants.",
  },
  {
    question: "How do I take a good photo for identification?",
    answer:
      "For best results, take a clear, well-lit photo focusing on key features like the leaf, flower, or bark. Avoid shadows, and ensure the plant fills most of the frame for optimal identification.",
  },
];

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-400 mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 text-center">
        <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
}
