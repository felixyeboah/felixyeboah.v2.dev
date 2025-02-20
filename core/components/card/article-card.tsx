'use client';

import { loader } from '@/app/libs/next-image-loader';
import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import MissingSomething from '../kifs';

function ArticleCard({
    article: { cover, title, slug, date, readTime },
}: {
    article: {
        cover: string;
        title: string;
        slug: string;
        date: string;
        readTime: {
            text: string;
        };
    };
}) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className={clsx('relative w-full')}>
            <Link
                className="relative block w-full focus:outline-none"
                href={`/blog/${slug}`}
            >
                {cover ? (
                    <div className="w-full rounded-lg overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-[#FF7009] transition-all duration-300 ease-in-out">
                        <Image
                            src={cover}
                            alt={title}
                            width={400}
                            height={900}
                            loader={loader}
                            className={cn(
                                'aspect-[3/4] group-hover:opacity-75 duration-700 ease-in-out',
                                isLoading
                                    ? 'blur-2xl scale-110'
                                    : 'blur-0 scale-100',
                            )}
                            style={{
                                objectFit: 'cover',
                            }}
                            onLoad={() => setLoading(false)}
                        />
                    </div>
                ) : (
                    <div className="aspect-[3/4]">
                        <div className="focus-ring w-full rounded-lg transition">
                            <MissingSomething aspectRatio="3:4" />
                        </div>
                    </div>
                )}

                <div className="flex items-center mt-6 text-gray-500 gap-2">
                    <p>
                        <span className="font-medium text-inherit">
                            {format(new Date(Date.parse(date)), 'MMM dd, yyyy')}
                        </span>
                    </p>

                    <span className="text-gray-500 text-lg">-</span>
                    <div className="font-medium">
                        {[readTime?.text ?? 'quick read']
                            .filter(Boolean)
                            .join(' — ')}
                    </div>
                </div>
                <h3
                    className="text-2xl font-bold"
                    style={{
                        fontWeight: 'bold',
                        marginTop: '0.5rem',
                    }}
                >
                    {title}
                </h3>
            </Link>
        </div>
    );
}

export { ArticleCard };
