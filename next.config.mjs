/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "https://arcadia-spring.p-e.kr/:path*"
            }
        ];
    }
};

export default nextConfig;
