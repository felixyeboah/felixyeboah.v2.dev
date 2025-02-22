'use client';

import MDXComponents from '@/core/components/MDXComponent';
import Tweet from '@/core/components/tweet/tweet';
import { FrontMatterPost } from '@/types/post';
import { MDXRemote } from 'next-mdx-remote';

export const CaseStudyBody = ({
    post,
    tweets,
}: {
    post: FrontMatterPost;
    tweets: Record<string, any>;
}) => {
    const StaticTweet = ({ id }: { id: string }) => {
        return <Tweet tweet={tweets[id]} />;
    };

    return (
        <main className="container mx-auto pt-32">
            <MDXRemote
                {...post.mdxSource}
                components={{
                    ...MDXComponents,
                    StaticTweet,
                }}
            />

            <div className="block my-14 md:my-20 space-y-6">
                <div className="w-full">
                    <h6 className="text-base">Technologies &amp; Tools</h6>
                </div>
                <ul className="flex items-center gap-4 w-full">
                    {post.frontMatter.stack.map((item) => (
                        <li
                            key={item}
                            className="flex items-center rounded h-9 px-4 border border-gray-800"
                        >
                            <span className="text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
