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
        <main className="container mx-auto pt-16 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8">
            <MDXRemote
                {...post.mdxSource}
                components={{
                    ...MDXComponents,
                    StaticTweet,
                }}
            />

            <div className="block my-8 sm:my-14 lg:my-20 space-y-4 sm:space-y-6">
                <div className="w-full">
                    <h6 className="text-sm sm:text-base">Technologies &amp; Tools</h6>
                </div>
                <ul className="flex flex-wrap items-center gap-2 sm:gap-4 w-full">
                    {post.frontMatter.stack?.map((item) => (
                        <li
                            key={item}
                            className="flex items-center rounded h-8 sm:h-9 px-3 sm:px-4 border border-gray-800"
                        >
                            <span className="text-base sm:text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
