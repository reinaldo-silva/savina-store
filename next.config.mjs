/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.savinaacessorios.com.br',
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
