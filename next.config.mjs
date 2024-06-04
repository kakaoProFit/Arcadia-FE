/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();
const nextConfig = {
    reactStrictMode: true,
};
module.exports = {
    publicRuntimeConfig: {
        NEXT_PUBLIC_S3_accessKeyId: process.env.NEXT_PUBLIC_S3_accessKeyId,
        NEXT_PUBLIC_S3_secretAccessKey: process.env.NEXT_PUBLIC_S3_secretAccessKey,
        NEXT_PUBLIC_S3_region: process.env.NEXT_PUBLIC_S3_region,
        NEXT_PUBLIC_S3_bucketName: process.env.NEXT_PUBLIC_S3_bucketName,
    }
}

export default nextConfig;