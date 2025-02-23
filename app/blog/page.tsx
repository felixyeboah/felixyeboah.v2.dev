import { getAllFilesFrontMatter } from '@/app/libs/mdx';
import React, { Suspense } from 'react';

import { BlogContent } from './blog-content';
import { BlogHeader } from './blog-header';

const BlogsPage = async () => {
    const posts = await getAllFilesFrontMatter();

    return (
        <Suspense>
            <div className="mx-auto max-w-7xl space-y-12 font-sans md:pt-20">
                <BlogHeader />
                <BlogContent posts={posts} />
            </div>
        </Suspense>
    );
};

export default BlogsPage;
