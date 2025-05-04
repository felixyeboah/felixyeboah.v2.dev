import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.felixyeboah.dev',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'felixyeboah.dev',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'felixyeboahdev.vercel.app',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 't.co',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                pathname: '**',
            },
        ],
        unoptimized: true,
    },
    transpilePackages: ['next-mdx-remote'],
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    output: 'standalone'
};

export default nextConfig;
