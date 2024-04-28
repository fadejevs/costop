/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
      return [
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/[kindeAuth]',
        },
      ];
    },
    // Other config options...
  };
  
  export default nextConfig;