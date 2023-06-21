/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
  env: {
    API_URL: process.env.API_URL,
    API_SHORTLINK_URL: process.env.API_SHORTLINK_URL,
  },
};

module.exports = nextConfig;
