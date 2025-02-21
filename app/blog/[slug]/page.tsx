import { getFileBySlug } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import { Metadata } from 'next';

import MDXContent from './components/MDXContent';

interface PageProps {
    params: {
        slug: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const post = await getFileBySlug(params.slug);

    return {
        title: post.frontMatter.title,
    };
}

const BlogPage = async ({ params }: PageProps) => {
    if (!params || typeof params !== 'object') {
        return null;
    }

    const { slug } = params;

    if (!slug || typeof slug !== 'string') {
        return null;
    }
    try {
        const post = await getFileBySlug(slug);

        if (!post?.tweetIDs) {
            throw new Error(`Missing tweetIDs for post: ${slug}`);
        }

        const tweets =
            post.tweetIDs.length > 0 ? await getTweets(post.tweetIDs) : {};

        return (
            <div>
                <MDXContent
                    mdxSource={post.mdxSource}
                    frontMatter={post.frontMatter}
                    tweets={tweets ?? {}}
                />
            </div>
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
