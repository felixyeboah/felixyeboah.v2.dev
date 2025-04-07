// --- Client Component --- //
'use client';

import { motion } from 'framer-motion'; // Re-introduce motion
import React from 'react';
import { format } from 'date-fns'; // For formatting dates

// Updated interface to match the actual data structure logged
export interface ResumeFrontMatter {
  title?: string;
  subtitle?: string;
  date?: string;
  updated?: string;
  company?: {
    name?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
  };
  name?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// Updated Props to accept an array
interface ResumeDisplayProps {
  resumes: ResumeFrontMatter[];
}

// Helper function to format dates safely
const formatDate = (dateString: string | undefined): string | null => {
  if (!dateString) return null;
  try {
    return format(new Date(dateString), 'MMM yyyy'); // e.g., May 2019
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Fallback to original string if formatting fails
  }
};

// Client Component with improved design
export const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ resumes }) => {
  // Assuming a general name/contact info might be static or from the first entry
  // Adjust this logic based on your actual data source for general info
  const primaryResume = resumes[0]; // Use first entry for header info (or define separately)
  const displayName = primaryResume?.name || 'Felix Yeboah'; // Fallback Name
  const displayEmail = primaryResume?.email;
  const displayLinkedin = primaryResume?.linkedin;
  const displayGithub = primaryResume?.github;
  const displayWebsite = primaryResume?.website;
  const displayLocation = primaryResume?.location;

  return (
    <div
      className="container mx-auto max-w-3xl px-4 lg:pt-40 pb-16 font-sans"
    >
      {/* Static Header Section with general info */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{displayName}</h1>
        {/* Optional: A brief tagline or overall title */}
        <p className="text-lg text-primary mb-6">Senior Frontend Engineer & Tech Lead</p>
        <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {displayLocation && <span>{displayLocation}</span>}
          {displayEmail && <><span>&bull;</span> <a href={`mailto:${displayEmail}`} className="text-foreground hover:text-primary transition-colors">{displayEmail}</a></>}
          {displayWebsite && <><span>&bull;</span> <a href={displayWebsite} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">Website</a></>}
          {displayLinkedin && <><span>&bull;</span> <a href={displayLinkedin} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">LinkedIn</a></>}
          {displayGithub && <><span>&bull;</span> <a href={displayGithub} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">GitHub</a></>}
        </div>
      </motion.header>

      {/* Section Title (e.g., Experience) */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-semibold text-foreground mb-8 border-b border-border pb-3"
      >
        Experience
      </motion.h2>

      {/* Map over resume entries - Use actual endDate */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {resumes.map((resume, index) => {
          const jobTitle = resume.title || resume.company?.position;
          const companyName = resume.company?.name;
          const startDate = formatDate(resume.company?.startDate);
          const formattedEndDate = resume.company?.endDate ? formatDate(resume.company.endDate) : 'Present';
          const dateRange = startDate ? `${startDate} - ${formattedEndDate}` : null;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="py-8 border-b border-border last:border-b-0"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                <div className="mb-2 md:mb-0">
                  {jobTitle && <h3 className="text-xl font-semibold text-primary mb-1">{jobTitle}</h3>}
                  {companyName && <p className="text-md text-foreground font-medium">{companyName}</p>}
                </div>
                {dateRange && <p className="text-sm text-muted-foreground font-mono tracking-tight flex-shrink-0 md:text-right">{dateRange}</p>}
              </div>
              {resume.subtitle && (
                <div className="mt-4 text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {resume.subtitle}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add other sections like Education, Skills similarly if data becomes available */}
      {/* Example: */}
      {/*
             <motion.h2 ...>Education</motion.h2>
             <motion.div variants={containerVariants} ...>
                 {educationData.map(edu => (
                     <motion.div key={edu.id} variants={itemVariants} ...>
                         ...
                     </motion.div>
                 ))}
             </motion.div>
             */}
    </div>
  );
}; 