/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_S3_accessKeyId: process.env.S3_accessKeyId,
        NEXT_PUBLIC_S3_secretAccessKey: process.env.S3_secretAccessKey,
        NEXT_PUBLIC_S3_region: process.env.S3_region,
        NEXT_PUBLIC_S3_bucketName: process.env.S3_bucketName,
    },
};

export default nextConfig;