/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true
    },
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost", // Your API's host
          port: "5000",
          pathname: "/uploads/**" // Match all image paths
        },
        {
          protocol: "http",
          hostname: "192.168.50.131", // Your API's host
          port: "8080",
          pathname: "/api/uploads/**" // Match all image paths
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          pathname: "/**"
        }
      ]
    }
  };
  
  export default nextConfig;