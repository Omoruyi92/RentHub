import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
      },
      {
        protocol: 'https',
        hostname: 'thesonyshop.ca',
      },
      {
        protocol: 'https',
        hostname: 'www.thesonyshop.ca',
      },
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'canada.crutchfieldonline.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
