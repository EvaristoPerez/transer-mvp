/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@transer/ui', '@transer/db'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['supabase.co'],
  },
};

export default nextConfig;
