/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:1337/api/:path*",
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
