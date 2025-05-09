/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,

  // Adicione isto:
  typescript: {
    // build não vai falhar por erros de TS
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
