import { getFileBySlug } from '@/app/libs/mdx';
import { getTweets } from '@/app/libs/tweets';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

import { CaseStudyBody } from '../case-study-body';
import { CaseStudyHeader } from '../case-study-header';

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const slug = params.slug;
    const post = await getFileBySlug(slug, 'project');

    if (!post || !post.frontMatter) {
        // Return default metadata or handle not found case appropriately
        // Returning empty object lets Next.js handle it (likely 404)
        return {};
    }

    const fm = post.frontMatter;

    const title = `${fm.title} | Case Study`;
    const description = fm.subtitle || fm.description || 'Case study by Felix Yeboah';
    const url = `${siteConfig.url}/case-studies/${slug}`;

    // Format the date for OG image display if available
    const formattedDate = fm.date ? new Date(fm.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : null;

    // Use dynamic OG image generation
    const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(fm.title)}
        &subtitle=${encodeURIComponent(fm.subtitle || 'Case Study')}
        ${formattedDate ? `&date=${encodeURIComponent(formattedDate)}` : ''}
        ${fm.cover ? `&cover=${encodeURIComponent(fm.cover)}` : ''}`.replace(/\s+/g, '');

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, fm.title, 'Case Study', ...(fm.keywords || [])],
        openGraph: {
            type: 'article',
            url: url,
            title: title,
            description: description,
            publishedTime: fm.date, // Use 'date' from frontmatter
            modifiedTime: fm.updated, // Use 'updated' from frontmatter
            images: [
                {
                    url: ogImage,
                    width: 1200, // Adjust if project images have different dimensions
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

const CaseStudiesPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const slug = (await params).slug;

    const post = await getFileBySlug(slug, 'project');
    // Handle case where post might not be found 
    if (!post || !post.frontMatter) {
        return <div>Case study not found.</div>;
    }

    const tweets =
        post.tweetIDs.length > 0 ? await getTweets(post.tweetIDs) : {};

    return (
        <div className="">
            {/* Pass the full post object to components that need it */}
            <CaseStudyHeader post={post} />
            <CaseStudyBody post={post} tweets={tweets ?? {}} />
        </div>
    );
};

export default CaseStudiesPage;
