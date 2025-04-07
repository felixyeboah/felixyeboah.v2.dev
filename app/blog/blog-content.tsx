'use client';

import { filterPosts } from '@/app/libs/misc';
import { loader } from '@/app/libs/next-image-loader';
import { Tag } from '@/core/components/buttons/tag';
import { ArticleCard } from '@/core/components/card/article-card';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { PlusIcon, X } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const specialQueryRegex = /(!)?leader:(\w+)(\s|$)?/g;
const PAGE_SIZE = 12;
const initialIndexToShow = PAGE_SIZE;

export const BlogContent = ({ posts }: { posts: Post[] }) => {
    const [indexToShow, setIndexToShow] = useState(initialIndexToShow);
    const [isLoading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [queryValue, setQuery] = useState<string>(() => {
        return searchParams.get('q') ?? '';
    });
    const router = useTransitionRouter();

    const query = queryValue.trim();
    const regularQuery = query.replace(specialQueryRegex, '').trim();

    useEffect(() => {
        setIndexToShow(initialIndexToShow);
    }, [query]);

    const isSearching = query.length > 0;

    const matchingPosts = useMemo(() => {
        const filteredPosts = posts;

        return filterPosts(filteredPosts, regularQuery);
    }, [posts, regularQuery]);

    // Get all unique tags from posts that have associated content
    const tag = new Set<string>();
    for (const post of posts) {
        for (const category of post.categories ?? []) {
            tag.add(category);
        }
    }

    const tags = Array.from(tag);

    function toggleTag(tag: string) {
        setQuery((q) => {
            // create a regexp so that we can replace multiple occurrences (`react node react`)
            const expression = new RegExp(tag, 'ig');

            const newQuery = expression.test(q)
                ? q.replace(expression, '')
                : `${q} ${tag}`;

            // trim and remove subsequent spaces (`react   node ` => `react node`)
            return newQuery.replace(/\s+/g, ' ').trim();
        });
    }

    const visibleTags = isSearching
        ? new Set(
            matchingPosts.flatMap((post) => post.categories).filter(Boolean),
        )
        : new Set(tags);

    const blogPosts = isSearching
        ? matchingPosts.slice(0, indexToShow)
        : matchingPosts.slice(0, indexToShow + 1);

    const hasMorePosts = isSearching
        ? indexToShow < matchingPosts.length
        : indexToShow < matchingPosts.length - 1;

    // select first post of with featured tag
    const featuredPost = blogPosts.find((post) => post.featured) as Post;

    // filter out the featured post from the blog posts
    const blogPostsFiltered = blogPosts.filter(
        (post) => post.slug !== featuredPost?.slug,
    );

    const clearTags = () => {
        setQuery('');
    };

    const slideOut = () => {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
                {
                    opacity: 0.2,
                    transform: 'translateY(-35%)',
                },
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-old(root)',
            },
        );

        document.documentElement.animate(
            [
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                },
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                },
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
            },
        );
    };

    return (
        <div className="space-y-12 pb-20">
            <motion.div
                className="flex flex-wrap gap-3 overflow-visible"
                layout
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                }}
            >
                {tags.map((tag) => {
                    const selected = regularQuery.includes(tag);
                    return (
                        <Tag
                            key={tag}
                            tag={tag}
                            selected={selected}
                            onClick={() => toggleTag(tag)}
                            disabled={
                                Boolean(!visibleTags.has(tag))
                                    ? !selected
                                    : false
                            }
                        />
                    );
                })}
                {regularQuery.length > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={clearTags}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium font-sans
                        text-primary hover:bg-primary/10 transition-colors"
                    >
                        Clear all
                        <X className="w-4 h-4" />
                    </motion.button>
                )}
            </motion.div>
            {!isSearching ? (
                <div className="px-4 lg:px-0 md:w-[1280px] mx-auto">
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        key={featuredPost.slug}
                        className="relative h-[500px] md:h-[650px] mb-10 flex flex-col hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all duration-300 ease-in-out overflow-hidden rounded-3xl group"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`/blog/${featuredPost.slug}`, {
                                onTransitionReady: slideOut,
                            });
                        }}
                    >
                        <div className="bg-gradient-to-t from-background/80 via-background/50 to-transparent absolute inset-0 z-10" />
                        <Image
                            src={featuredPost.cover}
                            alt={featuredPost.title}
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
                        <div className="absolute left-6 top-6 z-20">
                            <p>
                                <span className="border border-border rounded-full text-foreground font-semibold p-1 px-3 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                                    Featured
                                </span>
                            </p>
                        </div>
                        <div className="absolute bottom-10 left-6 md:left-10 z-20 md:w-6/12 space-y-8">
                            <h4>
                                <span className="text-4xl leading-snug md:text-6xl font-semibold text-foreground">
                                    {featuredPost.title}
                                </span>
                            </h4>
                            <div className="flex flex-col gap-4">
                                <p>
                                    <span className="text-lg text-muted-foreground">
                                        {featuredPost.subtitle}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground">
                                        {format(
                                            new Date(
                                                Date.parse(featuredPost.date),
                                            ),
                                            'MMMM d, yyyy',
                                        )}
                                    </span>{' '}
                                    /{' '}
                                    <span className="text-muted-foreground">
                                        {featuredPost.readTime?.text}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {blogPostsFiltered.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center py-20">
                        <svg
                            className="w-64 h-64 text-muted-foreground/50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <p className="mt-4 text-xl font-medium text-muted-foreground">
                            No matching posts found.
                        </p>
                        <p className="text-muted-foreground">
                            Try adjusting your search or removing tags.
                        </p>
                    </div>
                ) : (
                    blogPostsFiltered.map((post) => (
                        <ArticleCard key={post.slug} article={post} />
                    ))
                )}
            </div>
            {hasMorePosts && (
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        onClick={() => setIndexToShow(indexToShow + PAGE_SIZE)}
                        className="flex items-center gap-2 group"
                    >
                        Load More
                        <PlusIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            )}
        </div>
    );
};
