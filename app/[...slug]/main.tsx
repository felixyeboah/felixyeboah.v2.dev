'use client'

import MDXComponents from "@/core/components/MDXComponent";
import StaticTweet from "@/core/components/static-tweet/StaticTweet";
import { MDXRemote } from "next-mdx-remote"

interface MDXContentProps {
  mdxSource: any;
  tweets: Record<string, any>;
}

export const MainBody = ({ mdxSource, tweets }: MDXContentProps) => {
  return (
    <div
      className='prose prose-invert lg:prose-lg mx-auto py-10'
    >
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents,
          StaticTweet: (props: { id: string }) => (
            <StaticTweet {...props} tweets={tweets ?? {}} />
          ),
        }}
      />
    </div>
  )
}