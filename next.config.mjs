/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
// Merge MDX config with Next.js config
export default nextConfig;
