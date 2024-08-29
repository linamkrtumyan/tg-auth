/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Allows images from any hostname
          pathname: "**", // Allows any path on the hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  