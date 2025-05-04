import { getAllFilesFrontMatter } from '@/app/libs/mdx';
import { getOGImageUrl } from '@/app/utils/og-images';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

import { BlogContent } from './blog-content';
import { BlogHeader } from './blog-header';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Blog';
    const description = 'Browse articles on software development, technology, and more.';
    const ogTitle = `Blog | ${siteConfig.title}`;
    // Get the pre-generated default OG image
    const ogImage = getOGImageUrl('default');
    const url = `${siteConfig.url}/blog`;

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, 'Blog', 'Articles', 'Tech Blog'],
        openGraph: {
            type: 'website',
            url: url,
            title: ogTitle,
            description: description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogTitle,
                },
            ],
            siteName: siteConfig.name,
        },
        twitter: {
            card: siteConfig.twitterCardType,
            site: siteConfig.twitter,
            creator: siteConfig.twitter,
            title: ogTitle,
            description: description,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
    };
}

const BlogsPage = async () => {
    const posts = await getAllFilesFrontMatter();

    return (
        <Suspense>
            <div className="mx-auto max-w-7xl space-y-12 font-sans pt-28 md:pt-20 px-4 md:px-0">
                <BlogHeader />
                <BlogContent posts={posts} />
            </div>
        </Suspense>
    );
};

export default BlogsPage;
