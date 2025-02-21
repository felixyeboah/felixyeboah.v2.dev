import { getFileBySlug, getFiles } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MDXContent = dynamic(() => import('./components/MDXContent'), {
    ssr: false,
});

export async function generateStaticParams() {
    const posts = await getFiles();

    return posts.map((post) => ({
        slug: post.replace(/\.mdx/, ''),
    }));
}

// Generate metadata for each page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;

    const post = await getFileBySlug(slug);

    return {
        title: post.frontMatter.title,
    };
}

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    if (!params || typeof params !== 'object') {
        return null;
    }

    const slug = (await params).slug;

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
