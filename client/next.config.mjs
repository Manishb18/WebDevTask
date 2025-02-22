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
          protocol: "https",
          hostname: "webdevtask-api.onrender.com",
          port: "5000",
          pathname: "/uploads/**" // Match all image paths
        },
        
      ]
    }
  };
  
  export default nextConfig;