import { getFileBySlug, getFiles } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import siteConfig from '@/config/site';
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
    const { title, subtitle, date, readingTime } = post.frontMatter;
    const formattedDate = format(new Date(Date.parse(date)), 'MMMM d, yyyy');
    const url = `${siteConfig.url}/blog/${slug}`;

    return {
        title,
        description: subtitle,
        openGraph: {
            title,
            description: subtitle,
            type: 'article',
            url,
            images: [
                {
                    url: `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}&date=${encodeURIComponent(formattedDate)}&readingTime=${encodeURIComponent(readingTime.text)}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: subtitle,
            images: [
                `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}&date=${encodeURIComponent(formattedDate)}&readingTime=${encodeURIComponent(readingTime.text)}`,
            ],
            creator: '@felixyeboah_dev',
        },
        authors: [{ name: 'Felix Yeboah' }],
        publisher: 'Felix Yeboah',
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: url,
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
