/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: [
    {
      source: "/api/:path*",
      destination: "http://localhost:1337/api/:path*",
    },
  ],
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
