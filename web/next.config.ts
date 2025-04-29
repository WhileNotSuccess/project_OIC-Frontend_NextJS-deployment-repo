import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_BACKEND_URL ?? "").hostname],
  },
};

export default nextConfig;
