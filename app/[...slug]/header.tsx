'use client';

import { FrontMatterPost } from '@/types/post';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '../libs/misc';
import { loader } from '../libs/next-image-loader';

export const Header = ({ page }: { page: FrontMatterPost }) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <header className="flex flex-col gap-10 items-center justify-center lg:pt-40">
            <h1 className="block text-5xl md:text-8xl font-medium text-white">
                {page?.frontMatter.title}
            </h1>

            {page?.frontMatter?.cover ? (
                <div className="relative w-full rounded-lg transition overflow-hidden">
                    <Image
                        src={page?.frontMatter?.cover}
                        alt={page?.frontMatter?.title}
                        width={1200}
                        height={1200}
                        loader={loader}
                        className={cn(
                            'w-full lg:h-[650px] md:aspect-1 rounded-xl group-hover:opacity-75 duration-700 ease-in-out',
                            isLoading
                                ? 'blur-2xl scale-110'
                                : 'blur-0 scale-100',
                        )}
                        style={{
                            objectFit: 'cover',
                        }}
                        onLoad={() => setLoading(false)}
                        sizes="(max-width:1023px) 80vw,
                        (min-width:1024px) and (max-width:1620px) 67vw,
                        1100px"
                    />
                </div>
            ) : null}
        </header>
    );
};
