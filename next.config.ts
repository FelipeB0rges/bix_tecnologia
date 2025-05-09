import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,

  // Permite build mesmo com erros de TS
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
