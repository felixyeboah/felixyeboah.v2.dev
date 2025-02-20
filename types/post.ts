import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type ReadingTime = {
  text: string;
};

export type Post = {
  colorFeatured?: string;
  date: string;
  updated: string;
  featured?: boolean;
  fontFeatured?: string;
  keywords?: string[];
  slug: string;
  subtitle: string;
  description: string;
  title: string;
  cover: string;
  categories?: string[];
  logoCloudinaryId?: string;
  bannerCloudinaryId?: string;
  readTime: ReadingTime;
  company: {
    name: string;
    position: string;
    startDate?: string;
    endDate?: string;
  };
  client: {
    name: string;
    link: string;
  };
  stack: string[];
  timeline: string;
  video?: string;
};

export type FrontMatterPost = {
  frontMatter: Post & {
    readingTime: ReadingTime;
    draft?: boolean;
    archived?: boolean;
  };
  tweetIDs: string[];
  mdxSource: MDXRemoteSerializeResult;
};
