import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cavin-btob-v2",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
