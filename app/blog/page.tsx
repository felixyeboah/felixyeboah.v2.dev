import { getAllFilesFrontMatter } from '@/app/libs/mdx';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

import { BlogContent } from './blog-content';
import { BlogHeader } from './blog-header';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Blog | ' + siteConfig.title;
    const description = 'Browse articles on software development, technology, and more.'; // Or a more specific description for the blog page
    const ogImage = siteConfig.ogImage; // Use the general OG image or a specific one for the blog
    const url = `${siteConfig.url}/blog`;

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, 'Blog', 'Articles', 'Tech Blog'],
        openGraph: {
            type: 'website',
            url: url,
            title: title,
            description: description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: siteConfig.name,
        },
        twitter: {
            card: siteConfig.twitterCardType,
            site: siteConfig.twitter,
            creator: siteConfig.twitter,
            title: title,
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
            <div className="mx-auto max-w-7xl space-y-12 font-sans md:pt-20">
                <BlogHeader />
                <BlogContent posts={posts} />
            </div>
        </Suspense>
    );
};

export default BlogsPage;
