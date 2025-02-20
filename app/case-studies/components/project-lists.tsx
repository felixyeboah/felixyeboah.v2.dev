'use client';

import { ProjectCard } from '@/core/components/card/project-card';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { useState } from 'react';

const categories = ['All', 'Dashboard', 'E-Commerce', 'Website'];

export const ProjectList = ({ projects }: { projects: Post[] }) => {
    const [selected, setSelected] = useState('All');

    const filteredProjects = projects.filter((project) =>
        selected === 'All' ? true : project?.categories?.includes(selected),
    );

    return (
        <div className="container mx-auto py-14 space-y-12">
            <div className="flex items-center gap-4">
                {categories.map((category) => (
                    <Button
                        className={cn(
                            'border-2 border-black h-10 px-8 hover:bg-black hover:text-white transition-all duration-300 ease-in',
                            {
                                'bg-black text-white': selected === category,
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
            <div className="grid grid-cols-12 gap-x-4 gap-y-16">
                {filteredProjects.map((project, index) => (
                    <ProjectCard project={project} index={index} key={index} />
                ))}
            </div>
        </div>
    );
};
