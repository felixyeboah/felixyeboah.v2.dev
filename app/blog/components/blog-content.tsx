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
                        text-[#FF7009] hover:bg-[#FF7009]/10 transition-colors"
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
                        className="relative h-[500px] md:h-[650px] mb-10 flex flex-col hover:ring-2 hover:ring-offset-2 hover:ring-[#FF7009] transition-all duration-300 ease-in-out overflow-hidden rounded-3xl"
                    >
                        <div className="bg-gradient-to-t from-black/50 to-transparent absolute inset-0 z-10" />
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
                        <div className="absolute left-6 top-6">
                            <p>
                                <span className="border-2 border-gray-100 rounded-full text-white font-semibold p-1 px-3 flex items-center justify-center">
                                    Featured
                                </span>
                            </p>
                        </div>
                        <div className="absolute bottom-10 left-6 md:left-10 z-20 md:w-6/12 space-y-8">
                            <h4>
                                <span className="text-4xl leading-snug md:text-6xl font-semibold text-white">
                                    {featuredPost.title}
                                </span>
                            </h4>
                            <div className="flex flex-col gap-4">
                                <p>
                                    <span className="text-lg text-gray-100">
                                        {featuredPost.subtitle}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-200">
                                        {format(
                                            new Date(
                                                Date.parse(featuredPost.date),
                                            ),
                                            'MMMM d, yyyy',
                                        )}
                                    </span>{' '}
                                    /{' '}
                                    <span className="text-gray-200">
                                        {featuredPost.readTime?.text}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : null}
            <div className="grid grid-cols-12 gap-1">
                {blogPostsFiltered.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center">
                        <svg
                            className="w-64 h-64 text-gray-400 dark:text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 15h8M9.5 9h.01M14.5 9h.01" />
                        </svg>
                        <h3 className="mt-8 text-xl font-medium text-gray-900 dark:text-gray-100">
                            {`Couldn't find anything to match your criteria. Sorry.`}
                        </h3>
                    </div>
                ) : (
                    blogPostsFiltered.map((article) => (
                        <div
                            key={article.slug}
                            className="col-span-full md:col-span-4 px-4 mb-10"
                        >
                            <ArticleCard article={article} />
                        </div>
                    ))
                )}
            </div>

            {hasMorePosts ? (
                <div className="w-[1280px] mx-auto flex items-center justify-center">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="bg-[#FF7009] hover:bg-[#FF7009]/90 text-white rounded cursor-pointer"
                        onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
                    >
                        <span>Load more articles</span> <PlusIcon />
                    </Button>
                </div>
            ) : null}
        </div>
    );
};
