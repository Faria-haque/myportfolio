import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root (a stray lockfile higher up the tree confuses inference).
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
