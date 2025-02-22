import { getFileBySlug, getFiles } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import MDXComponents from '@/core/components/MDXComponent';
import StaticTweet from '@/core/components/static-tweet/StaticTweet';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

import MDXContent from './MDXContent';

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
    try {
        const slug = (await params).slug;
        const post = await getFileBySlug(slug);
        const tweets =
            post.tweetIDs?.length > 0 ? await getTweets(post.tweetIDs) : {};

        return (
            <MDXContent frontMatter={post.frontMatter}>
                <MDXRemote
                    source={post.mdxSource}
                    components={{
                        ...MDXComponents,
                        StaticTweet: (props: { id: string }) => (
                            <StaticTweet {...props} tweets={tweets ?? {}} />
                        ),
                    }}
                />
            </MDXContent>
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
