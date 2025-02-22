'use client';

import { loader } from '@/app/libs/next-image-loader';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { FrontMatterPost } from '@/types/post';
import { ExternalLinkIcon, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const CaseStudyHeader = ({ post }: { post: FrontMatterPost }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <header className="bg-gray-200 flex flex-col items-center justify-center">
            <div className="absolute top-28 right-16 flex items-center gap-4">
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-transparent text-gray-600 hover:text-gray-950 transition-colors duration-300 ease-in-out cursor-pointer"
                >
                    <Share2 className="size-7" />
                </Button>
                <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="hover:bg-transparent text-gray-600 hover:text-gray-950 transition-colors duration-300 ease-in-out cursor-pointer"
                >
                    <Link
                        href={post.frontMatter.client.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ExternalLinkIcon className="size-7" />
                    </Link>
                </Button>
            </div>
            <div className="container space-y-40 text-center mx-auto pt-48 pb-12">
                <div className="space-y-4">
                    <p className="text-xl text-gray-600">
                        Timeline - {post.frontMatter.timeline}
                    </p>
                    <h1 className="text-[156.056px] leading-none font-bold uppercase">
                        {post.frontMatter.title}
                    </h1>
                    <div className="flex items-center gap-4 justify-center">
                        <div className="relative size-10 rounded-full overflow-hidden">
                            <Image
                                src={post.frontMatter?.logoCloudinaryId ?? ''}
                                alt={post.frontMatter.title}
                                fill={true}
                                loader={loader}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <p className="font-bold text-lg">
                            {post.frontMatter.client?.name}
                        </p>
                    </div>
                </div>

                <div className="relative h-[850px] w-full rounded-lg overflow-hidden">
                    <Image
                        src={post.frontMatter.bannerCloudinaryId ?? ''}
                        alt={post.frontMatter.title}
                        fill={true}
                        loader={loader}
                        style={{
                            objectFit: 'cover',
                        }}
                        className={cn(
                            'group-hover:opacity-75 object-cover duration-700 ease-in-out',
                            isLoading
                                ? 'blur-2xl scale-110'
                                : 'blur-0 scale-100',
                        )}
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </div>
        </header>
    );
};
