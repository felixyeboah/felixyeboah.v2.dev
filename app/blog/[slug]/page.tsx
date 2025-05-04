import { getFileBySlug, getFiles } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import { siteConfig } from '@/config/site';
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
    params: { slug: string };
}): Promise<Metadata> {
    const slug = params.slug;
    const post = await getFileBySlug(slug);
    const { title, subtitle, date, keywords, categories, cover, updated } = post.frontMatter;
    const url = `${siteConfig.url}/blog/${slug}`;

    // Format the date for OG image display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Estimate reading time (roughly 200 words per minute)
    const wordCount = post.mdxSource.compiledSource.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    // Use template literals without newlines to avoid URL parsing issues
    const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle || '')}&date=${encodeURIComponent(formattedDate)}&readingTime=${encodeURIComponent(readingTime)}${cover ? `&cover=${encodeURIComponent(cover)}` : ''}`;

    const publishedTime = new Date(date).toISOString();
    const modifiedTime = updated ? new Date(updated).toISOString() : publishedTime;

    return {
        title: title,
        description: subtitle,
        keywords: keywords || [],
        authors: [
            {
                name: siteConfig.author,
                url: siteConfig.url,
            },
        ],
        creator: siteConfig.author,
        publisher: siteConfig.name,
        openGraph: {
            title: title,
            description: subtitle,
            type: 'article',
            url: url,
            locale: siteConfig.siteLanguage,
            publishedTime: publishedTime,
            modifiedTime: modifiedTime,
            authors: [siteConfig.url],
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                }
            ],
        },
        twitter: {
            card: siteConfig.twitterCardType,
            title: title,
            description: subtitle,
            site: siteConfig.twitter,
            creator: siteConfig.twitter,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: url,
        },
        category: categories?.join(', ') || undefined,
        other: {
            'article:published_time': publishedTime,
            'article:modified_time': modifiedTime,
            'article:author': siteConfig.url,
            'og:image:width': '1200',
            'og:image:height': '630',
        },
    };
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
    try {
        const slug = params.slug;
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
