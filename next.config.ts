import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cavin-btob-v3",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
