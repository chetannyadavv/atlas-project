import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // static portfolio per 02_Product_Specification.md
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
