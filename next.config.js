/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
}

module.exports = nextConfig
