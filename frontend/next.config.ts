
// Vercel Build Trigger: Force update
import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Sometimes helps with double-renders in strict mode
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  // Add empty turbopack config to satisfy Next.js 16 requirement
  experimental: {
    // turbopack: {}, // Removed invalid key
  },
};

export default withPWA(nextConfig);
