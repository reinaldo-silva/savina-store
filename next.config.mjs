/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '18.221.8.21',
        port: '8080',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',

      },
    ],
  },
};

export default nextConfig;
