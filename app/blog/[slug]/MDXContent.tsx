'use client';

import { loader } from '@/app/libs/next-image-loader';
import { siteConfig } from '@/config/site';
import MDXComponents from '@/core/components/MDXComponent';
import { Heading, Subheading } from '@/core/components/element';
import Signature from '@/core/components/signtaure';
import StaticTweet from '@/core/components/static-tweet/StaticTweet';
import TableOfContent from '@/core/components/table-of-content';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Post, ReadingTime } from '@/types/post';
import { useGSAP } from '@gsap/react';
import { format } from 'date-fns';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { X } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';

interface MDXContentProps {
    mdxSource: any;
    tweets: Record<string, any>;
    frontMatter: Post & { readingTime: ReadingTime };
}

interface WebmentionBlogDataProps {
    date: string;
    postUrl: string;
    subtitle?: string;
}

const WebmentionBlogData = (props: WebmentionBlogDataProps) => {
    const { date, postUrl, subtitle } = props;
    return (
        <>
            <time
                className="sr-only dt-published"
                itemProp="datepublished"
                dateTime={date}
            >
                {new Date(date).toISOString().replace('Z', '') + '+01:00'}
            </time>
            <a className="sr-only u-url" href={postUrl} />
            {subtitle && (
                <p className="sr-only p-summary e-content">{subtitle}</p>
            )}
        </>
    );
};

const MDXContent = ({ frontMatter, mdxSource, tweets }: MDXContentProps) => {
    const { date, slug, subtitle, title, readingTime, cover } = frontMatter;
    const [isLoading, setLoading] = useState(true);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const progress = gsap.to(progressRef.current, {
            backgroundImage: `conic-gradient(#FF7009 360deg, rgba(255, 112, 9, 0.1) 0deg)`,
            ease: 'none',
            scrollTrigger: {
                trigger: 'article',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });

        return () => {
            progress.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Remove the frameRef and unused progress state
    const path = `/blog/${slug}/`;
    const postUrl = `${siteConfig.url}${path}`;

    const [ids, setIds] = useState<Array<{ id: string; title: string }>>([]);

    useEffect(() => {
        /**
         * Working around some race condition quirks :) (don't judge)
         * TODO @sudocode_: see if there's a better way through a remark plugin to do this
         */
        setTimeout(() => {
            const titles = document.querySelectorAll('h2');
            const idArrays = Array.prototype.slice
                .call(titles)
                .map((title) => ({
                    id: title.id,
                    title: title.innerText,
                })) as Array<{
                id: string;
                title: string;
            }>;
            setIds(idArrays);
        }, 500);
    }, [slug]);

    // Remove these unused elements
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const updateProgress = () => {
            frameRef.current = requestAnimationFrame(updateProgress);
        };

        frameRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const heroText = new SplitType('.header-text h1', {
                types: 'chars',
            });
            gsap.set(heroText.chars, {
                y: 400,
            });

            gsap.to(heroText.chars, {
                y: 0,
                duration: 1,
                stagger: 0.075,
                ease: 'power4.out',
                delay: 1,
            });
        },
        {
            scope: container,
        },
    );

    return (
        <article className="pt-20 space-y-20 header-text" ref={container}>
            {ids ? <TableOfContent ids={ids} /> : null}

            <div className="space-y-16">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="fixed top-40 left-64 z-20">
                            <Link href="/blog">
                                <div className="relative bg-primary size-14 rounded-full flex items-center justify-center group">
                                    <div
                                        ref={progressRef}
                                        className="absolute inset-[-1px] rounded-full"
                                        style={{
                                            backgroundImage:
                                                'conic-gradient(#FF7009 0deg, rgba(255, 112, 9, 0.1) 0deg)',
                                            transform: 'scale(1.15)',
                                            WebkitMask:
                                                'radial-gradient(circle at center, transparent 66%, black 68%)',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-primary rounded-full z-[1]" />
                                    <X className="relative z-10 text-white" />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            hasArrow={false}
                            className="text-black bg-transparent font-sans text-base"
                        >
                            <p>Back to blog</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="max-w-3xl mx-auto">
                    <Subheading className="mt-16">
                        {format(new Date(Date.parse(date)), 'MMMM d, yyyy')} /{' '}
                        {readingTime.text}
                    </Subheading>
                    <Heading as="h1" className="mt-2">
                        {title}
                    </Heading>
                    {subtitle && (
                        <p className="mt-4 text-xl text-gray-500">{subtitle}</p>
                    )}
                </div>
                <div className="relative h-[800px] min-w-full">
                    <Image
                        src={cover}
                        alt={title}
                        loader={loader}
                        height={180}
                        width={38}
                        style={{
                            objectFit: 'cover',
                        }}
                        className={cn(
                            'w-full h-full group-hover:opacity-75 object-cover duration-700 ease-in-out',
                            isLoading
                                ? 'blur-2xl scale-110'
                                : 'blur-0 scale-100',
                        )}
                        onLoad={() => setLoading(false)}
                        priority
                    />
                </div>
                <div className="max-w-3xl mx-auto mt-10 prose prose-pre:bg-transparent prose-a:cursor-pointer prose-p:text-gray-500 prose-p:leading-relaxed prose-p:tracking-wide prose-headings:leading-tight prose-li:leading-relaxed [&_span[data-testid='content-line']]:text-gray-500 [&_div[data-testid='number-line']]:text-gray-400 prose-strong:p-1 prose-strong:text-white prose-strong:font-medium prose-strong:text-sm prose-strong:rounded-sm">
                    <MDXRemote
                        {...mdxSource}
                        components={{
                            ...MDXComponents,
                            StaticTweet: (props: { id: string }) => (
                                <StaticTweet {...props} tweets={tweets} />
                            ),
                        }}
                    />
                </div>
            </div>
            <Signature title={title} url={postUrl} />
            <WebmentionBlogData
                date={date}
                postUrl={postUrl}
                subtitle={subtitle}
            />
        </article>
    );
};

export default MDXContent;
