import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Resume | ' + siteConfig.title;
  const description = 'View the professional resume of Felix Yeboah, showcasing skills and experience.';
  const ogImage = siteConfig.ogImage; // Use a specific OG image for resume if available
  const url = `${siteConfig.url}/resume`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, 'Resume', 'CV', 'Skills', 'Experience'],
    openGraph: {
      type: 'profile', // Use 'profile' type for resume
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
      // Optional: Add profile-specific OG tags if relevant
      // profile: {
      //     firstName: 'Felix', 
      //     lastName: 'Yeboah',
      //     username: 'sudocode', // Example
      //     gender: 'male' // Example
      // }
    },
    twitter: {
      card: 'summary', // Perhaps summary is better for a resume?
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

const ResumePage = () => {
  return (
    <div>
      <p>Resume</p>
    </div>
  )
}

export default ResumePage