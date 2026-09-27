import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: { optimizePackageImports: ["lucide-react", "react-icons"] },
};
export default nextConfig;
