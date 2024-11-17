/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["staging7.shop.timperio.co"]
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
