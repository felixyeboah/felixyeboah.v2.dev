import { getFileBySlug, getFiles } from '@/app/libs/mdx';
import { loader } from '@/app/libs/next-image-loader';
import { getTweets } from '@/app/libs/tweets';
import { siteConfig } from '@/config/site';
import { format } from 'date-fns';
import { Metadata } from 'next';

import MDXContent from './MDXContent';

export async function generateStaticParams() {
    const posts = await getFiles();

    return posts.map((post) => ({
        slug: post.replace(/\.mdx/, ''),
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;
    const post = await getFileBySlug(slug);
    const { title, subtitle, date, readingTime, keywords, categories, cover } =
        post.frontMatter;
    const formattedDate = format(new Date(Date.parse(date)), 'MMMM d, yyyy');
    const url = `${siteConfig.url}/blog/${slug}`;

    // Transform cover image URL using the Cloudinary loader
    const coverUrl = cover ? loader({ src: cover, width: 1200 }) : '';

    // Create URL parameters without double encoding
    const encode = new URLSearchParams();
    encode.append('title', title);
    encode.append('date', formattedDate);
    encode.append('readingTime', readingTime.text);
    encode.append('cover', coverUrl);

    const ogImageUrl = `${siteConfig.url}/api/og?${params.toString()}`;

    return {
        title: `${title} | ${siteConfig.title}`,
        description: subtitle,
        keywords: keywords?.join(', ') || '',
        openGraph: {
            title,
            description: subtitle,
            type: 'article',
            url,
            siteName: siteConfig.title,
            locale: 'en_US',
            publishedTime: new Date(date).toISOString(),
            modifiedTime: new Date(date).toISOString(),
            authors: ['Felix Yeboah'],
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${siteConfig.title}`,
            description: subtitle,
            site: '@felixyeboah_dev',
            creator: '@felixyeboah_dev',
            images: [ogImageUrl],
        },
        authors: [
            {
                name: 'Felix Yeboah',
                url: siteConfig.url,
            },
        ],
        publisher: siteConfig.title,
        robots: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
        alternates: {
            canonical: url,
        },
        category: categories?.join(', ') || '',
        other: {
            'article:published_time': new Date(date).toISOString(),
            'article:author': siteConfig.url,
            'og:site_name': siteConfig.title,
        },
    };
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    try {
        const slug = (await params).slug;
        const post = await getFileBySlug(slug);
        const tweets =
            post.tweetIDs?.length > 0 ? await getTweets(post.tweetIDs) : {};

        return (
            <MDXContent
                frontMatter={post.frontMatter}
                mdxSource={post.mdxSource}
                tweets={tweets ?? {}}
            />
        );
    } catch (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>
                    {error instanceof Error
                        ? error.message
                        : 'An error occurred'}
                </p>
            </div>
        );
    }
};

export default BlogPage;
