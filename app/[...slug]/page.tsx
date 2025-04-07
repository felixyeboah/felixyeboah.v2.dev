import { getFileBySlug } from '../libs/mdx';
import { Header } from './header';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { FrontMatterPost } from '@/types/post';

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

    const isDraft = Boolean(page?.frontMatter.draft);
    const isArchived = Boolean(page?.frontMatter.archived);

    console.log('page: ', page);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <Header page={page} />
            </div>
        </div>
    );
};

export default MdxScreen;
