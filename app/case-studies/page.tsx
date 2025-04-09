import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
// Import MDX
import { getAllFilesFrontMatter } from '../libs/mdx';
import { ProjectHeader } from './project-header';
import { ProjectList } from './project-lists';
// Import Accordion components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Post } from '@/types/post';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Case Studies | ' + siteConfig.title;
    const description = 'Explore detailed case studies of projects I have worked on.';
    const ogImage = siteConfig.ogImage; // Use the general OG image or a specific one for case studies
    const url = `${siteConfig.url}/case-studies`;

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, 'Case Studies', 'Projects', 'Portfolio'],
        openGraph: {
            type: 'website',
            url: url,
            title: title,
            description: description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: siteConfig.name,
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

const CaseStudiesPage = async () => {
    // Fetch all projects
    const allProjects = await getAllFilesFrontMatter('project');

    // Separate active and archived projects
    const activeProjects = allProjects.filter((project: Post) => !project.archive);
    const archivedProjects = allProjects.filter((project: Post) => project.archive);

    return (
        <div className='py-10 sm:py-20'>
            <ProjectHeader />
            {/* Display active projects */}
            <ProjectList projects={activeProjects} />

            {/* Display archived projects in an accordion if there are any */}
            {archivedProjects.length > 0 && (
                <div className="mt-12 container mx-auto pb-20">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="archived-projects" className=''>
                            <AccordionTrigger className='text-2xl border p-4 rounded-lg bg-secondary border-secondary'>Archived Projects</AccordionTrigger>
                            <AccordionContent>
                                <ProjectList projects={archivedProjects} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default CaseStudiesPage;
