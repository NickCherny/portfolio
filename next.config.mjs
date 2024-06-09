/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: [process.env.MEDIA_HOST],
  },
};

export default nextConfig;
