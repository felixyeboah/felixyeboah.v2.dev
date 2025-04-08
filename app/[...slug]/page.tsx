import { getFileBySlug } from '../libs/mdx';
import { Header } from './header';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { FrontMatterPost } from '@/types/post';
import { getTweets } from '../libs/tweets';
import { MainBody } from './main';

export async function generateMetadata({
    params,
}: {
    params: { slug: string[] };
}): Promise<Metadata> {
    const path = params.slug.join('/');
    let page: FrontMatterPost | null = null;

    try {
        page = await getFileBySlug(path, 'pages');
    } catch (error) {
        // Handle case where file might not exist (e.g., invalid slug)
        console.error(`Error fetching page for slug ${path}:`, error);
        // Return empty metadata, allowing Next.js to handle the 404
        return {};
    }

    if (!page || !page.frontMatter) {
        return {};
    }

    const fm = page.frontMatter;

    // Use frontmatter title/description if available, otherwise fallback to site defaults
    const title = fm.title ? `${fm.title} | ${siteConfig.name}` : siteConfig.title;
    const description = fm.description || siteConfig.description;
    // Use cover image from frontmatter or site default OG image
    const ogImage = fm.cover ? `${siteConfig.url}${fm.cover}` : `${siteConfig.siteUrl}${siteConfig.ogImage}`;
    const url = `${siteConfig.url}/${path}`;

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, ...(fm.keywords || [])], // Add page-specific keywords
        openGraph: {
            type: 'article', // Assuming generic pages are article-like
            url: url,
            title: title,
            description: description,
            publishedTime: fm.date, // Use 'date' from frontmatter if available
            modifiedTime: fm.updated, // Use 'updated' from frontmatter if available
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: siteConfig.name,
            authors: [siteConfig.author],
        },
        twitter: {
            card: siteConfig.twitterCardType,
            site: siteConfig.twitter,
            creator: siteConfig.twitter,
            title: title,
            description: description,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
    };
}

const MdxScreen = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = await params;
    const path = slug.join('/');
    let page: FrontMatterPost | null = null;

    try {
        page = await getFileBySlug(path as string, 'pages');
    } catch (error) {
        // If file not found, page remains null. The component should handle this.
        console.error(`Error rendering page for slug ${path}:`, error);
    }

    // Handle case where page couldn't be fetched
    if (!page || !page.frontMatter) {
        // Optionally render a specific 404 component or message
        // For now, returning null might let a higher-level boundary handle it, 
        // or Next.js might render its default 404 based on generateMetadata
        return <div>Page not found.</div>; // Simple fallback
    }

    const tweets =
        page.tweetIDs?.length > 0 ? await getTweets(page.tweetIDs) : {};

    const isDraft = Boolean(page?.frontMatter.draft);
    const isArchived = Boolean(page?.frontMatter.archived);

    return (
        <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center pt-32 [--gutter-width:2.5rem] lg:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)]">
            <div className="col-start-1 row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 lg:block dark:[--pattern-fg:var(--color-white)]/10"></div>
            <div className="text-gray-950 dark:text-white">
                <div></div>
                <div className="grid grid-cols-1 xl:grid-cols-[22rem_2.5rem_auto] xl:grid-rows-[1fr_auto]">
                    <div className="col-start-2 row-span-2 border-r border-l border-gray-950/5 max-xl:hidden dark:border-white/10"></div>
                    <div className="max-xl:mx-auto  w-full max-xl:max-w-2xl">
                        <article className='max-w-(--breakpoint-md)'>
                            <div className="relative z-10 px-4 lg:col-start-2 lg:px-8">
                                <Header page={page} />
                                <MainBody mdxSource={page.mdxSource} tweets={tweets ?? {}} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <div className="row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 lg:col-start-3 lg:block dark:[--pattern-fg:var(--color-white)]/10"></div>
        </div>
    );
};

export default MdxScreen;
