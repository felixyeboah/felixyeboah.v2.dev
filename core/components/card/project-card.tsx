'use client';

import { loader } from '@/app/libs/next-image-loader';
import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';

export const ProjectCard = ({
    project,
}: {
    project: Post;
}) => {

    return (
        <Link href={`/case-studies/${project.slug}`} className="portfolio-list-item g-fadeIn" data-category-id="18 20" style={{ opacity: 1, translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)' }}>
            <div className="portfolio-list-item__photo">
                <Image className="portfolio-list-item__photo" src={project.cover} alt={project.title} fill={true} loader={loader} />
            </div>
            <div className="portfolio-list-item__flash"></div>
            <div className="portfolio-list-item-info">
                <h3 className="portfolio-list-item-info__title">{project.title}</h3>
                <div className="portfolio-list-item-info__company text text--14 font-secondary">
                    {project.client?.name}
                </div>
            </div>
        </Link>
    );
};