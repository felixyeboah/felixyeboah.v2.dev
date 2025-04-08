'use client';

import { ProjectCard } from '@/core/components/card/project-card';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const categories = ['All', 'Dashboard', 'E-Commerce', 'Website'];

export const ProjectList = ({ projects }: { projects: Post[] }) => {
    const [selected, setSelected] = useState('All');
    const container = useRef<HTMLDivElement | null>(null);

    const filteredProjects = projects.filter((project) =>
        selected === 'All' ? true : project?.categories?.includes(selected),
    );

    useGSAP(
        () => {
            if (container.current && container.current.children.length > 0) {
                gsap.set('.project-card-item', { opacity: 0, scale: 0.8 });

                gsap.to('.project-card-item', {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                });
            }
        },
        { scope: container, dependencies: [filteredProjects] },
    );

    return (
        <div className="container mx-auto py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {categories.map((category) => (
                    <Button
                        className={cn(
                            'border-2 border-secondary h-8 sm:h-10 px-4 sm:px-8 hover:bg-secondary hover:text-white transition-all duration-300 ease-in text-sm sm:text-base',
                            {
                                'bg-secondary text-white':
                                    selected === category,
                            },
                        )}
                        variant="outline"
                        key={category}
                        onClick={() => setSelected(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            <div ref={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-x-4 lg:gap-y-16">
                {filteredProjects.map((project, index) => (
                    <div
                        key={project.slug || index}
                        className="project-card-item"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <ProjectCard project={project} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};
