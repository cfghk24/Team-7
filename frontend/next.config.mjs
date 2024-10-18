/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/:path*',
    },
  ],
};

export default nextConfig;
