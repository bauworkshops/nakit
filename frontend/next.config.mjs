/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**',
      },
      {
        protocol: 'http',
        hostname: 'pocketbase',
        port: '8090',
        pathname: '/api/files/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;

