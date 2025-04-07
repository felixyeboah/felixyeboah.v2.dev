// --- Imports for Server Component ---
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getAllFilesFrontMatter } from '../libs/mdx';
import { ResumeDisplay, ResumeFrontMatter } from './resume-display';

// Metadata generation remains a server-side function
export async function generateMetadata(): Promise<Metadata> {
  const title = 'Resume | ' + siteConfig.title;
  const description = 'View the professional resume of Felix Yeboah, showcasing skills and experience.';
  const ogImage = siteConfig.ogImage;
  const url = `${siteConfig.url}/resume`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, 'Resume', 'CV', 'Skills', 'Experience'],
    openGraph: {
      type: 'profile',
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
      card: 'summary',
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

// This is the main Server Component for the page
const ResumePage = async () => {
  const resumes = await getAllFilesFrontMatter('resume');
  // No longer selecting just the first one
  // const resume = resumes[0] as ResumeFrontMatter | undefined;

  // --- DEBUGGING: Log the fetched resume data ---
  // console.log("--- Resume Data Passed to Client Component ---");
  // console.log(JSON.stringify(resumes, null, 2)); // Log the whole array if needed
  // console.log("--------------------------------------------");
  // --- END DEBUGGING ---

  // Check if the resumes array is empty
  if (!resumes || resumes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Resume Not Found</h1>
        <p className="text-lg text-muted-foreground">
          Sorry, no resume data could be loaded.
        </p>
      </div>
    );
  }

  // Render the imported Client Component and pass the *entire array*
  // Also need to cast the array elements
  return <ResumeDisplay resumes={resumes as ResumeFrontMatter[]} />;
}

export default ResumePage;