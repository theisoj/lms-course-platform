import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-left"
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
