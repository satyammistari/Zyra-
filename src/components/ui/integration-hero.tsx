"use client";

import React from "react";

// E-commerce platform names without logos - using Roman fonts
const PLATFORMS_ROW1 = [
  "Amazon",
  "eBay", 
  "Walmart",
  "Target",
  "Best Buy",
  "Costco",
  "Home Depot"
];

const PLATFORMS_ROW2 = [
  "Wayfair",
  "Overstock",
  "Newegg",
  "B&H Photo",
  "Adorama",
  "REI",
  "Macy's"
];

// Utility to repeat platforms enough times
const repeatedPlatforms = (platforms: string[], repeat = 6) => Array.from({ length: repeat }).flatMap(() => platforms);

export default function IntegrationHero() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Marquee Scroll */}
      <div className="overflow-hidden relative">
        {/* Row 1 */}
        <div className="flex gap-12 whitespace-nowrap animate-scroll-left">
          {repeatedPlatforms(PLATFORMS_ROW1, 6).map((platform, i) => (
            <span 
              key={i} 
              className="flex-shrink-0 text-2xl font-medium text-gray-600 dark:text-gray-400" 
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              {platform}
            </span>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-12 whitespace-nowrap mt-8 animate-scroll-right">
          {repeatedPlatforms(PLATFORMS_ROW2, 6).map((platform, i) => (
            <span 
              key={i} 
              className="flex-shrink-0 text-2xl font-medium text-gray-600 dark:text-gray-400" 
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              {platform}
            </span>
          ))}
        </div>

        {/* Fade overlays */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
