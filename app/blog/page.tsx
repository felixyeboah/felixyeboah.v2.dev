import { getAllFilesFrontMatter } from '@/app/libs/mdx';
import React, { Suspense } from 'react';

import { BlogContent } from './blog-content';

const BlogsPage = async () => {
    const posts = await getAllFilesFrontMatter();

    return (
        <Suspense>
            <div className="mx-auto max-w-7xl space-y-12 font-sans md:pt-20">
                <header className="h-[20vh]">
                    <h1 className="lg:text-[100px]">Blog</h1>
                    <p className="text-2xl">
                        Find the latest of my writing here.
                    </p>
                </header>

                <BlogContent posts={posts} />
            </div>
        </Suspense>
    );
};

export default BlogsPage;
