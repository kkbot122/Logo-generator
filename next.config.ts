import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hqr3icda4i.ufs.sh', // Allow UploadThing images
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;