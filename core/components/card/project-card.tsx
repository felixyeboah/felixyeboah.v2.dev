'use client';

import { loader } from '@/app/libs/next-image-loader';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { motion } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MotionLink = motion(Link);

export const ProjectCard = ({
    project,
    index,
}: {
    project: Post;
    index: number;
}) => {
    const [isLoading, setLoading] = useState(true);
    const [modal, setModal] = useState<{
        active: boolean;
        index: number | null;
    }>({ active: false, index: null });

    return (
        <div className="col-span-full md:col-span-4 space-y-5">
            <motion.div
                layoutId={`project-card-${index}`}
                className="hover:ring-2 hover:ring-offset-2 hover:ring-primary hover:scale-100 duration-200 ease-in-out transition-all relative overflow-hidden rounded-xl w-full h-96"
                onMouseEnter={() => {
                    setModal({ active: true, index });
                }}
                onMouseLeave={() => {
                    setModal({ active: false, index: null });
                }}
            >
                <div className="absolute z-10 h-full w-full bg-gradient-to-t from-black/60 to-transparent inset-0" />
                <Image
                    src={project.cover}
                    alt={project.title}
                    fill={true}
                    loader={loader}
                    style={{
                        objectFit: 'cover',
                    }}
                    className={cn(
                        'group-hover:opacity-75 object-cover duration-700 ease-in-out',
                        isLoading ? 'blur-2xl scale-110' : 'blur-0 scale-100',
                    )}
                    onLoad={() => setLoading(false)}
                />

                <MotionLink
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    animate={{
                        opacity: modal.index === index ? 1 : 0,
                        y: modal.index === index ? 0 : 50,
                    }}
                    exit={{
                        opacity: 0,
                        y: -50,
                    }}
                    className="flex items-end justify-between absolute z-20 bottom-6 inset-x-4 text-white"
                    href={`/case-studies/${project.slug}`}
                >
                    <motion.div className="space-y-2">
                        <p className="font-medium uppercase text-sm">
                            {project.categories}
                        </p>
                        <h3 className="text-white font-bold text-3xl">
                            {project.title}
                        </h3>
                    </motion.div>
                    <motion.div className="">
                        <MoveUpRight strokeWidth={3} />
                    </motion.div>
                </MotionLink>
            </motion.div>
            <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-xl md:text-2xl"> {project.title}</h3>
                <span>for</span>
                <h3 className="font-bold text-xl md:text-2xl"> {project.client?.name}</h3>
            </div>
        </div>
    );
};
