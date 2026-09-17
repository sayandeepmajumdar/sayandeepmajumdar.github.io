import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/world-explorer",
  images: { unoptimized: true },
};

export default nextConfig;
